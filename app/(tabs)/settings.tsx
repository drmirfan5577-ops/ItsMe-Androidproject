import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Share,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAlert } from '@/template';
import { useApp } from '@/hooks/useApp';
import { ADMIN_PASSWORD } from '@/constants/mockData';
import { THEMES, Colors, Typography, Radius, Shadow } from '@/constants/theme';

const SETTINGS_GROUPS = [
  {
    title: 'Account',
    items: [
      { icon: '👤', label: 'Profile', action: 'profile' },
      { icon: '🔒', label: 'Privacy', action: 'privacy' },
      { icon: '🔐', label: 'Security', action: 'security' },
      { icon: '🔑', label: 'Two-Step Verification', action: '2fa' },
    ],
  },
  {
    title: 'App',
    items: [
      { icon: '🔔', label: 'Notifications', action: 'notifications' },
      { icon: '💾', label: 'Storage & Data', action: 'storage' },
      { icon: '📱', label: 'Device Permissions', action: 'permissions' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: '❓', label: 'Help & Support', action: 'help' },
      { icon: 'ℹ️', label: 'About', action: 'about' },
      { icon: '📄', label: 'Legal', action: 'legal' },
      { icon: '⭐', label: 'Rate on Play Store', action: 'rate' },
    ],
  },
];

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { showAlert } = useAlert();
  const { currentUser, t, logout, theme, themeKey, setThemeKey } = useApp();
  const router = useRouter();
  const [adminMode, setAdminMode] = useState(false);
  const [showThemes, setShowThemes] = useState(false);

  const handleSoon = (label: string) => {
    showAlert(label, t('Coming soon in the next update!', 'اگلے اپڈیٹ میں آ رہا ہے!'));
  };

  const handleAction = (action: string, label: string) => {
    if (action === 'legal') {
      showAlert(
        '📄 ' + t('Legal Documents', 'قانونی دستاویزات'),
        [
          '🔐 PRIVACY POLICY',
          t('We protect your data with AES-256 encryption. No data sold to third parties. You may delete your account anytime.', 'ہم آپ کا ڈیٹا AES-256 سے محفوظ رکھتے ہیں۔ کوئی ڈیٹا فروخت نہیں۔'),
          '',
          '📋 TERMS OF SERVICE',
          t('13+ years. No illegal activities. Violations may result in account termination.', '13+ سال۔ غیر قانونی سرگرمی ممنوع۔'),
          '',
          '⚠️ DISCLAIMER',
          t('App provided "as is". SMART World Order not liable for damages.', 'ایپ "جیسی ہے" فراہم کی گئی ہے۔'),
          '',
          '© 2026 SMART World Order. All Rights Reserved.',
        ].join('\n')
      );
    } else if (action === 'about') {
      showAlert(
        '✨ It\'s Me — SMART World Order',
        [
          t('Version: 1.0.0 (Build 100)', 'ورژن: 1.0.0'),
          t('A Social & Digital Media App', 'ایک سوشل اور ڈیجیٹل میڈیا ایپ'),
          '',
          '👨‍💼 ' + t('Developer: Dr. M. Irfan Qadir Thaheem', 'ڈویلپر: ڈاکٹر ایم ارفان قادر تاہیم'),
          '📧 dr.mirfan5577@gmail.com',
          '📱 WhatsApp: 0300-4737757',
          '🌐 https://drmirfan5577-ops.github.io/SmartWorldOrder',
          '',
          '🌟 ' + t('Vision: نا ممکنات کو ممکن بنانے کا سفر', 'وژن: نا ممکنات کو ممکن بنانے کا سفر'),
        ].join('\n')
      );
    } else if (action === 'rate') {
      showAlert(
        '⭐ ' + t('Rate It\'s Me', 'ریٹنگ دیں'),
        t('Your rating helps us improve! Google Play listing coming soon.', 'آپ کی ریٹنگ ہمیں بہتر کرنے میں مدد کرتی ہے!')
      );
    } else if (action === 'help') {
      showAlert(
        '❓ ' + t('Help & Support', 'مدد اور سپورٹ'),
        [
          t('Contact us at:', 'ہم سے رابطہ کریں:'),
          '📧 dr.mirfan5577@gmail.com',
          '📱 WhatsApp: 0300-4737757',
          '',
          t('Response within 24 hours InshaAllah', '24 گھنٹوں میں جواب انشاءاللہ'),
        ].join('\n')
      );
    } else {
      handleSoon(label);
    }
  };

  const handleAdminLogin = () => {
    showAlert(
      '👑 ' + t('Admin Panel Access', 'ایڈمن پینل رسائی'),
      t('Default password: admin@smartworldorder2026\n(For demo purposes)', 'پاسورڈ: admin@smartworldorder2026'),
      [
        { text: t('Cancel', 'منسوخ'), style: 'cancel' },
        {
          text: t('Access Admin', 'رسائی'),
          onPress: () => {
            setAdminMode(true);
            showAlert('👑 ' + t('Admin Access Granted!', 'ایڈمن رسائی ملی!'), t('Welcome, Admin!', 'خوش آمدید ایڈمن!'));
          }
        },
      ]
    );
  };

  const handleShare = () => {
    Share.share({
      title: "It's Me App",
      message: `✨ Download It's Me — A Social & Digital Media App by SMART World Order!\n\n🌐 https://drmirfan5577-ops.github.io/SmartWorldOrder\n\n📱 WhatsApp: 0300-4737757\n\nنا ممکنات کو ممکن بنانے کا سفر`,
    }).catch(() => {});
  };

  const handleLogout = () => {
    showAlert(
      t('Logout', 'لاگ آؤٹ'),
      t('Are you sure you want to logout?', 'کیا آپ واقعی لاگ آؤٹ کرنا چاہتے ہیں؟'),
      [
        { text: t('Cancel', 'منسوخ'), style: 'cancel' },
        { text: t('Logout', 'لاگ آؤٹ'), style: 'destructive', onPress: () => { logout(); router.replace('/'); } },
      ]
    );
  };

  const themeList = Object.values(THEMES);

  return (
    <View style={[styles.root, theme.isDark && { backgroundColor: '#1a1a2e' }]}>
      <LinearGradient colors={theme.bgGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFillObject} />

      {/* Header */}
      <LinearGradient
        colors={theme.isDark ? [theme.surface, theme.surfaceLight] : theme.headerGradient}
        style={[styles.header, { paddingTop: insets.top + 12, borderBottomColor: theme.borderColor }]}
      >
        <Text style={[styles.headerTitle, theme.isDark && { color: '#fff' }]}>⚙️ {t('Settings', 'سیٹنگز')}</Text>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 12, paddingBottom: 30 }}>
        {/* Profile Card */}
        <TouchableOpacity style={[styles.profileCard, theme.isDark && { backgroundColor: 'rgba(40,40,65,0.9)' }]} onPress={() => handleSoon(t('Profile', 'پروفائل'))} activeOpacity={0.8}>
          <LinearGradient colors={[theme.primary, theme.secondary]} style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>{currentUser.username.charAt(0).toUpperCase()}</Text>
          </LinearGradient>
          <View style={{ flex: 1 }}>
            <Text style={[styles.profileName, theme.isDark && { color: '#fff' }]}>{currentUser.username}</Text>
            <Text style={styles.profileBio}>{currentUser.bio}</Text>
            <Text style={styles.profilePhone}>{currentUser.phone}</Text>
          </View>
          <MaterialIcons name="edit" size={20} color={theme.primary} />
        </TouchableOpacity>

        {/* Theme Picker */}
        <View style={[styles.settingsGroup, theme.isDark && { backgroundColor: 'rgba(40,40,65,0.9)' }]}>
          <TouchableOpacity style={styles.settingRow} onPress={() => setShowThemes(!showThemes)}>
            <Text style={styles.settingIcon}>🎨</Text>
            <Text style={[styles.settingLabel, theme.isDark && { color: '#fff' }]}>{t('App Theme', 'ایپ تھیم')}</Text>
            <View style={[styles.currentThemeBadge, { backgroundColor: `${theme.primary}20` }]}>
              <Text style={{ fontSize: 14 }}>{THEMES[themeKey].emoji}</Text>
              <Text style={[styles.currentThemeText, { color: theme.primary }]}>{THEMES[themeKey].name}</Text>
            </View>
            <MaterialIcons name={showThemes ? 'expand-less' : 'expand-more'} size={22} color={Colors.textMuted} />
          </TouchableOpacity>
          {showThemes && (
            <View style={styles.themeGrid}>
              {themeList.map(th => (
                <TouchableOpacity
                  key={th.key}
                  style={[styles.themeCard, themeKey === th.key && { borderColor: th.primary, borderWidth: 2 }]}
                  onPress={() => { setThemeKey(th.key); setShowThemes(false); }}
                  activeOpacity={0.8}
                >
                  <LinearGradient colors={th.bgGradient} style={styles.themePreview} />
                  <View style={[styles.themeColorDot, { backgroundColor: th.primary }]} />
                  <Text style={styles.themeEmoji}>{th.emoji}</Text>
                  <Text style={styles.themeName}>{th.name}</Text>
                  {themeKey === th.key && (
                    <View style={[styles.themeCheck, { backgroundColor: th.primary }]}>
                      <MaterialIcons name="check" size={12} color="#fff" />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Settings Groups */}
        {SETTINGS_GROUPS.map((group, gi) => (
          <View key={gi} style={[styles.settingsGroup, theme.isDark && { backgroundColor: 'rgba(40,40,65,0.9)' }]}>
            <Text style={styles.groupTitle}>{t(group.title, group.title)}</Text>
            {group.items.map((item, ii) => (
              <TouchableOpacity
                key={ii}
                style={[styles.settingRow, ii === group.items.length - 1 && { borderBottomWidth: 0 }]}
                onPress={() => handleAction(item.action, item.label)}
                activeOpacity={0.7}
              >
                <Text style={styles.settingIcon}>{item.icon}</Text>
                <Text style={[styles.settingLabel, theme.isDark && { color: '#e0e0e0' }]}>{t(item.label, item.label)}</Text>
                <MaterialIcons name="chevron-right" size={20} color={Colors.textMuted} />
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Share App */}
        <TouchableOpacity style={[styles.shareCard, { borderColor: `${theme.primary}40` }]} onPress={handleShare} activeOpacity={0.8}>
          <LinearGradient colors={[theme.primary, theme.secondary]} style={styles.shareIcon}>
            <MaterialCommunityIcons name="share-variant" size={22} color="#fff" />
          </LinearGradient>
          <View style={{ flex: 1 }}>
            <Text style={[styles.shareTitle, theme.isDark && { color: '#fff' }]}>{t('Share It\'s Me', 'ایپ شیئر کریں')}</Text>
            <Text style={styles.shareSub}>{t('Invite friends & family', 'دوستوں اور خاندان کو مدعو کریں')}</Text>
          </View>
          <MaterialIcons name="chevron-right" size={22} color={theme.primary} />
        </TouchableOpacity>

        {/* Admin Panel */}
        <TouchableOpacity style={[styles.settingsGroup, { borderColor: 'rgba(255,167,2,0.3)', borderWidth: 1.5 }, theme.isDark && { backgroundColor: 'rgba(40,40,30,0.9)' }]} onPress={handleAdminLogin} activeOpacity={0.8}>
          <View style={styles.settingRow}>
            <Text style={styles.settingIcon}>👑</Text>
            <Text style={[styles.settingLabel, { color: Colors.warning }]}>{t('Admin Panel', 'ایڈمن پینل')}</Text>
            {adminMode && (
              <View style={[styles.activeBadge, { backgroundColor: Colors.success }]}>
                <Text style={styles.activeBadgeText}>{t('Active', 'فعال')}</Text>
              </View>
            )}
            <MaterialIcons name="chevron-right" size={20} color={Colors.warning} />
          </View>
        </TouchableOpacity>

        {adminMode && (
          <View style={[styles.adminPanel, theme.isDark && { backgroundColor: 'rgba(30,30,20,0.95)' }]}>
            <LinearGradient colors={['#f39c12', '#e67e22']} style={styles.adminHeader}>
              <Text style={styles.adminTitle}>👑 {t('Admin Control Panel', 'ایڈمن کنٹرول پینل')}</Text>
              <Text style={styles.adminSubtitle}>SMART World Order</Text>
            </LinearGradient>
            <View style={styles.adminStats}>
              {[
                { label: t('Total Users', 'کل صارفین'), value: '8', icon: '👤' },
                { label: t('Online Now', 'ابھی آن لائن'), value: '4', icon: '🟢' },
                { label: t('Messages Today', 'آج کے پیغامات'), value: '47', icon: '💬' },
                { label: t('Groups', 'گروپس'), value: '2', icon: '👥' },
              ].map((stat, i) => (
                <View key={i} style={styles.adminStat}>
                  <Text style={styles.adminStatIcon}>{stat.icon}</Text>
                  <Text style={styles.adminStatValue}>{stat.value}</Text>
                  <Text style={styles.adminStatLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
            {[
              { icon: '📢', label: t('Send Global Notification', 'سب کو اطلاع') },
              { icon: '👥', label: t('Manage All Users', 'تمام صارفین') },
              { icon: '💬', label: t('Moderate Messages', 'پیغامات کی نگرانی') },
              { icon: '🚀', label: t('Push App Update', 'ایپ اپڈیٹ') },
              { icon: '📊', label: t('Analytics Dashboard', 'تجزیہ') },
              { icon: '🔧', label: t('Server Settings', 'سرور سیٹنگز') },
            ].map((action, i) => (
              <TouchableOpacity
                key={i}
                style={styles.adminAction}
                onPress={() => showAlert(action.icon + ' ' + action.label, t('This admin feature will be fully operational with OnSpace Cloud backend.', 'یہ فیچر بیک اینڈ کے ساتھ مکمل کام کرے گا۔'))}
              >
                <Text style={styles.adminActionIcon}>{action.icon}</Text>
                <Text style={styles.adminActionText}>{action.label}</Text>
                <MaterialIcons name="chevron-right" size={18} color={Colors.warning} />
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.adminCloseBtn} onPress={() => setAdminMode(false)}>
              <Text style={styles.adminCloseBtnText}>{t('Close Admin Panel', 'ایڈمن پینل بند کریں')}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Logout */}
        <TouchableOpacity style={[styles.settingsGroup, { borderColor: 'rgba(255,71,87,0.2)', borderWidth: 1.5 }, theme.isDark && { backgroundColor: 'rgba(40,20,20,0.9)' }]} onPress={handleLogout} activeOpacity={0.8}>
          <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.settingIcon}>🚪</Text>
            <Text style={[styles.settingLabel, { color: Colors.danger }]}>{t('Logout', 'لاگ آؤٹ')}</Text>
            <MaterialIcons name="chevron-right" size={20} color={Colors.danger} />
          </View>
        </TouchableOpacity>

        <Text style={styles.versionText}>
          It's Me v1.0.0 · SMART World Order · © 2026{'\n'}
          🌐 drmirfan5577-ops.github.io/SmartWorldOrder
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { paddingHorizontal: 16, paddingBottom: 14, borderBottomWidth: 1, ...Shadow.pink, zIndex: 10 },
  headerTitle: { fontSize: Typography.xl, fontWeight: Typography.bold, color: Colors.textPrimary },
  profileCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.surfaceLight,
    borderRadius: Radius.xl, padding: 16, marginBottom: 12, gap: 14, ...Shadow.card,
  },
  profileAvatar: { width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center' },
  profileAvatarText: { fontSize: Typography.xl, fontWeight: Typography.bold, color: '#fff' },
  profileName: { fontSize: Typography.lg, fontWeight: Typography.bold, color: Colors.textPrimary },
  profileBio: { fontSize: Typography.sm, color: Colors.textMuted, marginTop: 2 },
  profilePhone: { fontSize: Typography.xs, color: Colors.secondary, marginTop: 2 },
  settingsGroup: {
    backgroundColor: Colors.surfaceLight, borderRadius: Radius.lg, marginBottom: 10, ...Shadow.card, overflow: 'hidden',
  },
  groupTitle: {
    fontSize: Typography.xs, fontWeight: Typography.bold, color: Colors.textMuted,
    paddingHorizontal: 16, paddingTop: 12, paddingBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5,
  },
  settingRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.04)', gap: 12,
  },
  settingIcon: { fontSize: 20, width: 28, textAlign: 'center' },
  settingLabel: { flex: 1, fontSize: Typography.base, color: Colors.textPrimary, fontWeight: Typography.medium },
  currentThemeBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 4, borderRadius: Radius.full, gap: 4 },
  currentThemeText: { fontSize: Typography.sm, fontWeight: Typography.medium },
  themeGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 12, gap: 8 },
  themeCard: {
    width: '30%', borderRadius: Radius.md, overflow: 'hidden',
    backgroundColor: '#f9f9f9', borderWidth: 1.5, borderColor: 'transparent',
    alignItems: 'center', paddingBottom: 8, ...Shadow.soft, position: 'relative',
  },
  themePreview: { width: '100%', height: 40 },
  themeColorDot: { width: 12, height: 12, borderRadius: 6, marginTop: 6 },
  themeEmoji: { fontSize: 18, marginTop: 4 },
  themeName: { fontSize: 10, color: Colors.textPrimary, fontWeight: Typography.medium, marginTop: 2, textAlign: 'center' },
  themeCheck: { position: 'absolute', top: 4, right: 4, width: 18, height: 18, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  shareCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.surfaceLight, borderRadius: Radius.lg,
    padding: 14, marginBottom: 10, ...Shadow.card, gap: 14, borderWidth: 1.5,
  },
  shareIcon: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  shareTitle: { fontSize: Typography.base, fontWeight: Typography.semibold, color: Colors.textPrimary },
  shareSub: { fontSize: Typography.sm, color: Colors.textMuted, marginTop: 2 },
  activeBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: Radius.full },
  activeBadgeText: { color: '#fff', fontSize: 10, fontWeight: Typography.bold },
  adminPanel: {
    backgroundColor: Colors.surfaceLight, borderRadius: Radius.xl, marginBottom: 10,
    ...Shadow.card, borderWidth: 2, borderColor: 'rgba(243,156,18,0.3)', overflow: 'hidden',
  },
  adminHeader: { padding: 16, alignItems: 'center' },
  adminTitle: { fontSize: Typography.lg, fontWeight: Typography.bold, color: '#fff' },
  adminSubtitle: { fontSize: Typography.sm, color: 'rgba(255,255,255,0.85)', marginTop: 2 },
  adminStats: { flexDirection: 'row', padding: 12, gap: 8 },
  adminStat: { flex: 1, alignItems: 'center', backgroundColor: 'rgba(243,156,18,0.08)', borderRadius: Radius.md, padding: 10 },
  adminStatIcon: { fontSize: 20, marginBottom: 4 },
  adminStatValue: { fontSize: Typography.xl, fontWeight: Typography.bold, color: Colors.warning },
  adminStatLabel: { fontSize: 9, color: Colors.textMuted, textAlign: 'center' },
  adminAction: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12,
    borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.04)', gap: 12,
  },
  adminActionIcon: { fontSize: 20, width: 28, textAlign: 'center' },
  adminActionText: { flex: 1, fontSize: Typography.base, color: Colors.textPrimary, fontWeight: Typography.medium },
  adminCloseBtn: { backgroundColor: Colors.textMuted, margin: 12, borderRadius: Radius.md, padding: 12 },
  adminCloseBtnText: { color: '#fff', fontWeight: Typography.bold, textAlign: 'center' },
  logoutCard: { borderWidth: 2, borderColor: 'rgba(255,71,87,0.2)' },
  versionText: { textAlign: 'center', fontSize: Typography.xs, color: Colors.textLight, marginTop: 8, lineHeight: 18 },
});
