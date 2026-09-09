import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useApp } from '@/hooks/useApp';
import { ISLAMIC_CONTENT } from '@/constants/mockData';
import { Colors, Typography, Radius, Shadow } from '@/constants/theme';

const SECTION_META: Record<string, { title: string; titleUr: string; color: readonly [string, string]; emoji: string }> = {
  quran: { title: 'The Holy Quran', titleUr: 'القرآن الکریم', color: [Colors.success, Colors.successDark] as const, emoji: '📖' },
  ahadees: { title: 'Ahadees', titleUr: 'احادیث', color: [Colors.secondary, '#2980b9'] as const, emoji: '📚' },
  azkaar_morning: { title: 'Morning Azkaar', titleUr: 'صبح کے اذکار', color: ['#f9a825', '#f57f17'] as const, emoji: '🌅' },
  azkaar_evening: { title: 'Evening Azkaar', titleUr: 'شام کے اذکار', color: ['#6c5ce7', '#a29bfe'] as const, emoji: '🌙' },
  dajjal: { title: 'Protection from Dajjal', titleUr: 'دجال سے حفاظت', color: ['#e17055', '#d63031'] as const, emoji: '🛡️' },
  calendar: { title: 'Islamic Calendar', titleUr: 'اسلامی کیلنڈر', color: [Colors.primary, Colors.primaryDark] as const, emoji: '📅' },
};

export default function IslamicDetailScreen() {
  const { section } = useLocalSearchParams<{ section: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t, language } = useApp();

  const meta = SECTION_META[section] || SECTION_META['quran'];

  const renderContent = () => {
    switch (section) {
      case 'quran':
        return (
          <View>
            <View style={styles.arabicCard}>
              <Text style={styles.arabicBig}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</Text>
              <Text style={styles.translationText}>{t('In the name of Allah, the Most Gracious, the Most Merciful', 'اللہ کے نام سے جو بڑا مہربان، نہایت رحم والا ہے')}</Text>
            </View>
            <TouchableOpacity style={styles.linkBtn} onPress={() => Linking.openURL('https://quran.com')} activeOpacity={0.8}>
              <LinearGradient colors={[Colors.success, Colors.successDark]} style={styles.linkBtnGrad}>
                <Text style={styles.linkBtnText}>📖 {t('Read Quran Online', 'قرآن آن لائن پڑھیں')}</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkBtn} onPress={() => Linking.openURL('https://alquran.cloud')} activeOpacity={0.8}>
              <LinearGradient colors={[Colors.secondary, '#2980b9']} style={styles.linkBtnGrad}>
                <Text style={styles.linkBtnText}>🎧 {t('Listen to Quran', 'قرآن سنیں')}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        );
      case 'ahadees':
        return (
          <View>
            <View style={styles.hadithCard}>
              <Text style={styles.hadithNum}>Hadith 1</Text>
              <Text style={styles.arabicMed}>الدِّينُ النَّصِيحَةُ</Text>
              <Text style={styles.hadithTrans}>{t('"Religion is sincere advice."', '"دین خیرخواہی کا نام ہے۔"')}</Text>
              <Text style={styles.hadithRef}>— Sahih Muslim, 55</Text>
            </View>
            <View style={styles.hadithCard}>
              <Text style={styles.hadithNum}>Hadith 2</Text>
              <Text style={styles.arabicMed}>خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ</Text>
              <Text style={styles.hadithTrans}>{t('"The best of you is he who learns the Quran and teaches it."', '"تم میں سے بہترین وہ ہے جو قرآن سیکھے اور سکھائے۔"')}</Text>
              <Text style={styles.hadithRef}>— Sahih Bukhari, 5027</Text>
            </View>
            <TouchableOpacity style={styles.linkBtn} onPress={() => Linking.openURL('https://sunnah.com')} activeOpacity={0.8}>
              <LinearGradient colors={[Colors.secondary, '#2980b9']} style={styles.linkBtnGrad}>
                <Text style={styles.linkBtnText}>📚 {t('Read All Ahadees', 'تمام احادیث پڑھیں')}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        );
      case 'azkaar_morning':
        return (
          <View>
            <Text style={styles.timeLabel}>🌅 {t('Morning Azkaar', 'صبح کے اذکار')}</Text>
            {ISLAMIC_CONTENT.azkaar_morning.map((item, i) => (
              <View key={i} style={styles.zikrCard}>
                <View style={styles.zikrCount}>
                  <Text style={styles.zikrCountText}>×{item.count}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.zikrArabic}>{item.arabic}</Text>
                  <Text style={styles.zikrUrdu}>{item.urdu}</Text>
                </View>
              </View>
            ))}
          </View>
        );
      case 'azkaar_evening':
        return (
          <View>
            <Text style={styles.timeLabel}>🌙 {t('Evening Azkaar', 'شام کے اذکار')}</Text>
            {ISLAMIC_CONTENT.azkaar_evening.map((item, i) => (
              <View key={i} style={styles.zikrCard}>
                <View style={styles.zikrCount}>
                  <Text style={styles.zikrCountText}>×{item.count}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.zikrArabic}>{item.arabic}</Text>
                  <Text style={styles.zikrUrdu}>{item.urdu}</Text>
                </View>
              </View>
            ))}
          </View>
        );
      case 'dajjal':
        return (
          <View>
            <View style={styles.warningBanner}>
              <Text style={styles.warningText}>
                {t('The Prophet ﷺ warned us about Dajjal. These are the essential protections from Sunnah:', 'نبی ﷺ نے ہمیں دجال سے خبردار کیا۔ یہ سنت سے ضروری حفاظتی تدابیر ہیں:')}
              </Text>
            </View>
            {ISLAMIC_CONTENT.dajjal_protection.map((item, i) => (
              <View key={i} style={styles.dajjalCard}>
                <Text style={styles.dajjalTitle}>{i + 1}. {item.title}</Text>
                <Text style={styles.dajjalDesc}>{item.desc}</Text>
                <Text style={styles.dajjalArabic}>{item.arabic}</Text>
              </View>
            ))}
          </View>
        );
      case 'calendar':
        const today = new Date();
        let hijriDate = '1447 Hijri';
        try {
          hijriDate = today.toLocaleDateString('en-SA-u-ca-islamic', { year: 'numeric', month: 'long', day: 'numeric' });
        } catch {}
        return (
          <View>
            <View style={styles.calCard}>
              <Text style={styles.calLabel}>{t('Today — Gregorian', 'آج — عیسوی')}</Text>
              <Text style={styles.calDate}>
                {today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </Text>
            </View>
            <View style={[styles.calCard, { borderLeftColor: Colors.success }]}>
              <Text style={styles.calLabel}>☪️ {t('Today — Hijri', 'آج — ہجری')}</Text>
              <Text style={styles.calDate}>{hijriDate}</Text>
            </View>
            <View style={styles.islamicMonths}>
              <Text style={styles.islamicMonthsTitle}>{t('Islamic Months', 'اسلامی مہینے')}</Text>
              {[
                'Muharram — محرم', 'Safar — صفر', "Rabi' al-Awwal — ربیع الاول",
                "Rabi' al-Thani — ربیع الثانی", 'Jumada al-Ula — جمادی الاولیٰ', 'Jumada al-Thani — جمادی الثانیہ',
                'Rajab — رجب', "Sha'ban — شعبان", 'Ramadan — رمضان',
                'Shawwal — شوال', "Dhu al-Qi'dah — ذوالقعدہ", 'Dhu al-Hijjah — ذوالحجہ'
              ].map((month, i) => (
                <View key={i} style={styles.monthRow}>
                  <Text style={styles.monthNum}>{i + 1}.</Text>
                  <Text style={styles.monthName}>{month}</Text>
                </View>
              ))}
            </View>
          </View>
        );
      default:
        return <Text style={{ color: Colors.textMuted, textAlign: 'center', padding: 24 }}>Content not available</Text>;
    }
  };

  return (
    <View style={styles.root}>
      <LinearGradient colors={['#e8f8f0', '#c3f0da', '#d4f1f9']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFillObject} />

      {/* Header */}
      <LinearGradient colors={meta.color} style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerEmoji}>{meta.emoji}</Text>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>{language === 'ur' ? meta.titleUr : meta.title}</Text>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        {renderContent()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    paddingHorizontal: 8,
    gap: 10,
  },
  backBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  headerEmoji: { fontSize: 28 },
  headerInfo: { flex: 1 },
  headerTitle: { fontSize: Typography.xl, fontWeight: Typography.bold, color: '#fff' },
  arabicCard: {
    backgroundColor: Colors.surfaceLight,
    borderRadius: Radius.xl,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: Colors.success,
    ...Shadow.card,
  },
  arabicBig: { fontSize: 26, color: '#1e8449', textAlign: 'right', lineHeight: 44, marginBottom: 8 },
  translationText: { fontSize: Typography.base, color: Colors.textSecondary, textAlign: 'center', fontStyle: 'italic' },
  linkBtn: { borderRadius: Radius.lg, overflow: 'hidden', marginBottom: 10 },
  linkBtnGrad: { paddingVertical: 14, alignItems: 'center', borderRadius: Radius.lg },
  linkBtnText: { color: '#fff', fontWeight: Typography.bold, fontSize: Typography.base },
  hadithCard: {
    backgroundColor: Colors.surfaceLight,
    borderRadius: Radius.xl,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.secondary,
    ...Shadow.card,
  },
  hadithNum: { fontSize: Typography.xs, color: Colors.secondary, fontWeight: Typography.bold, marginBottom: 6 },
  arabicMed: { fontSize: 20, color: Colors.textPrimary, textAlign: 'right', marginBottom: 8 },
  hadithTrans: { fontSize: Typography.base, color: Colors.textSecondary, fontStyle: 'italic', marginBottom: 4 },
  hadithRef: { fontSize: Typography.xs, color: Colors.textMuted },
  timeLabel: { fontSize: Typography.xl, fontWeight: Typography.bold, color: Colors.textPrimary, marginBottom: 12 },
  zikrCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceLight,
    borderRadius: Radius.lg,
    padding: 14,
    marginBottom: 10,
    gap: 12,
    alignItems: 'flex-start',
    ...Shadow.card,
  },
  zikrCount: {
    backgroundColor: Colors.success,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  zikrCountText: { color: '#fff', fontWeight: Typography.bold, fontSize: Typography.sm },
  zikrArabic: { fontSize: 18, color: '#1e8449', textAlign: 'right', marginBottom: 4 },
  zikrUrdu: { fontSize: Typography.sm, color: Colors.textMuted },
  warningBanner: {
    backgroundColor: 'rgba(225,112,85,0.12)',
    borderRadius: Radius.lg,
    padding: 14,
    marginBottom: 14,
    borderLeftWidth: 4,
    borderLeftColor: '#e17055',
  },
  warningText: { fontSize: Typography.base, color: Colors.textSecondary, lineHeight: 24 },
  dajjalCard: {
    backgroundColor: Colors.surfaceLight,
    borderRadius: Radius.lg,
    padding: 14,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#e17055',
    ...Shadow.card,
  },
  dajjalTitle: { fontSize: Typography.base, fontWeight: Typography.bold, color: Colors.textPrimary, marginBottom: 4 },
  dajjalDesc: { fontSize: Typography.sm, color: Colors.textMuted, marginBottom: 8 },
  dajjalArabic: { fontSize: 16, color: '#e17055', textAlign: 'right' },
  calCard: {
    backgroundColor: Colors.surfaceLight,
    borderRadius: Radius.lg,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    ...Shadow.card,
  },
  calLabel: { fontSize: Typography.sm, color: Colors.textMuted, marginBottom: 6, fontWeight: Typography.medium },
  calDate: { fontSize: Typography.lg, fontWeight: Typography.bold, color: Colors.textPrimary },
  islamicMonths: { backgroundColor: Colors.surfaceLight, borderRadius: Radius.xl, padding: 16, ...Shadow.card },
  islamicMonthsTitle: { fontSize: Typography.base, fontWeight: Typography.bold, color: Colors.primary, marginBottom: 10 },
  monthRow: { flexDirection: 'row', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.04)', gap: 10 },
  monthNum: { fontSize: Typography.sm, color: Colors.textMuted, width: 24 },
  monthName: { fontSize: Typography.sm, color: Colors.textPrimary, flex: 1 },
});
