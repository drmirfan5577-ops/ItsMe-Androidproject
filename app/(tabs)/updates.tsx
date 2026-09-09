import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAlert } from '@/template';
import { useApp } from '@/hooks/useApp';
import { MOCK_STATUSES } from '@/constants/mockData';
import { Colors, Typography, Radius, Shadow } from '@/constants/theme';

export default function UpdatesScreen() {
  const insets = useSafeAreaInsets();
  const { showAlert } = useAlert();
  const { t, theme } = useApp();
  const [statuses, setStatuses] = useState(MOCK_STATUSES);
  const [viewingStatus, setViewingStatus] = useState<typeof MOCK_STATUSES[0] | null>(null);
  const [progressAnim] = useState(0.6);

  const handleAddStatus = () => {
    showAlert(
      t('Add Status', 'سٹیٹس شامل کریں'),
      t('Choose what to share as your status', 'اپنا سٹیٹس شیئر کریں'),
      [
        { text: '🖼️ ' + t('Photo', 'تصویر'), onPress: () => showAlert('Coming Soon', t('Photo status available with full backend.', 'تصویر سٹیٹس بیک اینڈ کے ساتھ')) },
        { text: '✍️ ' + t('Text Status', 'متن سٹیٹس'), onPress: () => showAlert('Coming Soon', t('Text status coming!', 'متن سٹیٹس جلد!')) },
        { text: '🎥 ' + t('Video', 'ویڈیو'), onPress: () => showAlert('Coming Soon', t('Video status coming!', 'ویڈیو سٹیٹس جلد!')) },
        { text: t('Cancel', 'منسوخ'), style: 'cancel' },
      ]
    );
  };

  const viewStatus = (item: typeof MOCK_STATUSES[0]) => {
    setStatuses(prev => prev.map(s => s.id === item.id ? { ...s, viewed: true } : s));
    setViewingStatus(item);
  };

  return (
    <View style={[styles.root, theme.isDark && { backgroundColor: '#1a1a2e' }]}>
      <LinearGradient colors={theme.bgGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFillObject} />

      {/* Header */}
      <LinearGradient
        colors={theme.isDark ? [theme.surface, theme.surfaceLight] : theme.headerGradient}
        style={[styles.header, { paddingTop: insets.top + 12, borderBottomColor: theme.borderColor }]}
      >
        <Text style={[styles.headerTitle, theme.isDark && { color: '#fff' }]}>
          📢 {t('Updates', 'اپ ڈیٹس')}
        </Text>
        <Text style={styles.headerSub}>{t('Status & Stories — 24 hours', 'سٹیٹس اور کہانیاں — 24 گھنٹے')}</Text>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        {/* My Status */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, theme.isDark && { color: '#aaa' }]}>{t('My Status', 'میرا سٹیٹس')}</Text>
          <TouchableOpacity style={[styles.myStatusCard, theme.isDark && { backgroundColor: 'rgba(40,40,65,0.9)' }]} onPress={handleAddStatus} activeOpacity={0.8}>
            <View style={styles.addAvatarWrap}>
              <LinearGradient colors={[theme.primary, theme.secondary]} style={styles.addAvatar}>
                <Text style={styles.addAvatarText}>A</Text>
              </LinearGradient>
              <View style={[styles.addIcon, { backgroundColor: theme.primary }]}>
                <MaterialCommunityIcons name="plus" size={14} color="#fff" />
              </View>
            </View>
            <View style={styles.myStatusInfo}>
              <Text style={[styles.myStatusTitle, theme.isDark && { color: '#fff' }]}>{t('Add to My Status', 'میرا سٹیٹس شامل کریں')}</Text>
              <Text style={styles.myStatusSub}>{t('Tap to add photo, video or text', 'تصویر، ویڈیو یا متن شامل کریں')}</Text>
            </View>
            <MaterialCommunityIcons name="camera-outline" size={22} color={theme.primary} />
          </TouchableOpacity>
        </View>

        {/* Recent Status */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, theme.isDark && { color: '#aaa' }]}>{t('Recent Updates', 'حالیہ اپ ڈیٹس')}</Text>
          {statuses.map(item => (
            <TouchableOpacity
              key={item.id}
              style={[styles.statusItem, theme.isDark && { backgroundColor: 'rgba(40,40,65,0.9)' }]}
              onPress={() => viewStatus(item)}
              activeOpacity={0.8}
            >
              <View style={[styles.statusRingOuter, { borderColor: item.viewed ? '#ccc' : theme.primary }]}>
                <LinearGradient
                  colors={item.viewed ? ['#ccc', '#aaa'] : [theme.primary, theme.secondary]}
                  style={styles.statusAvatar}
                >
                  <Text style={styles.statusAvatarText}>{item.avatar}</Text>
                </LinearGradient>
              </View>
              <View style={styles.statusInfo}>
                <Text style={[styles.statusName, theme.isDark && { color: '#fff' }]}>{item.username}</Text>
                <Text style={styles.statusText} numberOfLines={1}>{item.text}</Text>
                <Text style={styles.statusTime}>{item.time}</Text>
              </View>
              {!item.viewed && <View style={[styles.newDot, { backgroundColor: theme.primary }]} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Channels */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, theme.isDark && { color: '#aaa' }]}>{t('Channels', 'چینلز')}</Text>
            <TouchableOpacity onPress={() => showAlert(t('Channels', 'چینلز'), t('Find and follow channels!', 'چینلز تلاش کریں اور فالو کریں!'))}>
              <Text style={[styles.seeAll, { color: theme.primary }]}>{t('Find Channels', 'چینلز تلاش')}</Text>
            </TouchableOpacity>
          </View>
          {[
            { name: 'SMART World Order', desc: t('Official announcements & updates', 'سرکاری اعلانات'), icon: '🌐', subs: '1.2K', verified: true },
            { name: 'Islamic Daily', desc: t('Daily Islamic reminders', 'روزانہ اسلامی یادہانی'), icon: '☪️', subs: '8.9K', verified: true },
            { name: 'Pakistan Tech', desc: t('Technology & innovation news', 'ٹیکنالوجی خبریں'), icon: '💻', subs: '23K', verified: false },
            { name: 'Quran Reminders', desc: t('Daily Quran verses & reflections', 'روزانہ قرآنی آیات'), icon: '📖', subs: '45K', verified: true },
          ].map((ch, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.channelCard, theme.isDark && { backgroundColor: 'rgba(40,40,65,0.9)' }]}
              onPress={() => showAlert(ch.name, t('Channel feature coming with full backend integration!', 'چینل فیچر بیک اینڈ کے ساتھ آئے گا!'))}
              activeOpacity={0.8}
            >
              <View style={styles.channelIcon}>
                <Text style={{ fontSize: 26 }}>{ch.icon}</Text>
              </View>
              <View style={styles.channelInfo}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Text style={[styles.channelName, theme.isDark && { color: '#fff' }]}>{ch.name}</Text>
                  {ch.verified && <MaterialCommunityIcons name="check-decagram" size={14} color={theme.secondary} />}
                </View>
                <Text style={styles.channelDesc}>{ch.desc}</Text>
              </View>
              <View style={styles.channelMeta}>
                <Text style={styles.channelSubs}>{ch.subs}</Text>
                <TouchableOpacity style={[styles.followBtn, { backgroundColor: theme.primary }]}>
                  <Text style={styles.followBtnText}>{t('Follow', 'فالو')}</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Broadcasts */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, theme.isDark && { color: '#aaa' }]}>{t('Broadcast Lists', 'نشریاتی فہرستیں')}</Text>
          <TouchableOpacity
            style={[styles.broadcastCard, theme.isDark && { backgroundColor: 'rgba(40,40,65,0.9)' }, { borderLeftColor: theme.primary }]}
            onPress={() => showAlert(t('Broadcast', 'نشریات'), t('Create broadcast lists to send messages to multiple contacts at once.', 'ایک ساتھ کئی رابطوں کو پیغام بھیجیں'))}
          >
            <MaterialCommunityIcons name="broadcast" size={26} color={theme.primary} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.broadcastTitle, theme.isDark && { color: '#fff' }]}>{t('New Broadcast List', 'نئی نشریاتی فہرست')}</Text>
              <Text style={styles.broadcastSub}>{t('Send to multiple contacts at once', 'ایک ساتھ کئی رابطوں کو')}</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={22} color={Colors.textMuted} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Status Viewer Modal */}
      <Modal visible={!!viewingStatus} transparent animationType="fade" onRequestClose={() => setViewingStatus(null)}>
        <Pressable style={styles.statusModal} onPress={() => setViewingStatus(null)}>
          {viewingStatus && (
            <LinearGradient
              colors={[viewingStatus.bgColor, '#000']}
              style={styles.statusViewer}
            >
              {/* Progress Bar */}
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${progressAnim * 100}%`, backgroundColor: '#fff' }]} />
              </View>

              {/* Header */}
              <View style={styles.statusViewerHeader}>
                <View style={styles.statusViewerAvatar}>
                  <Text style={{ fontSize: 22, color: '#fff', fontWeight: '700' }}>{viewingStatus.avatar}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.statusViewerName}>{viewingStatus.username}</Text>
                  <Text style={styles.statusViewerTime}>{viewingStatus.time}</Text>
                </View>
                <TouchableOpacity onPress={() => setViewingStatus(null)}>
                  <MaterialCommunityIcons name="close" size={24} color="#fff" />
                </TouchableOpacity>
              </View>

              {/* Content */}
              <View style={styles.statusViewerContent}>
                <Text style={styles.statusViewerText}>{viewingStatus.text}</Text>
              </View>

              {/* Reply */}
              <View style={styles.statusReplyRow}>
                <View style={styles.statusReplyInput}>
                  <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: Typography.base }}>
                    {t('Reply to status...', 'سٹیٹس کا جواب دیں...')}
                  </Text>
                </View>
                <TouchableOpacity style={styles.statusReplyEmoji}>
                  <Text style={{ fontSize: 22 }}>❤️</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          )}
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { paddingHorizontal: 16, paddingBottom: 14, borderBottomWidth: 1, ...Shadow.pink, zIndex: 10 },
  headerTitle: { fontSize: Typography.xl, fontWeight: Typography.bold, color: Colors.textPrimary },
  headerSub: { fontSize: Typography.sm, color: Colors.textMuted, marginTop: 2 },
  section: { paddingHorizontal: 12, paddingTop: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: Typography.base, fontWeight: Typography.bold, color: Colors.textSecondary, paddingLeft: 4 },
  seeAll: { fontSize: Typography.sm, fontWeight: Typography.medium },
  myStatusCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surfaceLight, borderRadius: Radius.lg, padding: 14, ...Shadow.card, gap: 14 },
  addAvatarWrap: { position: 'relative' },
  addAvatar: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  addAvatarText: { color: '#fff', fontSize: Typography.xl, fontWeight: Typography.bold },
  addIcon: { position: 'absolute', bottom: 0, right: 0, width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#fff' },
  myStatusInfo: { flex: 1 },
  myStatusTitle: { fontSize: Typography.base, fontWeight: Typography.semibold, color: Colors.textPrimary },
  myStatusSub: { fontSize: Typography.sm, color: Colors.textMuted, marginTop: 2 },
  statusItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surfaceLight, borderRadius: Radius.lg, padding: 12, marginBottom: 6, ...Shadow.card },
  statusRingOuter: { width: 58, height: 58, borderRadius: 29, borderWidth: 2.5, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  statusAvatar: { width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center' },
  statusAvatarText: { color: '#fff', fontSize: Typography.xl, fontWeight: Typography.bold },
  statusInfo: { flex: 1 },
  statusName: { fontSize: Typography.base, fontWeight: Typography.semibold, color: Colors.textPrimary },
  statusText: { fontSize: Typography.sm, color: Colors.textMuted, marginTop: 1 },
  statusTime: { fontSize: Typography.xs, color: Colors.textLight, marginTop: 1 },
  newDot: { width: 10, height: 10, borderRadius: 5 },
  channelCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surfaceLight, borderRadius: Radius.lg, padding: 14, marginBottom: 8, ...Shadow.card, gap: 12 },
  channelIcon: { width: 48, height: 48, borderRadius: Radius.md, backgroundColor: 'rgba(255,107,157,0.08)', alignItems: 'center', justifyContent: 'center' },
  channelInfo: { flex: 1 },
  channelName: { fontSize: Typography.base, fontWeight: Typography.semibold, color: Colors.textPrimary },
  channelDesc: { fontSize: Typography.sm, color: Colors.textMuted, marginTop: 2 },
  channelMeta: { alignItems: 'flex-end', gap: 6 },
  channelSubs: { fontSize: Typography.xs, color: Colors.textMuted },
  followBtn: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: Radius.full },
  followBtnText: { color: '#fff', fontSize: Typography.sm, fontWeight: Typography.bold },
  broadcastCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surfaceLight, borderRadius: Radius.lg, padding: 16, ...Shadow.card, gap: 14, borderLeftWidth: 4 },
  broadcastTitle: { fontSize: Typography.base, fontWeight: Typography.semibold, color: Colors.textPrimary },
  broadcastSub: { fontSize: Typography.sm, color: Colors.textMuted, marginTop: 2 },
  statusModal: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center' },
  statusViewer: { width: '95%', height: '80%', borderRadius: Radius['2xl'], overflow: 'hidden', padding: 20 },
  progressBar: { height: 3, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 2, marginBottom: 16 },
  progressFill: { height: '100%', borderRadius: 2 },
  statusViewerHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  statusViewerAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  statusViewerName: { color: '#fff', fontSize: Typography.base, fontWeight: Typography.bold },
  statusViewerTime: { color: 'rgba(255,255,255,0.7)', fontSize: Typography.xs, marginTop: 2 },
  statusViewerContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  statusViewerText: { color: '#fff', fontSize: Typography['2xl'], fontWeight: Typography.bold, textAlign: 'center', lineHeight: 36 },
  statusReplyRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  statusReplyInput: { flex: 1, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: Radius.full, paddingHorizontal: 16, paddingVertical: 12 },
  statusReplyEmoji: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
});
