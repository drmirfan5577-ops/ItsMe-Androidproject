import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useApp } from '@/hooks/useApp';
import { Colors, Typography, Spacing, Radius, Shadow } from '@/constants/theme';

const FILTERS = ['All', 'Unread', 'Groups', 'Starred'];
type Filter = typeof FILTERS[number];

export default function ChatsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { contacts, messages, t, language, theme } = useApp();
  const [filter, setFilter] = useState<Filter>('All');
  const [search, setSearch] = useState('');

  const now = new Date();
  const dateStr = now.toLocaleDateString(language === 'ur' ? 'ur-PK' : 'en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  });

  const filtered = contacts.filter(c => {
    const matchSearch = c.username.toLowerCase().includes(search.toLowerCase());
    if (filter === 'Unread') return matchSearch && c.unread > 0;
    if (filter === 'Groups') return matchSearch && c.isGroup;
    if (filter === 'Starred') return matchSearch;
    return matchSearch;
  });

  const totalUnread = contacts.reduce((sum, c) => sum + (c.unread || 0), 0);

  const renderContact = ({ item }: { item: typeof contacts[0] }) => (
    <TouchableOpacity
      style={[styles.chatItem, theme.isDark && { backgroundColor: 'rgba(40,40,65,0.9)' }]}
      onPress={() => router.push(`/chat/${item.id}`)}
      activeOpacity={0.75}
    >
      <View style={styles.avatarWrap}>
        <LinearGradient
          colors={item.isAdmin ? ['#f39c12', '#e67e22'] : [theme.primary, theme.secondary]}
          style={styles.avatar}
        >
          <Text style={styles.avatarText}>
            {typeof item.avatar === 'string' && item.avatar.length <= 2 ? item.avatar : item.avatar.charAt(0)}
          </Text>
        </LinearGradient>
        {item.online && <View style={styles.onlineDot} />}
        {item.isAdmin && (
          <View style={styles.adminBadge}>
            <Text style={{ fontSize: 8 }}>👑</Text>
          </View>
        )}
      </View>
      <View style={styles.chatInfo}>
        <View style={styles.chatRow}>
          <Text style={[styles.chatName, theme.isDark && { color: '#fff' }]} numberOfLines={1}>
            {item.username}
            {item.isGroup && ' 👥'}
          </Text>
          <Text style={styles.chatTime}>{item.lastTime}</Text>
        </View>
        <View style={styles.chatRow}>
          <Text style={styles.chatPreview} numberOfLines={1}>{item.lastMessage}</Text>
          {item.unread > 0 && (
            <View style={[styles.unreadBadge, { backgroundColor: theme.primary }]}>
              <Text style={styles.unreadText}>{item.unread > 99 ? '99+' : item.unread}</Text>
            </View>
          )}
        </View>
        {item.isGroup && item.members && (
          <Text style={styles.membersText}>👥 {item.members.toLocaleString()} {t('members', 'اراکین')}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={theme.bgGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Top Bar */}
      <LinearGradient
        colors={theme.isDark ? [theme.surface, theme.surfaceLight] : theme.headerGradient}
        style={[styles.topBar, { paddingTop: insets.top + 8, borderBottomColor: theme.borderColor }]}
      >
        <View style={styles.topBarInner}>
          <View>
            <Text style={[styles.bismillah, theme.isDark && { color: '#ff8fab' }]}>بسم اللہ الرحمٰن الرحیم</Text>
            <Text style={styles.dateStr}>{dateStr}</Text>
          </View>
          <View style={styles.topBarRight}>
            <Text style={styles.weatherText}>🌤️ 28°C</Text>
            {totalUnread > 0 && (
              <View style={[styles.globalUnread, { backgroundColor: theme.primary }]}>
                <Text style={styles.globalUnreadText}>{totalUnread}</Text>
              </View>
            )}
            <TouchableOpacity style={styles.iconBtn}>
              <MaterialCommunityIcons name="qrcode-scan" size={20} color={theme.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <MaterialCommunityIcons name="magnify" size={20} color={theme.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search */}
        <View style={[styles.searchBar, theme.isDark && { backgroundColor: 'rgba(40,40,65,0.8)' }]}>
          <MaterialCommunityIcons name="magnify" size={18} color={Colors.textMuted} style={{ marginRight: 6 }} />
          <TextInput
            style={[styles.searchInput, theme.isDark && { color: '#fff' }]}
            placeholder={t('Search chats...', 'چیٹس تلاش کریں...')}
            value={search}
            onChangeText={setSearch}
            placeholderTextColor={Colors.textMuted}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <MaterialIcons name="close" size={16} color={Colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter chips */}
        <View style={styles.filterRow}>
          {FILTERS.map(f => (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, filter === f && { backgroundColor: theme.primary, borderColor: theme.primary }]}
              onPress={() => setFilter(f)}
            >
              <Text style={[styles.filterChipText, { color: theme.primary }, filter === f && { color: '#fff' }]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>

      {/* Chat List */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderContact}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>💬</Text>
            <Text style={[styles.emptyTitle, theme.isDark && { color: '#fff' }]}>{t('No chats yet', 'ابھی کوئی چیٹ نہیں')}</Text>
            <Text style={styles.emptyDesc}>{t('Share the app to start chatting!', 'ایپ شیئر کریں اور چیٹ شروع کریں!')}</Text>
          </View>
        }
      />

      {/* FAB */}
      <TouchableOpacity
        style={[styles.fab, { bottom: 90 + insets.bottom }]}
        activeOpacity={0.85}
        onPress={() => router.push('/chat/contact-001')}
      >
        <LinearGradient colors={[theme.primary, theme.secondary]} style={styles.fabGradient}>
          <MaterialCommunityIcons name="message-plus" size={24} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  topBar: {
    paddingBottom: 8,
    borderBottomWidth: 1,
    zIndex: 10,
    ...Shadow.pink,
  },
  topBarInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  bismillah: { fontSize: Typography.lg, color: '#d63384', fontWeight: Typography.bold },
  dateStr: { fontSize: Typography.xs, color: Colors.textMuted, marginTop: 2 },
  topBarRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  weatherText: { fontSize: Typography.sm, color: Colors.secondary },
  globalUnread: {
    borderRadius: Radius.full, minWidth: 20, height: 20,
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5,
  },
  globalUnreadText: { color: '#fff', fontSize: 10, fontWeight: Typography.bold },
  iconBtn: {
    width: 36, height: 36, borderRadius: Radius.full,
    backgroundColor: 'rgba(255,107,157,0.1)',
    alignItems: 'center', justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginHorizontal: 16,
    paddingHorizontal: 12, paddingVertical: 8,
    borderRadius: Radius.full, marginBottom: 10,
  },
  searchInput: { flex: 1, fontSize: Typography.base, color: Colors.textPrimary },
  filterRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 8 },
  filterChip: {
    paddingHorizontal: 14, paddingVertical: 6, borderRadius: Radius.full,
    backgroundColor: 'rgba(255,107,157,0.08)',
    borderWidth: 1, borderColor: 'rgba(255,107,157,0.2)',
  },
  filterChipText: { fontSize: Typography.sm, fontWeight: Typography.medium },
  listContent: { paddingHorizontal: 10, paddingTop: 8, paddingBottom: 20 },
  chatItem: {
    flexDirection: 'row', alignItems: 'center',
    padding: 12, marginBottom: 5,
    backgroundColor: Colors.surfaceLight,
    borderRadius: Radius.lg,
    ...Shadow.card,
  },
  avatarWrap: { position: 'relative', marginRight: 12 },
  avatar: { width: 54, height: 54, borderRadius: 27, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontSize: Typography.xl, fontWeight: Typography.bold },
  onlineDot: {
    position: 'absolute', bottom: 2, right: 2,
    width: 13, height: 13, borderRadius: 7,
    backgroundColor: Colors.onlineGreen,
    borderWidth: 2, borderColor: '#fff',
  },
  adminBadge: {
    position: 'absolute', top: 0, right: 0,
    width: 16, height: 16, borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: '#f39c12',
  },
  chatInfo: { flex: 1, minWidth: 0 },
  chatRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 },
  chatName: { fontSize: Typography.base, fontWeight: Typography.semibold, color: Colors.textPrimary, flex: 1 },
  chatTime: { fontSize: Typography.xs, color: Colors.textMuted, marginLeft: 8 },
  chatPreview: { fontSize: Typography.sm, color: Colors.textMuted, flex: 1 },
  unreadBadge: {
    borderRadius: Radius.full, minWidth: 20, height: 20,
    alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 5, marginLeft: 8,
  },
  unreadText: { color: '#fff', fontSize: 11, fontWeight: Typography.bold },
  membersText: { fontSize: 11, color: Colors.secondary, marginTop: 2 },
  emptyState: { alignItems: 'center', paddingTop: 80, paddingHorizontal: 32 },
  emptyIcon: { fontSize: 56, marginBottom: 16 },
  emptyTitle: { fontSize: Typography.xl, fontWeight: Typography.bold, color: Colors.textPrimary, marginBottom: 8 },
  emptyDesc: { fontSize: Typography.base, color: Colors.textMuted, textAlign: 'center' },
  fab: {
    position: 'absolute', right: 20,
    width: 56, height: 56, borderRadius: 28,
    ...Shadow.pink,
  },
  fabGradient: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
});
