import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Pressable,
  ScrollView,
  Modal,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useAlert } from '@/template';
import { useApp } from '@/hooks/useApp';
import { Colors, Typography, Radius, Shadow, MESSAGE_REACTIONS } from '@/constants/theme';
import type { Message } from '@/constants/mockData';

const { width } = Dimensions.get('window');

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { showAlert } = useAlert();
  const { contacts, messages, sendMessage, addReaction, starMessage, deleteMessage, markRead, currentUser, t, theme } = useApp();
  const [text, setText] = useState('');
  const [selectedMsg, setSelectedMsg] = useState<Message | null>(null);
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [reactionTarget, setReactionTarget] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [recordingAnim] = useState(new Animated.Value(1));
  const flatRef = useRef<FlatList>(null);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const contact = contacts.find(c => c.id === id);
  const chatMessages = messages[id] || [];

  useEffect(() => {
    if (id) markRead(id);
  }, [id]);

  useEffect(() => {
    if (chatMessages.length > 0) {
      setTimeout(() => flatRef.current?.scrollToEnd({ animated: false }), 150);
    }
  }, [chatMessages.length]);

  useEffect(() => {
    return () => {
      if (typingTimer.current) clearTimeout(typingTimer.current);
    };
  }, []);

  const handleTextChange = (v: string) => {
    setText(v);
    setIsTyping(true);
    if (typingTimer.current) clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => setIsTyping(false), 2000);
  };

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(id, text.trim());
    setText('');
    setIsTyping(false);
    setTimeout(() => flatRef.current?.scrollToEnd({ animated: true }), 200);
  };

  const handleCall = (type: 'audio' | 'video') => {
    showAlert(
      type === 'video' ? '📹 ' + t('Video Call', 'ویڈیو کال') : '📞 ' + t('Voice Call', 'آواز کال'),
      t('WebRTC calling is available in the full backend version. Enable OnSpace Cloud to activate real calls.', 'مکمل بیک اینڈ ورژن میں کالنگ دستیاب ہے۔')
    );
  };

  const handleLongPress = (msg: Message) => {
    setSelectedMsg(msg);
  };

  const handleReactionPress = (msgId: string) => {
    setReactionTarget(msgId);
    setShowReactionPicker(true);
    setSelectedMsg(null);
  };

  const handleReact = (emoji: string) => {
    if (reactionTarget) {
      addReaction(id, reactionTarget, emoji);
    }
    setShowReactionPicker(false);
    setReactionTarget(null);
  };

  const handleVoice = () => {
    showAlert(
      '🎤 ' + t('Voice Message', 'آواز پیغام'),
      t('Hold the mic button to record. Voice messages use expo-av — available in next update with full recording support.', 'مائیک بٹن دبائے رکھیں۔ آواز پیغام اگلے اپڈیٹ میں آئے گا۔')
    );
  };

  const handleAttach = () => {
    showAlert(
      '📎 ' + t('Attach Media', 'میڈیا منسلک کریں'),
      t('Choose attachment type', 'منسلک کرنے کی قسم منتخب کریں'),
      [
        { text: '📷 ' + t('Camera', 'کیمرہ'), onPress: () => showAlert('Camera', t('Camera feature coming with full backend.', 'کیمرہ فیچر بیک اینڈ کے ساتھ آئے گا۔')) },
        { text: '🖼️ ' + t('Gallery', 'گیلری'), onPress: () => showAlert('Gallery', t('Gallery sharing coming soon!', 'گیلری شیئرنگ جلد آ رہی ہے!')) },
        { text: '📄 ' + t('Document', 'دستاویز'), onPress: () => showAlert('Document', t('Document sharing coming soon!', 'دستاویز شیئرنگ جلد!')) },
        { text: t('Cancel', 'منسوخ'), style: 'cancel' },
      ]
    );
  };

  if (!contact) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>{t('Contact not found', 'رابطہ نہیں ملا')}</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: Colors.primary }}>← {t('Go Back', 'واپس جائیں')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const sentBubble = theme.sentBubble;

  const renderMessage = ({ item, index }: { item: Message; index: number }) => {
    const isSent = item.sent;
    const showAvatar = !isSent && (index === 0 || chatMessages[index - 1]?.sent);

    return (
      <Pressable onLongPress={() => handleLongPress(item)}>
        <View style={[styles.messageWrap, isSent && styles.messageWrapSent]}>
          {!isSent && showAvatar && (
            <LinearGradient colors={[theme.primary, theme.secondary]} style={styles.msgAvatar}>
              <Text style={styles.msgAvatarText}>{contact.avatar.charAt(0)}</Text>
            </LinearGradient>
          )}
          {!isSent && !showAvatar && <View style={{ width: 30 }} />}

          <View style={{ maxWidth: width * 0.72 }}>
            {item.isForwarded && (
              <View style={styles.forwardedBadge}>
                <MaterialCommunityIcons name="share" size={11} color={Colors.textMuted} />
                <Text style={styles.forwardedText}>{t('Forwarded', 'فارورڈ شدہ')}</Text>
              </View>
            )}
            {item.replyTo && (
              <View style={[styles.replyBar, isSent ? styles.replyBarSent : styles.replyBarReceived]}>
                <Text style={styles.replyName}>{item.replyTo.sender}</Text>
                <Text style={styles.replyText} numberOfLines={1}>{item.replyTo.text}</Text>
              </View>
            )}

            <View style={[
              styles.bubble,
              isSent ? [styles.bubbleSent, { backgroundColor: sentBubble }] : styles.bubbleReceived,
              selectedMsg?.id === item.id && styles.bubbleSelected,
            ]}>
              {item.starred && (
                <View style={styles.starIcon}>
                  <MaterialIcons name="star" size={12} color={Colors.accent} />
                </View>
              )}
              <Text style={[styles.bubbleText, isSent ? styles.bubbleTextSent : styles.bubbleTextReceived]}>
                {item.text}
              </Text>
              <View style={styles.bubbleMeta}>
                <Text style={[styles.bubbleTime, isSent ? styles.bubbleTimeSent : styles.bubbleTimeReceived]}>
                  {item.time}
                </Text>
                {isSent && (
                  <MaterialCommunityIcons
                    name={item.isRead ? 'check-all' : 'check'}
                    size={14}
                    color={item.isRead ? '#90caf9' : 'rgba(255,255,255,0.6)'}
                  />
                )}
              </View>
            </View>

            {/* Reactions */}
            {item.reactions && item.reactions.length > 0 && (
              <TouchableOpacity
                style={[styles.reactionsRow, isSent && { justifyContent: 'flex-end' }]}
                onPress={() => handleReactionPress(item.id)}
              >
                <View style={styles.reactionsBubble}>
                  {item.reactions.map((r, i) => (
                    <Text key={i} style={styles.reactionEmoji}>{r.emoji}</Text>
                  ))}
                  <Text style={styles.reactionCount}>
                    {item.reactions.reduce((sum, r) => sum + r.count, 0)}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>

          {/* Quick reaction */}
          <TouchableOpacity
            style={styles.quickReactBtn}
            onPress={() => handleReactionPress(item.id)}
          >
            <MaterialCommunityIcons name="emoticon-outline" size={16} color={Colors.textLight} />
          </TouchableOpacity>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={theme.chatBg}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Header */}
      <LinearGradient
        colors={theme.isDark ? [theme.surface, theme.surfaceLight] : theme.headerGradient}
        style={[styles.header, { paddingTop: insets.top + 8 }]}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <MaterialIcons name="arrow-back" size={24} color={theme.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerContact}
          onPress={() => showAlert(contact.username, `${contact.bio || ''}\n${contact.phone || ''}`)}
          activeOpacity={0.8}
        >
          <LinearGradient colors={[theme.primary, theme.secondary]} style={styles.headerAvatar}>
            <Text style={styles.headerAvatarText}>{contact.avatar.charAt(0).toUpperCase()}</Text>
          </LinearGradient>
          <View style={styles.headerInfo}>
            <Text style={[styles.headerName, theme.isDark && { color: '#fff' }]}>{contact.username}</Text>
            <Text style={[styles.headerStatus, { color: contact.online ? Colors.success : Colors.textMuted }]}>
              {contact.online
                ? (isTyping ? '✏️ ' + t('typing...', 'ٹائپ کر رہا ہے...') : '🟢 ' + t('Online', 'آن لائن'))
                : '⚫ ' + t('Offline', 'آف لائن')}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerBtn} onPress={() => handleCall('audio')}>
          <MaterialCommunityIcons name="phone-outline" size={22} color={theme.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerBtn} onPress={() => handleCall('video')}>
          <MaterialCommunityIcons name="video-outline" size={22} color={theme.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerBtn} onPress={() => showAlert(contact.username, t('Contact info, mute, block — coming soon!', 'رابطہ معلومات جلد آ رہی ہے!'))}>
          <MaterialCommunityIcons name="dots-vertical" size={22} color={theme.primary} />
        </TouchableOpacity>
      </LinearGradient>

      {/* Messages */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={0}
      >
        <FlatList
          ref={flatRef}
          data={chatMessages}
          keyExtractor={item => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyChat}>
              <LinearGradient colors={[theme.primary, theme.secondary]} style={styles.emptyChatIcon}>
                <Text style={{ fontSize: 36 }}>{contact.avatar.charAt(0)}</Text>
              </LinearGradient>
              <Text style={[styles.emptyChatName, theme.isDark && { color: '#fff' }]}>{contact.username}</Text>
              <Text style={[styles.emptyChatHint, theme.isDark && { color: '#aaa' }]}>
                {t('Say hello! 👋', 'سلام کریں! 👋')}
              </Text>
              <View style={styles.encryptBadge}>
                <MaterialCommunityIcons name="lock" size={12} color={Colors.success} />
                <Text style={styles.encryptText}>{t('End-to-end encrypted', 'اینڈ ٹو اینڈ انکرپٹڈ')}</Text>
              </View>
            </View>
          }
        />

        {/* Input Bar */}
        <View style={[styles.inputArea, {
          paddingBottom: insets.bottom + 8,
          backgroundColor: theme.isDark ? 'rgba(26,26,46,0.97)' : 'rgba(255,255,255,0.97)',
          borderTopColor: theme.borderColor,
        }]}>
          <TouchableOpacity style={styles.inputBtn} onPress={handleAttach}>
            <MaterialCommunityIcons name="paperclip" size={22} color={theme.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.inputBtn} onPress={() => showAlert('😊', t('Emoji picker coming soon!', 'ایموجی پکر جلد آئے گا!'))}>
            <MaterialCommunityIcons name="emoticon-outline" size={22} color={theme.primary} />
          </TouchableOpacity>
          <TextInput
            style={[styles.textInput, theme.isDark && { backgroundColor: '#2a2a45', color: '#fff', borderColor: 'rgba(162,155,254,0.3)' }]}
            placeholder={t('Type a message...', 'پیغام لکھیں...')}
            value={text}
            onChangeText={handleTextChange}
            multiline
            maxLength={2000}
            placeholderTextColor={Colors.textMuted}
          />
          {text.trim() ? (
            <TouchableOpacity style={[styles.sendBtn, { overflow: 'hidden' }]} onPress={handleSend} activeOpacity={0.8}>
              <LinearGradient colors={[Colors.success, Colors.successDark]} style={styles.sendBtnGrad}>
                <MaterialIcons name="send" size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles.sendBtn, { overflow: 'hidden' }]} onLongPress={handleVoice} onPress={handleVoice} activeOpacity={0.8}>
              <LinearGradient colors={[theme.primary, theme.primaryDark]} style={styles.sendBtnGrad}>
                <MaterialCommunityIcons name="microphone" size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>

      {/* Message Long Press Actions */}
      <Modal visible={!!selectedMsg} transparent animationType="fade" onRequestClose={() => setSelectedMsg(null)}>
        <Pressable style={styles.overlay} onPress={() => setSelectedMsg(null)}>
          <View style={styles.actionMenu}>
            <Text style={styles.actionMenuPreview} numberOfLines={2}>{selectedMsg?.text}</Text>
            <View style={styles.actionMenuReactions}>
              {MESSAGE_REACTIONS.map(emoji => (
                <TouchableOpacity
                  key={emoji}
                  style={styles.actionMenuReact}
                  onPress={() => { addReaction(id, selectedMsg!.id, emoji); setSelectedMsg(null); }}
                >
                  <Text style={{ fontSize: 24 }}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {[
              { icon: 'reply', label: t('Reply', 'جواب'), action: () => { showAlert(t('Reply', 'جواب'), t('Reply feature coming soon!', 'جواب فیچر جلد!')); setSelectedMsg(null); } },
              { icon: 'content-copy', label: t('Copy', 'کاپی'), action: () => setSelectedMsg(null) },
              { icon: 'star-outline', label: selectedMsg?.starred ? t('Unstar', 'ان سٹار') : t('Star', 'سٹار'), action: () => { starMessage(id, selectedMsg!.id); setSelectedMsg(null); } },
              { icon: 'share', label: t('Forward', 'فارورڈ'), action: () => setSelectedMsg(null) },
              { icon: 'delete-outline', label: t('Delete', 'حذف'), action: () => { deleteMessage(id, selectedMsg!.id); setSelectedMsg(null); } },
            ].map((action, i) => (
              <TouchableOpacity key={i} style={styles.actionRow} onPress={action.action}>
                <MaterialIcons name={action.icon as any} size={20} color={action.icon === 'delete-outline' ? Colors.danger : Colors.textPrimary} />
                <Text style={[styles.actionLabel, action.icon === 'delete-outline' && { color: Colors.danger }]}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>

      {/* Reaction Picker */}
      <Modal visible={showReactionPicker} transparent animationType="fade" onRequestClose={() => setShowReactionPicker(false)}>
        <Pressable style={styles.overlay} onPress={() => setShowReactionPicker(false)}>
          <View style={styles.reactionPicker}>
            <Text style={styles.reactionPickerTitle}>{t('React with', 'ری ایکشن')}</Text>
            <View style={styles.reactionPickerRow}>
              {MESSAGE_REACTIONS.map(emoji => (
                <TouchableOpacity key={emoji} style={styles.reactionPickerItem} onPress={() => handleReact(emoji)}>
                  <Text style={{ fontSize: 32 }}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  notFoundText: { fontSize: Typography.lg, color: Colors.textMuted },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    paddingHorizontal: 4,
    gap: 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderPink,
    ...Shadow.pink,
    zIndex: 10,
  },
  backBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  headerContact: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerAvatar: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  headerAvatarText: { color: '#fff', fontSize: Typography.xl, fontWeight: Typography.bold },
  headerInfo: { flex: 1 },
  headerName: { fontSize: Typography.base, fontWeight: Typography.bold, color: Colors.textPrimary },
  headerStatus: { fontSize: Typography.xs, marginTop: 1 },
  headerBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20 },
  messagesContent: { paddingHorizontal: 8, paddingVertical: 12, flexGrow: 1 },
  messageWrap: { marginBottom: 4, flexDirection: 'row', alignItems: 'flex-end', gap: 6 },
  messageWrapSent: { justifyContent: 'flex-end' },
  msgAvatar: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  msgAvatarText: { color: '#fff', fontSize: 12, fontWeight: Typography.bold },
  forwardedBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 2, paddingHorizontal: 4 },
  forwardedText: { fontSize: 10, color: Colors.textMuted, fontStyle: 'italic' },
  replyBar: { borderRadius: Radius.sm, padding: 8, marginBottom: 4, borderLeftWidth: 3 },
  replyBarSent: { backgroundColor: 'rgba(255,255,255,0.2)', borderLeftColor: 'rgba(255,255,255,0.6)' },
  replyBarReceived: { backgroundColor: 'rgba(255,107,157,0.08)', borderLeftColor: Colors.primary },
  replyName: { fontSize: 11, fontWeight: Typography.bold, color: Colors.primary, marginBottom: 2 },
  replyText: { fontSize: 11, color: Colors.textMuted },
  bubble: {
    padding: 10,
    borderRadius: Radius.lg,
    ...Shadow.soft,
    position: 'relative',
  },
  bubbleSent: { borderBottomRightRadius: 4 },
  bubbleReceived: { backgroundColor: '#fff', borderBottomLeftRadius: 4 },
  bubbleSelected: { opacity: 0.7 },
  starIcon: { position: 'absolute', top: 4, right: 4 },
  bubbleText: { fontSize: Typography.base, lineHeight: 22 },
  bubbleTextSent: { color: '#fff' },
  bubbleTextReceived: { color: Colors.textPrimary },
  bubbleMeta: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 4, marginTop: 4 },
  bubbleTime: { fontSize: 10 },
  bubbleTimeSent: { color: 'rgba(255,255,255,0.75)' },
  bubbleTimeReceived: { color: Colors.textMuted },
  reactionsRow: { flexDirection: 'row', marginTop: 2, paddingHorizontal: 4 },
  reactionsBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: Radius.full,
    paddingHorizontal: 8,
    paddingVertical: 3,
    ...Shadow.soft,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    gap: 3,
  },
  reactionEmoji: { fontSize: 14 },
  reactionCount: { fontSize: 11, color: Colors.textMuted, fontWeight: Typography.medium },
  quickReactBtn: { width: 28, height: 28, alignItems: 'center', justifyContent: 'center', opacity: 0.6 },
  emptyChat: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 80, gap: 12 },
  emptyChatIcon: { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center' },
  emptyChatName: { fontSize: Typography.xl, fontWeight: Typography.bold, color: Colors.textPrimary },
  emptyChatHint: { fontSize: Typography.base, color: Colors.textMuted },
  encryptBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(29,209,161,0.08)', paddingHorizontal: 12, paddingVertical: 5, borderRadius: Radius.full },
  encryptText: { fontSize: Typography.xs, color: Colors.success, fontWeight: Typography.medium },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    gap: 4,
  },
  inputBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 22 },
  textInput: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    backgroundColor: '#f5f5f5',
    borderRadius: Radius.xl,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: Typography.base,
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  sendBtn: { width: 46, height: 46, borderRadius: 23 },
  sendBtnGrad: { width: 46, height: 46, alignItems: 'center', justifyContent: 'center' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  actionMenu: {
    backgroundColor: '#fff',
    borderRadius: Radius.xl,
    padding: 16,
    width: width * 0.85,
    maxWidth: 360,
    ...Shadow.pink,
  },
  actionMenuPreview: {
    fontSize: Typography.sm,
    color: Colors.textMuted,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
    paddingLeft: 8,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  actionMenuReactions: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.06)' },
  actionMenuReact: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  actionRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, gap: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.04)' },
  actionLabel: { fontSize: Typography.base, color: Colors.textPrimary, fontWeight: Typography.medium },
  reactionPicker: {
    backgroundColor: '#fff',
    borderRadius: Radius.xl,
    padding: 20,
    width: width * 0.85,
    maxWidth: 340,
    alignItems: 'center',
    ...Shadow.pink,
  },
  reactionPickerTitle: { fontSize: Typography.base, fontWeight: Typography.bold, color: Colors.textPrimary, marginBottom: 16 },
  reactionPickerRow: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  reactionPickerItem: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
});
