import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '@/hooks/useApp';
import { Colors, Typography, Radius, Shadow } from '@/constants/theme';

const ISLAMIC_SECTIONS = [
  { id: 'quran', icon: '📖', title: 'The Holy Quran', titleUr: 'القرآن الکریم', desc: 'Read & Listen with translations', descUr: 'ترجمہ کے ساتھ پڑھیں', arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', color: [Colors.success, Colors.successDark] as const },
  { id: 'ahadees', icon: '📚', title: 'Ahadees', titleUr: 'احادیث', desc: 'Prophetic traditions', descUr: 'نبوی روایات', arabic: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ', color: [Colors.secondary, '#2980b9'] as const },
  { id: 'azkaar_morning', icon: '🌅', title: 'Morning Azkaar', titleUr: 'صبح کے اذکار', desc: 'Start your day with Allah', descUr: 'اللہ کے ذکر سے صبح شروع کریں', arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ', color: ['#f9a825', '#f57f17'] as const },
  { id: 'azkaar_evening', icon: '🌙', title: 'Evening Azkaar', titleUr: 'شام کے اذکار', desc: 'Evening supplications from Sunnah', descUr: 'سنت سے شام کے اذکار', arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ', color: ['#6c5ce7', '#a29bfe'] as const },
  { id: 'dajjal', icon: '🛡️', title: 'Protection from Dajjal', titleUr: 'دجال سے حفاظت', desc: 'Essential protections from Fitna Dajjal', descUr: 'فتنہ دجال سے محفوظ رہیں', arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ', color: ['#e17055', '#d63031'] as const },
  { id: 'calendar', icon: '📅', title: 'Islamic Calendar', titleUr: 'اسلامی کیلنڈر', desc: 'Hijri & Gregorian dates', descUr: 'ہجری اور عیسوی تاریخیں', arabic: '', color: [Colors.primary, Colors.primaryDark] as const },
];

export default function IslamicHubScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t, language, theme } = useApp();
  const [tasbeehCount, setTasbeehCount] = useState(0);
  const [tasbeehTarget] = useState(33);

  const today = new Date();
  let hijriDate = '1447 Hijri';
  try {
    hijriDate = today.toLocaleDateString('en-SA-u-ca-islamic', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {}

  const progress = Math.min((tasbeehCount / tasbeehTarget) * 100, 100);

  return (
    <View style={[styles.root, theme.isDark && { backgroundColor: '#1a1a2e' }]}>
      <LinearGradient colors={['#e8f8f0', '#c3f0da', '#d4f1f9']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFillObject} />

      {/* Header */}
      <LinearGradient colors={[Colors.success, Colors.successDark]} style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Text style={styles.headerBismillah}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</Text>
        <Text style={styles.headerTitle}>☪️ {t('Islamic Hub', 'اسلامی مرکز')}</Text>
        <Text style={styles.headerSub}>{t('Quran • Hadith • Azkaar • Calendar', 'قرآن • حدیث • اذکار • کیلنڈر')}</Text>
        <View style={styles.dateRow}>
          <View style={styles.datePill}>
            <Text style={styles.datePillText}>📅 {today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</Text>
          </View>
          <View style={styles.datePill}>
            <Text style={styles.datePillText}>☪️ {hijriDate}</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 12, paddingBottom: 24 }}>

        {/* Daily Hadith */}
        <LinearGradient colors={['#1e8449', '#27ae60']} style={styles.hadithBanner}>
          <Text style={styles.hadithIcon}>💎</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.hadithLabel}>{t('Hadith of the Day', 'آج کی حدیث')}</Text>
            <Text style={styles.hadithArabic}>الدِّينُ النَّصِيحَةُ</Text>
            <Text style={styles.hadithTranslation}>
              {t('"Religion is sincere advice." — Sahih Muslim', '"دین خیرخواہی کا نام ہے۔" — صحیح مسلم')}
            </Text>
          </View>
        </LinearGradient>

        {/* Section Cards */}
        {ISLAMIC_SECTIONS.map(section => (
          <TouchableOpacity
            key={section.id}
            style={styles.sectionCard}
            onPress={() => router.push(`/islamic/${section.id}`)}
            activeOpacity={0.8}
          >
            <LinearGradient colors={section.color} style={styles.sectionIconWrap}>
              <Text style={{ fontSize: 26 }}>{section.icon}</Text>
            </LinearGradient>
            <View style={styles.sectionInfo}>
              <Text style={styles.sectionTitle}>{language === 'ur' ? section.titleUr : section.title}</Text>
              <Text style={styles.sectionDesc}>{language === 'ur' ? section.descUr : section.desc}</Text>
              {section.arabic ? <Text style={styles.sectionArabic} numberOfLines={1}>{section.arabic}</Text> : null}
            </View>
            <MaterialCommunityIcons name="chevron-right" size={20} color={Colors.textMuted} />
          </TouchableOpacity>
        ))}

        {/* Tasbeeh Counter */}
        <View style={styles.tasbeehCard}>
          <Text style={styles.tasbeehTitle}>📿 {t('Tasbeeh Counter', 'تسبیح کاؤنٹر')}</Text>
          <Text style={styles.tasbeehArabic}>سُبْحَانَ اللَّهِ</Text>
          <View style={styles.tasbeehProgressBar}>
            <View style={[styles.tasbeehProgress, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.tasbeehCount}>{tasbeehCount} / {tasbeehTarget}</Text>
          <View style={styles.tasbeehButtons}>
            <TouchableOpacity
              style={styles.tasbeehBtn}
              onPress={() => setTasbeehCount(prev => prev + 1)}
              activeOpacity={0.8}
            >
              <LinearGradient colors={[Colors.success, Colors.successDark]} style={styles.tasbeehBtnGrad}>
                <Text style={styles.tasbeehBtnText}>+1</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tasbeehResetBtn}
              onPress={() => setTasbeehCount(0)}
              activeOpacity={0.8}
            >
              <Text style={styles.tasbeehResetText}>{t('Reset', 'ری سیٹ')}</Text>
            </TouchableOpacity>
          </View>
          {tasbeehCount >= tasbeehTarget && (
            <View style={styles.tasbeehComplete}>
              <Text style={styles.tasbeehCompleteText}>🎉 {t('MashaAllah! Target reached!', 'ماشاءاللہ! ہدف پورا ہوا!')}</Text>
            </View>
          )}
        </View>

        {/* Prayer Times & Qibla */}
        <View style={styles.quickRow}>
          <TouchableOpacity style={styles.quickCard} activeOpacity={0.8}>
            <Text style={styles.quickIcon}>🕌</Text>
            <Text style={styles.quickTitle}>{t('Prayer Times', 'نماز کے اوقات')}</Text>
            <Text style={styles.quickSub}>{t('Soon', 'جلد')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickCard} activeOpacity={0.8}>
            <Text style={styles.quickIcon}>🧭</Text>
            <Text style={styles.quickTitle}>{t('Qibla Direction', 'قبلہ سمت')}</Text>
            <Text style={styles.quickSub}>{t('Soon', 'جلد')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickCard} activeOpacity={0.8} onPress={() => router.push('/islamic/calendar')}>
            <Text style={styles.quickIcon}>📅</Text>
            <Text style={styles.quickTitle}>{t('Calendar', 'کیلنڈر')}</Text>
            <Text style={styles.quickSub}>{t('View', 'دیکھیں')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { paddingHorizontal: 16, paddingBottom: 16 },
  headerBismillah: { textAlign: 'center', fontSize: Typography.lg, color: 'rgba(255,255,255,0.9)', fontWeight: Typography.bold, marginBottom: 4 },
  headerTitle: { textAlign: 'center', fontSize: Typography.xl, fontWeight: Typography.bold, color: '#fff' },
  headerSub: { textAlign: 'center', fontSize: Typography.sm, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  dateRow: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 10 },
  datePill: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 5, borderRadius: Radius.full },
  datePillText: { color: '#fff', fontSize: Typography.xs, fontWeight: Typography.medium },
  hadithBanner: { flexDirection: 'row', alignItems: 'flex-start', padding: 16, borderRadius: Radius.xl, marginBottom: 12, gap: 12, ...Shadow.soft },
  hadithIcon: { fontSize: 30, marginTop: 4 },
  hadithLabel: { color: 'rgba(255,255,255,0.85)', fontSize: Typography.xs, fontWeight: Typography.medium, marginBottom: 4 },
  hadithArabic: { color: '#fff', fontSize: Typography.lg, fontWeight: Typography.bold, textAlign: 'right' },
  hadithTranslation: { color: 'rgba(255,255,255,0.9)', fontSize: Typography.sm, marginTop: 4, fontStyle: 'italic' },
  sectionCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.surfaceLight, borderRadius: Radius.lg, padding: 14, marginBottom: 10,
    ...Shadow.card, gap: 14, borderLeftWidth: 4, borderLeftColor: Colors.success,
  },
  sectionIconWrap: { width: 52, height: 52, borderRadius: Radius.md, alignItems: 'center', justifyContent: 'center' },
  sectionInfo: { flex: 1 },
  sectionTitle: { fontSize: Typography.base, fontWeight: Typography.semibold, color: Colors.textPrimary },
  sectionDesc: { fontSize: Typography.sm, color: Colors.textMuted, marginTop: 2 },
  sectionArabic: { fontSize: Typography.sm, color: '#1e8449', marginTop: 4, textAlign: 'right' },
  tasbeehCard: {
    backgroundColor: Colors.surfaceLight, borderRadius: Radius.xl, padding: 20, marginBottom: 12,
    alignItems: 'center', ...Shadow.card, borderWidth: 2, borderColor: 'rgba(29,209,161,0.25)',
  },
  tasbeehTitle: { fontSize: Typography.lg, fontWeight: Typography.bold, color: Colors.textPrimary, marginBottom: 8 },
  tasbeehArabic: { fontSize: Typography.xl, color: Colors.islamic, fontWeight: Typography.bold, marginBottom: 12 },
  tasbeehProgressBar: { width: '100%', height: 8, backgroundColor: '#e0e0e0', borderRadius: 4, marginBottom: 8, overflow: 'hidden' },
  tasbeehProgress: { height: '100%', backgroundColor: Colors.success, borderRadius: 4 },
  tasbeehCount: { fontSize: Typography.xl, fontWeight: Typography.bold, color: Colors.success, marginBottom: 16 },
  tasbeehButtons: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  tasbeehBtn: { borderRadius: 40, overflow: 'hidden', ...Shadow.soft },
  tasbeehBtnGrad: { width: 80, height: 80, alignItems: 'center', justifyContent: 'center', borderRadius: 40 },
  tasbeehBtnText: { color: '#fff', fontSize: Typography.xl, fontWeight: Typography.bold },
  tasbeehResetBtn: { paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#f0f0f0', borderRadius: Radius.full },
  tasbeehResetText: { color: Colors.textMuted, fontWeight: Typography.medium },
  tasbeehComplete: { marginTop: 12, backgroundColor: 'rgba(29,209,161,0.12)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: Radius.full },
  tasbeehCompleteText: { color: Colors.success, fontWeight: Typography.bold, fontSize: Typography.sm },
  quickRow: { flexDirection: 'row', gap: 8 },
  quickCard: { flex: 1, backgroundColor: Colors.surfaceLight, borderRadius: Radius.lg, padding: 14, alignItems: 'center', ...Shadow.card },
  quickIcon: { fontSize: 26, marginBottom: 6 },
  quickTitle: { fontSize: Typography.xs, color: Colors.textSecondary, textAlign: 'center', fontWeight: Typography.medium },
  quickSub: { fontSize: 10, color: Colors.textLight, marginTop: 2 },
});
