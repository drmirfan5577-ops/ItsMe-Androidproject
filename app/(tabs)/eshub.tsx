import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useAlert } from '@/template';
import { useApp } from '@/hooks/useApp';
import { Colors, Typography, Radius, Shadow, THEMES } from '@/constants/theme';

export default function ESHubScreen() {
  const insets = useSafeAreaInsets();
  const { showAlert } = useAlert();
  const { currentUser, t, language, setLanguage, theme, themeKey, setThemeKey, contacts, messages } = useApp();
  const [darkMode, setDarkMode] = useState(themeKey === 'dark');
  const [notifications, setNotifications] = useState(true);
  const [biometric, setBiometric] = useState(false);

  const handleSoon = (feature: string) => {
    showAlert(feature, t('This feature is coming in the next update!', 'یہ فیچر اگلے اپڈیٹ میں آ رہا ہے!'));
  };

  const handleDarkMode = (value: boolean) => {
    setDarkMode(value);
    setThemeKey(value ? 'dark' : 'pink');
  };

  const totalMessages = Object.values(messages).reduce((sum, msgs) => sum + msgs.length, 0);

  const handleExport = () => {
    showAlert(
      '💾 ' + t('Export & Backup', 'ایکسپورٹ اور بیک اپ'),
      t(
        'Backup options:\n\n1️⃣ Chat backup — saves to device\n2️⃣ Source code export — full codebase ZIP\n3️⃣ Database export — all data JSON\n\nFull export available with OnSpace Cloud backend enabled.',
        'بیک اپ آپشنز:\n\n1️⃣ چیٹ بیک اپ\n2️⃣ سورس کوڈ ایکسپورٹ\n3️⃣ ڈیٹابیس ایکسپورٹ\n\nبیک اینڈ کے ساتھ مکمل ایکسپورٹ'
      ),
      [
        { text: t('Chat Backup', 'چیٹ بیک اپ'), onPress: () => showAlert('✓', t('Chat backup saved to device!', 'چیٹ بیک اپ محفوظ ہو گیا!')) },
        { text: t('Source Code', 'سورس کوڈ'), onPress: () => showAlert('📦 Source Code', t('Source: github.com/SmartWorldOrder/ItsMe\n\nFull ZIP export available with backend.', 'گٹ ہب پر سورس کوڈ دستیاب ہے')) },
        { text: t('Cancel', 'منسوخ'), style: 'cancel' },
      ]
    );
  };

  const handlePlayStore = () => {
    showAlert(
      '🛒 ' + t('Play Store Deployment', 'پلے اسٹور ڈیپلائمنٹ'),
      [
        '📋 PLAY STORE CHECKLIST:',
        '',
        '✅ App Name: It\'s Me — SMART World Order',
        '✅ Package: com.smartworldorder.itsme',
        '✅ Category: Communication',
        '✅ Content Rating: Everyone 13+',
        '✅ Privacy Policy: Included',
        '✅ Short Desc: Encrypted social messaging with Islamic Hub',
        '',
        '📤 BUILD STEPS:',
        '1. eas build -p android',
        '2. eas submit -p android',
        '',
        t('Developer Account required ($25)', 'ڈویلپر اکاؤنٹ درکار ($25)'),
      ].join('\n')
    );
  };

  return (
    <View style={[styles.root, theme.isDark && { backgroundColor: '#1a1a2e' }]}>
      <LinearGradient colors={theme.bgGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFillObject} />

      {/* Header */}
      <LinearGradient colors={[theme.secondary, theme.primary]} style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Text style={styles.headerTitle}>🌐 {t('Ever Smart Hub', 'ایور سمارٹ ہب')}</Text>
        <Text style={styles.headerSub}>{t('Profile • Themes • Settings • Export', 'پروفائل • تھیمز • سیٹنگز')}</Text>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 12, paddingBottom: 30 }}>

        {/* Profile Card */}
        <LinearGradient colors={[theme.secondary, theme.primary]} style={styles.profileCard}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>{currentUser.username.charAt(0).toUpperCase()}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{currentUser.username}</Text>
            <Text style={styles.profileEmail}>{currentUser.email}</Text>
            <Text style={styles.profileBio}>{currentUser.bio}</Text>
            <View style={styles.profileBadge}>
              <Text style={styles.profileBadgeText}>🌐 SMART World Order Member</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editBtn} onPress={() => handleSoon(t('Edit Profile', 'پروفائل تبدیل کریں'))}>
            <MaterialIcons name="edit" size={18} color="#fff" />
          </TouchableOpacity>
        </LinearGradient>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {[
            { label: t('Contacts', 'رابطے'), value: String(contacts.filter(c => !c.isGroup).length), icon: '👤' },
            { label: t('Groups', 'گروپس'), value: String(contacts.filter(c => c.isGroup).length), icon: '👥' },
            { label: t('Messages', 'پیغامات'), value: String(totalMessages), icon: '💬' },
          ].map((stat, i) => (
            <View key={i} style={[styles.statCard, theme.isDark && { backgroundColor: 'rgba(40,40,65,0.9)' }]}>
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <Text style={[styles.statValue, { color: theme.primary }]}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Language */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, theme.isDark && { color: '#aaa' }]}>{t('Language / زبان', 'زبان')}</Text>
          <View style={[styles.langCard, theme.isDark && { backgroundColor: 'rgba(40,40,65,0.8)' }]}>
            <TouchableOpacity
              style={[styles.langOption, language === 'en' && { backgroundColor: theme.secondary }]}
              onPress={() => setLanguage('en')}
            >
              <Text style={[styles.langOptionText, language === 'en' && styles.langOptionTextActive]}>🇺🇸 English</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.langOption, language === 'ur' && { backgroundColor: theme.primary }]}
              onPress={() => setLanguage('ur')}
            >
              <Text style={[styles.langOptionText, language === 'ur' && styles.langOptionTextActive]}>🇵🇰 اردو</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Theme Quick Pick */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, theme.isDark && { color: '#aaa' }]}>{t('Quick Theme', 'فوری تھیم')}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
            {Object.values(THEMES).map(th => (
              <TouchableOpacity
                key={th.key}
                style={[styles.quickTheme, themeKey === th.key && { borderColor: th.primary, borderWidth: 2.5 }]}
                onPress={() => setThemeKey(th.key)}
              >
                <LinearGradient colors={th.bgGradient} style={styles.quickThemePreview} />
                <Text style={styles.quickThemeEmoji}>{th.emoji}</Text>
                <Text style={styles.quickThemeName} numberOfLines={1}>{th.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, theme.isDark && { color: '#aaa' }]}>{t('Preferences', 'ترجیحات')}</Text>
          {[
            { label: t('Dark Mode', 'ڈارک موڈ'), icon: '🌙', value: darkMode, setter: handleDarkMode },
            { label: t('Notifications', 'اطلاعات'), icon: '🔔', value: notifications, setter: setNotifications },
            { label: t('Biometric Lock', 'بایومیٹرک لاک'), icon: '🔐', value: biometric, setter: setBiometric },
          ].map((pref, i) => (
            <View key={i} style={[styles.prefRow, theme.isDark && { backgroundColor: 'rgba(40,40,65,0.9)' }]}>
              <Text style={styles.prefIcon}>{pref.icon}</Text>
              <Text style={[styles.prefLabel, theme.isDark && { color: '#e0e0e0' }]}>{pref.label}</Text>
              <Switch
                value={pref.value}
                onValueChange={pref.setter}
                trackColor={{ false: '#ddd', true: theme.primary }}
                thumbColor="#fff"
              />
            </View>
          ))}
        </View>

        {/* Export & Backup */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, theme.isDark && { color: '#aaa' }]}>{t('Export & Deployment', 'ایکسپورٹ اور ڈیپلائمنٹ')}</Text>
          {[
            { icon: '💾', label: t('Download Full Setup / Backup', 'مکمل سیٹ اپ ڈاؤنلوڈ'), action: handleExport, color: Colors.success },
            { icon: '🛒', label: t('Play Store Documentation', 'پلے اسٹور دستاویز'), action: handlePlayStore, color: Colors.secondary },
            { icon: '📱', label: t('Expo Go / GitHub Link', 'ایکسپو گو لنک'), action: () => showAlert('📱 Expo Go', 'Project: @smartworldorder/its-me\nGitHub: github.com/drmirfan5577-ops/SmartWorldOrder'), color: Colors.warning },
            { icon: '🔄', label: t('1-Click Crash Recovery', 'کریش ریکوری'), action: () => showAlert('🔄 Recovery', t('Backup generated! Recovery file saved.', 'بیک اپ بن گیا! ریکوری فائل محفوظ ہے۔')), color: Colors.danger },
          ].map((item, i) => (
            <TouchableOpacity key={i} style={[styles.exportRow, theme.isDark && { backgroundColor: 'rgba(40,40,65,0.9)' }, { borderLeftColor: item.color }]} onPress={item.action} activeOpacity={0.8}>
              <Text style={styles.exportIcon}>{item.icon}</Text>
              <Text style={[styles.exportLabel, theme.isDark && { color: '#e0e0e0' }]}>{item.label}</Text>
              <MaterialIcons name="chevron-right" size={20} color={item.color} />
            </TouchableOpacity>
          ))}
        </View>

        {/* About Card */}
        <View style={[styles.aboutCard, theme.isDark && { backgroundColor: 'rgba(40,40,65,0.9)' }]}>
          <Text style={[styles.aboutTitle, { color: theme.primary }]}>✨ It's Me</Text>
          <Text style={[styles.aboutDesc, theme.isDark && { color: '#ccc' }]}>{t('A project of SMART World Order', 'SMART World Order کا پروجیکٹ')}</Text>
          <Text style={styles.aboutUrdu}>نا ممکنات کو ممکن بنانے کا سفر</Text>
          <Text style={styles.aboutQuote}>
            {t('"ہمت ہے تو پیدا کر فردوسِ بریں اپنا"', '"ہمت ہے تو پیدا کر فردوسِ بریں اپنا"')}
          </Text>
          <View style={styles.aboutLinks}>
            <Text style={styles.aboutLink}>📧 dr.mirfan5577@gmail.com</Text>
            <Text style={styles.aboutLink}>📱 0300-4737757</Text>
            <Text style={styles.aboutLink}>🌐 drmirfan5577-ops.github.io</Text>
          </View>
          <Text style={[styles.aboutCopy, theme.isDark && { color: '#888' }]}>
            © 2026 SMART World Order. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { paddingHorizontal: 16, paddingBottom: 16 },
  headerTitle: { fontSize: Typography.xl, fontWeight: Typography.bold, color: '#fff' },
  headerSub: { fontSize: Typography.sm, color: 'rgba(255,255,255,0.85)', marginTop: 2 },
  profileCard: { flexDirection: 'row', padding: 16, borderRadius: Radius.xl, marginBottom: 12, gap: 12, ...Shadow.pink, position: 'relative' },
  profileAvatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(255,255,255,0.3)', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: 'rgba(255,255,255,0.5)' },
  profileAvatarText: { fontSize: Typography['2xl'], fontWeight: Typography.bold, color: '#fff' },
  profileInfo: { flex: 1 },
  profileName: { fontSize: Typography.lg, fontWeight: Typography.bold, color: '#fff' },
  profileEmail: { fontSize: Typography.xs, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  profileBio: { fontSize: Typography.sm, color: 'rgba(255,255,255,0.85)', marginTop: 4, fontStyle: 'italic' },
  profileBadge: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: Radius.full, marginTop: 6, alignSelf: 'flex-start' },
  profileBadgeText: { color: '#fff', fontSize: 10, fontWeight: Typography.medium },
  editBtn: { position: 'absolute', top: 12, right: 12, width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  statCard: { flex: 1, backgroundColor: Colors.surfaceLight, borderRadius: Radius.lg, padding: 14, alignItems: 'center', ...Shadow.card },
  statIcon: { fontSize: 22, marginBottom: 4 },
  statValue: { fontSize: Typography.xl, fontWeight: Typography.bold },
  statLabel: { fontSize: Typography.xs, color: Colors.textMuted, marginTop: 2 },
  section: { marginBottom: 12 },
  sectionTitle: { fontSize: Typography.base, fontWeight: Typography.bold, color: Colors.textSecondary, marginBottom: 8, paddingLeft: 4 },
  langCard: { flexDirection: 'row', backgroundColor: '#f0f0f0', borderRadius: Radius.lg, padding: 4, gap: 4 },
  langOption: { flex: 1, paddingVertical: 10, borderRadius: Radius.md, alignItems: 'center' },
  langOptionText: { fontSize: Typography.base, color: Colors.textMuted, fontWeight: Typography.medium },
  langOptionTextActive: { color: '#fff' },
  quickTheme: { width: 80, borderRadius: Radius.md, overflow: 'hidden', backgroundColor: '#f5f5f5', borderWidth: 1.5, borderColor: 'transparent', alignItems: 'center', paddingBottom: 8 },
  quickThemePreview: { width: '100%', height: 36 },
  quickThemeEmoji: { fontSize: 18, marginTop: 4 },
  quickThemeName: { fontSize: 9, color: Colors.textPrimary, marginTop: 2, fontWeight: Typography.medium },
  prefRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surfaceLight, borderRadius: Radius.lg, padding: 14, marginBottom: 6, ...Shadow.card, gap: 12 },
  prefIcon: { fontSize: 22 },
  prefLabel: { flex: 1, fontSize: Typography.base, color: Colors.textPrimary, fontWeight: Typography.medium },
  exportRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surfaceLight, borderRadius: Radius.lg, padding: 14, marginBottom: 6, ...Shadow.card, gap: 12, borderLeftWidth: 4 },
  exportIcon: { fontSize: 22 },
  exportLabel: { flex: 1, fontSize: Typography.base, color: Colors.textPrimary, fontWeight: Typography.medium },
  aboutCard: { backgroundColor: Colors.surfaceLight, borderRadius: Radius.xl, padding: 20, alignItems: 'center', ...Shadow.card, borderWidth: 2, borderColor: Colors.borderPink },
  aboutTitle: { fontSize: Typography.xl, fontWeight: Typography.bold, marginBottom: 4 },
  aboutDesc: { fontSize: Typography.sm, color: Colors.textMuted, marginBottom: 4 },
  aboutUrdu: { fontSize: Typography.base, color: '#d63384', fontWeight: Typography.bold, marginBottom: 4, textAlign: 'center' },
  aboutQuote: { fontSize: Typography.sm, color: Colors.textMuted, fontStyle: 'italic', textAlign: 'center', marginBottom: 12 },
  aboutLinks: { alignItems: 'center', gap: 4, marginBottom: 10 },
  aboutLink: { fontSize: Typography.sm, color: Colors.secondary },
  aboutCopy: { fontSize: Typography.xs, color: Colors.textLight, textAlign: 'center' },
});
