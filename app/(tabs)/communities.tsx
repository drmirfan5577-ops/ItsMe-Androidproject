import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAlert } from '@/template';
import { useApp } from '@/hooks/useApp';
import { MOCK_COMMUNITIES } from '@/constants/mockData';
import { Colors, Typography, Radius, Shadow } from '@/constants/theme';

export default function CommunitiesScreen() {
  const insets = useSafeAreaInsets();
  const { showAlert } = useAlert();
  const { t, theme } = useApp();
  const [joinedIds, setJoinedIds] = useState<string[]>([]);

  const handleCreate = () => {
    showAlert(
      t('Create Community', 'کمیونٹی بنائیں'),
      t('Community creation requires backend. Enable OnSpace Cloud to create real communities with member management.', 'کمیونٹی بنانے کے لیے بیک اینڈ درکار ہے۔'),
      [
        { text: t('Enable Backend', 'بیک اینڈ فعال کریں'), onPress: () => showAlert('OnSpace Cloud', t('Go to Settings → Admin Panel to enable backend.', 'سیٹنگز میں جائیں')) },
        { text: t('OK', 'ٹھیک ہے'), style: 'cancel' },
      ]
    );
  };

  const handleJoin = (id: string, name: string) => {
    if (joinedIds.includes(id)) {
      setJoinedIds(prev => prev.filter(i => i !== id));
      showAlert('✓', t(`Left "${name}"`, `"${name}" چھوڑ دیا`));
    } else {
      setJoinedIds(prev => [...prev, id]);
      showAlert('✓', t(`Joined "${name}"! Welcome!`, `"${name}" میں خوش آمدید!`));
    }
  };

  return (
    <View style={[styles.root, theme.isDark && { backgroundColor: '#1a1a2e' }]}>
      <LinearGradient colors={theme.bgGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFillObject} />

      {/* Header */}
      <LinearGradient
        colors={theme.isDark ? [theme.surface, theme.surfaceLight] : theme.headerGradient}
        style={[styles.header, { paddingTop: insets.top + 12, borderBottomColor: theme.borderColor }]}
      >
        <View style={styles.headerRow}>
          <View>
            <Text style={[styles.headerTitle, theme.isDark && { color: '#fff' }]}>👥 {t('Communities', 'کمیونٹیز')}</Text>
            <Text style={styles.headerSub}>{t('Groups & Communities', 'گروپس اور کمیونٹیز')}</Text>
          </View>
          <TouchableOpacity style={[styles.createBtn, { backgroundColor: theme.primary }]} onPress={handleCreate} activeOpacity={0.8}>
            <MaterialCommunityIcons name="plus" size={18} color="#fff" />
            <Text style={styles.createBtnText}>{t('New', 'نیا')}</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 12, paddingTop: 14 }}>

        {/* Featured Banner */}
        <LinearGradient
          colors={[theme.primary, theme.secondary]}
          style={styles.featuredBanner}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        >
          <View style={styles.featuredLeft}>
            <Text style={styles.featuredIcon}>🌐</Text>
            <View>
              <Text style={styles.featuredTitle}>SMART World Order</Text>
              <Text style={styles.featuredDesc}>{t('Official community • 1,247 members', 'سرکاری کمیونٹی • 1,247 اراکین')}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.joinBtn, joinedIds.includes('c1') && styles.joinBtnJoined]}
            onPress={() => handleJoin('c1', 'SMART World Order')}
          >
            <Text style={styles.joinBtnText}>
              {joinedIds.includes('c1') ? t('Joined ✓', 'شامل ✓') : t('Join', 'جوائن')}
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {[
            { label: t('Communities', 'کمیونٹیز'), value: MOCK_COMMUNITIES.length.toString(), icon: '🌐' },
            { label: t('Joined', 'شامل'), value: joinedIds.length.toString(), icon: '✅' },
            { label: t('Members', 'اراکین'), value: '33K+', icon: '👥' },
          ].map((stat, i) => (
            <View key={i} style={[styles.statCard, theme.isDark && { backgroundColor: 'rgba(40,40,65,0.9)' }]}>
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <Text style={[styles.statValue, { color: theme.primary }]}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Discover Communities */}
        <Text style={[styles.sectionTitle, theme.isDark && { color: '#aaa' }]}>
          {t('Discover Communities', 'کمیونٹیز دریافت کریں')}
        </Text>

        {MOCK_COMMUNITIES.map(community => {
          const isJoined = joinedIds.includes(community.id);
          return (
            <TouchableOpacity
              key={community.id}
              style={[styles.communityCard, theme.isDark && { backgroundColor: 'rgba(40,40,65,0.9)' }]}
              onPress={() => showAlert(community.name, community.description)}
              activeOpacity={0.8}
            >
              <View style={[styles.communityIcon, { backgroundColor: `${theme.primary}15` }]}>
                <Text style={{ fontSize: 28 }}>{community.icon}</Text>
              </View>
              <View style={styles.communityInfo}>
                <View style={styles.communityRow}>
                  <Text style={[styles.communityName, theme.isDark && { color: '#fff' }]} numberOfLines={1}>{community.name}</Text>
                  <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(community.category) }]}>
                    <Text style={styles.categoryText}>{community.category}</Text>
                  </View>
                </View>
                <Text style={styles.communityDesc} numberOfLines={2}>{community.description}</Text>
                <View style={styles.communityMeta}>
                  <MaterialCommunityIcons name="account-multiple" size={13} color={Colors.textMuted} />
                  <Text style={styles.communityMembers}>
                    {community.members.toLocaleString()} {t('members', 'اراکین')}
                  </Text>
                  <View style={[styles.publicBadge, { backgroundColor: community.isPublic ? 'rgba(29,209,161,0.12)' : 'rgba(255,167,2,0.12)' }]}>
                    <Text style={[styles.publicText, { color: community.isPublic ? Colors.success : Colors.warning }]}>
                      {community.isPublic ? t('Public', 'عوامی') : t('Private', 'نجی')}
                    </Text>
                  </View>
                </View>
                <Text style={styles.adminLabel}>
                  👑 {t('Admin:', 'ایڈمن:')} {community.admin}
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.joinCardBtn, { backgroundColor: isJoined ? Colors.success : theme.primary }]}
                onPress={() => handleJoin(community.id, community.name)}
              >
                <Text style={styles.joinCardBtnText}>{isJoined ? '✓' : '+'}</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          );
        })}

        {/* My Groups */}
        <Text style={[styles.sectionTitle, { marginTop: 20 }, theme.isDark && { color: '#aaa' }]}>
          {t('My Groups', 'میرے گروپس')}
        </Text>
        {joinedIds.length === 0 ? (
          <View style={[styles.emptyGroups, theme.isDark && { backgroundColor: 'rgba(40,40,65,0.9)' }]}>
            <Text style={styles.emptyIcon}>🤝</Text>
            <Text style={[styles.emptyText, theme.isDark && { color: '#ccc' }]}>
              {t("You haven't joined any groups yet", 'آپ ابھی تک کسی گروپ میں نہیں ہیں')}
            </Text>
            <TouchableOpacity style={[styles.createGroupBtn, { backgroundColor: theme.primary }]} onPress={handleCreate}>
              <Text style={styles.createGroupBtnText}>➕ {t('Create a Group', 'گروپ بنائیں')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          MOCK_COMMUNITIES.filter(c => joinedIds.includes(c.id)).map(community => (
            <View key={community.id} style={[styles.myGroupRow, theme.isDark && { backgroundColor: 'rgba(40,40,65,0.9)' }]}>
              <Text style={{ fontSize: 24 }}>{community.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={[styles.communityName, theme.isDark && { color: '#fff' }]}>{community.name}</Text>
                <Text style={styles.communityMembers}>{community.members.toLocaleString()} {t('members', 'اراکین')}</Text>
              </View>
              <TouchableOpacity
                style={[styles.leaveBtn]}
                onPress={() => handleJoin(community.id, community.name)}
              >
                <Text style={styles.leaveBtnText}>{t('Leave', 'چھوڑیں')}</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

function getCategoryColor(cat: string): string {
  const map: Record<string, string> = {
    'Organization': 'rgba(255,107,157,0.15)',
    'Religion': 'rgba(29,209,161,0.15)',
    'Technology': 'rgba(69,170,242,0.15)',
    'Culture': 'rgba(254,202,87,0.2)',
  };
  return map[cat] || 'rgba(255,107,157,0.1)';
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { paddingHorizontal: 16, paddingBottom: 14, borderBottomWidth: 1, ...Shadow.pink, zIndex: 10 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: Typography.xl, fontWeight: Typography.bold, color: Colors.textPrimary },
  headerSub: { fontSize: Typography.sm, color: Colors.textMuted, marginTop: 2 },
  createBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 8, borderRadius: Radius.full, gap: 4, ...Shadow.pink },
  createBtnText: { color: '#fff', fontWeight: Typography.bold, fontSize: Typography.sm },
  featuredBanner: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: Radius.xl, marginBottom: 14, ...Shadow.pink, justifyContent: 'space-between' },
  featuredLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  featuredIcon: { fontSize: 36 },
  featuredTitle: { color: '#fff', fontSize: Typography.base, fontWeight: Typography.bold },
  featuredDesc: { color: 'rgba(255,255,255,0.85)', fontSize: Typography.xs, marginTop: 2 },
  joinBtn: { backgroundColor: 'rgba(255,255,255,0.25)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: Radius.full },
  joinBtnJoined: { backgroundColor: 'rgba(29,209,161,0.4)' },
  joinBtnText: { color: '#fff', fontWeight: Typography.bold, fontSize: Typography.sm },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  statCard: { flex: 1, backgroundColor: Colors.surfaceLight, borderRadius: Radius.lg, padding: 12, alignItems: 'center', ...Shadow.card },
  statIcon: { fontSize: 20, marginBottom: 4 },
  statValue: { fontSize: Typography.xl, fontWeight: Typography.bold },
  statLabel: { fontSize: Typography.xs, color: Colors.textMuted, marginTop: 2 },
  sectionTitle: { fontSize: Typography.base, fontWeight: Typography.bold, color: Colors.textSecondary, marginBottom: 10, paddingLeft: 4 },
  communityCard: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: Colors.surfaceLight, borderRadius: Radius.lg, padding: 14, marginBottom: 10, ...Shadow.card, gap: 12 },
  communityIcon: { width: 56, height: 56, borderRadius: Radius.md, alignItems: 'center', justifyContent: 'center' },
  communityInfo: { flex: 1 },
  communityRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' },
  communityName: { fontSize: Typography.base, fontWeight: Typography.semibold, color: Colors.textPrimary, flex: 1 },
  categoryBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: Radius.full },
  categoryText: { fontSize: 10, color: Colors.textSecondary, fontWeight: Typography.medium },
  communityDesc: { fontSize: Typography.sm, color: Colors.textMuted, lineHeight: 18, marginBottom: 6 },
  communityMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  communityMembers: { fontSize: Typography.xs, color: Colors.textMuted },
  publicBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: Radius.full },
  publicText: { fontSize: 10, fontWeight: Typography.medium },
  adminLabel: { fontSize: Typography.xs, color: Colors.textMuted },
  joinCardBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  joinCardBtnText: { color: '#fff', fontWeight: Typography.bold, fontSize: Typography.lg },
  emptyGroups: { alignItems: 'center', padding: 30, backgroundColor: Colors.surfaceLight, borderRadius: Radius.xl, ...Shadow.card },
  emptyIcon: { fontSize: 44, marginBottom: 12 },
  emptyText: { fontSize: Typography.base, color: Colors.textMuted, textAlign: 'center', marginBottom: 16 },
  createGroupBtn: { paddingHorizontal: 24, paddingVertical: 12, borderRadius: Radius.full, ...Shadow.pink },
  createGroupBtnText: { color: '#fff', fontWeight: Typography.bold, fontSize: Typography.base },
  myGroupRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surfaceLight, borderRadius: Radius.lg, padding: 14, marginBottom: 8, ...Shadow.card, gap: 12 },
  leaveBtn: { backgroundColor: 'rgba(255,71,87,0.12)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: Radius.full, borderWidth: 1, borderColor: 'rgba(255,71,87,0.3)' },
  leaveBtnText: { color: Colors.danger, fontSize: Typography.sm, fontWeight: Typography.medium },
});
