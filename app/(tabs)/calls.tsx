import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SectionList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useAlert } from '@/template';
import { useApp } from '@/hooks/useApp';
import { MOCK_CALLS } from '@/constants/mockData';
import { Colors, Typography, Radius, Shadow } from '@/constants/theme';

type CallItem = typeof MOCK_CALLS[0];

export default function CallsScreen() {
  const insets = useSafeAreaInsets();
  const { showAlert } = useAlert();
  const { t, theme, contacts } = useApp();
  const [tab, setTab] = useState<'all' | 'missed'>('all');

  const filtered = tab === 'missed' ? MOCK_CALLS.filter(c => c.status === 'missed') : MOCK_CALLS;

  // Group by date
  const grouped: { title: string; data: CallItem[] }[] = [];
  const dates = [...new Set(filtered.map(c => c.date))];
  dates.forEach(date => {
    grouped.push({ title: date, data: filtered.filter(c => c.date === date) });
  });

  const startCall = (type: 'audio' | 'video') => {
    showAlert(
      type === 'video' ? '📹 ' + t('Video Call', 'ویڈیو کال') : '📞 ' + t('Voice Call', 'آواز کال'),
      t('WebRTC calling will be available when OnSpace Cloud backend is enabled. Real-time call routing requires the backend service.', 'بیک اینڈ سروس فعال ہونے پر کالنگ دستیاب ہوگی۔'),
      [
        { text: t('OK', 'ٹھیک ہے'), style: 'default' },
      ]
    );
  };

  const renderCall = ({ item }: { item: CallItem }) => {
    const isIncoming = item.direction === 'incoming';
    const isMissed = item.status === 'missed';
    const contact = contacts.find(c => c.id === item.contactId);

    return (
      <TouchableOpacity
        style={[styles.callItem, theme.isDark && { backgroundColor: 'rgba(40,40,65,0.9)' }]}
        onPress={() => startCall(item.type)}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={isMissed ? [Colors.danger, '#c0392b'] : [theme.primary, theme.secondary]}
          style={styles.callAvatar}
        >
          <Text style={styles.callAvatarText}>{item.avatar}</Text>
        </LinearGradient>
        <View style={styles.callInfo}>
          <Text style={[styles.callName, theme.isDark && { color: '#fff' }]}>{item.username}</Text>
          <View style={styles.callMeta}>
            <MaterialCommunityIcons
              name={isIncoming ? 'phone-incoming' : 'phone-outgoing'}
              size={14}
              color={isMissed ? Colors.danger : Colors.success}
            />
            <Text style={[styles.callType, { color: isMissed ? Colors.danger : Colors.textMuted }]}>
              {isMissed ? t('Missed', 'مس کال') : (isIncoming ? t('Incoming', 'آنے والی') : t('Outgoing', 'جانے والی'))}
              {' · '}
              {item.type === 'video' ? '📹' : '📞'}
              {item.duration ? ` · ${item.duration}` : ''}
            </Text>
          </View>
        </View>
        <Text style={styles.callTime}>{item.time}</Text>
        <TouchableOpacity style={[styles.callBtn, { borderColor: theme.primary }]} onPress={() => startCall(item.type)}>
          <MaterialCommunityIcons
            name={item.type === 'video' ? 'video-outline' : 'phone-outline'}
            size={20}
            color={theme.primary}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.root}>
      <LinearGradient colors={theme.bgGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFillObject} />

      {/* Header */}
      <LinearGradient
        colors={theme.isDark ? [theme.surface, theme.surfaceLight] : theme.headerGradient}
        style={[styles.header, { paddingTop: insets.top + 12, borderBottomColor: theme.borderColor }]}
      >
        <Text style={[styles.headerTitle, theme.isDark && { color: '#fff' }]}>
          📞 {t('Calls', 'کالز')}
        </Text>

        {/* Tab Toggle */}
        <View style={[styles.tabRow, theme.isDark && { backgroundColor: 'rgba(40,40,65,0.8)' }]}>
          {(['all', 'missed'] as const).map(tabKey => (
            <TouchableOpacity
              key={tabKey}
              style={[styles.tabBtn, tab === tabKey && { backgroundColor: theme.primary }]}
              onPress={() => setTab(tabKey)}
            >
              <Text style={[styles.tabText, tab === tabKey && { color: '#fff' }]}>
                {tabKey === 'all' ? t('All', 'سب') : t('Missed', 'مس')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>

      {/* New Call Buttons */}
      <View style={styles.newCallRow}>
        <TouchableOpacity style={[styles.newCallBtn, { borderColor: theme.primary }]} onPress={() => startCall('audio')}>
          <LinearGradient colors={[theme.primary, theme.primaryDark]} style={styles.newCallBtnInner}>
            <MaterialCommunityIcons name="phone-plus" size={22} color="#fff" />
          </LinearGradient>
          <Text style={[styles.newCallLabel, { color: theme.primary }]}>{t('New Call', 'نئی کال')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.newCallBtn, { borderColor: theme.secondary }]} onPress={() => startCall('video')}>
          <LinearGradient colors={[theme.secondary, theme.primary]} style={styles.newCallBtnInner}>
            <MaterialCommunityIcons name="video-plus" size={22} color="#fff" />
          </LinearGradient>
          <Text style={[styles.newCallLabel, { color: theme.secondary }]}>{t('Video Call', 'ویڈیو کال')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.newCallBtn, { borderColor: Colors.success }]}
          onPress={() => showAlert('📢 ' + t('Group Call', 'گروپ کال'), t('Group calls coming with full backend!', 'گروپ کالز بیک اینڈ کے ساتھ آئیں گی!'))}>
          <LinearGradient colors={[Colors.success, Colors.successDark]} style={styles.newCallBtnInner}>
            <MaterialCommunityIcons name="account-group" size={22} color="#fff" />
          </LinearGradient>
          <Text style={[styles.newCallLabel, { color: Colors.success }]}>{t('Group', 'گروپ')}</Text>
        </TouchableOpacity>
      </View>

      {/* Backend Info Banner */}
      <View style={styles.infoBanner}>
        <MaterialCommunityIcons name="information-outline" size={16} color={Colors.secondary} />
        <Text style={styles.infoText}>
          {t('Enable OnSpace Cloud for real-time calls (WebRTC)', 'حقیقی کالز کے لیے OnSpace Cloud فعال کریں')}
        </Text>
      </View>

      {/* Call History */}
      <SectionList
        sections={grouped}
        keyExtractor={item => item.id}
        renderItem={renderCall}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📞</Text>
            <Text style={[styles.emptyTitle, theme.isDark && { color: '#fff' }]}>
              {t('No calls yet', 'ابھی کوئی کال نہیں')}
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    paddingHorizontal: 16, paddingBottom: 12,
    borderBottomWidth: 1,
    ...Shadow.pink, zIndex: 10,
  },
  headerTitle: { fontSize: Typography.xl, fontWeight: Typography.bold, color: Colors.textPrimary, marginBottom: 10 },
  tabRow: {
    flexDirection: 'row', backgroundColor: '#f0f0f0',
    borderRadius: Radius.lg, padding: 3, alignSelf: 'flex-start',
  },
  tabBtn: { paddingHorizontal: 20, paddingVertical: 7, borderRadius: Radius.md },
  tabText: { fontSize: Typography.sm, fontWeight: Typography.semibold, color: Colors.textMuted },
  newCallRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, paddingVertical: 14 },
  newCallBtn: {
    flex: 1, alignItems: 'center', borderRadius: Radius.lg,
    borderWidth: 1, paddingVertical: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    ...Shadow.card,
  },
  newCallBtnInner: {
    width: 44, height: 44, borderRadius: 22,
    alignItems: 'center', justifyContent: 'center', marginBottom: 6,
  },
  newCallLabel: { fontSize: Typography.sm, fontWeight: Typography.semibold },
  infoBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    marginHorizontal: 14, marginBottom: 8,
    backgroundColor: 'rgba(69,170,242,0.1)',
    borderRadius: Radius.md, padding: 10,
    borderLeftWidth: 3, borderLeftColor: Colors.secondary,
  },
  infoText: { fontSize: Typography.xs, color: Colors.secondary, flex: 1 },
  listContent: { paddingHorizontal: 12, paddingBottom: 20 },
  sectionHeader: { paddingVertical: 6, paddingHorizontal: 4, marginBottom: 4 },
  sectionTitle: { fontSize: Typography.sm, fontWeight: Typography.bold, color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 },
  callItem: {
    flexDirection: 'row', alignItems: 'center',
    padding: 12, marginBottom: 6,
    backgroundColor: Colors.surfaceLight,
    borderRadius: Radius.lg,
    ...Shadow.card, gap: 12,
  },
  callAvatar: { width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center' },
  callAvatarText: { color: '#fff', fontSize: Typography.xl, fontWeight: Typography.bold },
  callInfo: { flex: 1 },
  callName: { fontSize: Typography.base, fontWeight: Typography.semibold, color: Colors.textPrimary, marginBottom: 4 },
  callMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  callType: { fontSize: Typography.xs },
  callTime: { fontSize: Typography.xs, color: Colors.textMuted },
  callBtn: {
    width: 40, height: 40, borderRadius: 20,
    borderWidth: 1.5, alignItems: 'center', justifyContent: 'center',
  },
  emptyState: { alignItems: 'center', paddingTop: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: Typography.lg, fontWeight: Typography.bold, color: Colors.textPrimary },
});
