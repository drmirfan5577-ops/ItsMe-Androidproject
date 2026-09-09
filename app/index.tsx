import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '@/hooks/useApp';
import { Colors, Typography, Spacing, Radius, Shadow } from '@/constants/theme';

const { width } = Dimensions.get('window');

export default function AuthScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { login, language, setLanguage, isLoggedIn, t } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) router.replace('/(tabs)');
  }, [isLoggedIn]);

  const handleAuth = async () => {
    if (!email || !password) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    login();
    router.replace('/(tabs)');
  };

  const handleGoogle = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    login();
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient
        colors={['#ffecd2', '#fcb69f', '#a1c4fd', '#c2e9fb', '#ffd1ff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Lang toggle */}
      <View style={[styles.langToggle, { top: insets.top + 12 }]}>
        <TouchableOpacity
          style={[styles.langBtn, language === 'en' && styles.langBtnActive]}
          onPress={() => setLanguage('en')}
        >
          <Text style={[styles.langBtnText, language === 'en' && styles.langBtnTextActive]}>EN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.langBtn, language === 'ur' && styles.langBtnActive]}
          onPress={() => setLanguage('ur')}
        >
          <Text style={[styles.langBtnText, language === 'ur' && styles.langBtnTextActive]}>اردو</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 60, paddingBottom: insets.bottom + 20 }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Brand Header */}
          <View style={styles.brandCard}>
            <Image
              source={require('@/assets/splash-hero.png')}
              style={styles.heroImg}
              contentFit="cover"
            />
            <View style={styles.brandOverlay}>
              <Text style={styles.brandTitle}>✨ It's Me ✨</Text>
              <Text style={styles.brandTagline}>
                {t('A Social & Digital Media App', 'ایک سوشل اور ڈیجیٹل میڈیا ایپ')}
              </Text>
              <Text style={styles.brandSub}>
                {t('A project of SMART World Order', 'SMART World Order کا پروجیکٹ')}
              </Text>
              <Text style={styles.brandUrdu}>ہمت ہے تو پیدا کر فردوسِ بریں اپنا</Text>
              <Text style={styles.brandUrduSm}>کہ مانگی ہوئی جنت سے ہے دوزخ کا عذاب اچھا</Text>
            </View>
          </View>

          {/* Auth Box */}
          <View style={styles.authBox}>
            <Text style={styles.authTitle}>
              {t('Welcome / خوش آمدید', 'خوش آمدید')}
            </Text>

            {/* Google */}
            <TouchableOpacity style={[styles.btn, styles.btnGoogle]} onPress={handleGoogle} activeOpacity={0.8}>
              <Text style={styles.btnText}>
                🔐 {t('Sign in with Google', 'Google سے سائن ان')}
              </Text>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>— OR —</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Mode Toggle */}
            <View style={styles.modeRow}>
              <TouchableOpacity
                style={[styles.modeBtn, mode === 'login' && styles.modeBtnActive]}
                onPress={() => setMode('login')}
              >
                <Text style={[styles.modeBtnText, mode === 'login' && styles.modeBtnTextActive]}>
                  {t('Login', 'لاگ ان')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modeBtn, mode === 'register' && styles.modeBtnActive]}
                onPress={() => setMode('register')}
              >
                <Text style={[styles.modeBtnText, mode === 'register' && styles.modeBtnTextActive]}>
                  {t('Register', 'رجسٹر')}
                </Text>
              </TouchableOpacity>
            </View>

            {mode === 'register' && (
              <TextInput
                style={styles.input}
                placeholder={t('Username / یوزر نیم', 'یوزر نیم')}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                placeholderTextColor={Colors.textMuted}
              />
            )}

            <TextInput
              style={styles.input}
              placeholder={t('Email / ای میل', 'ای میل')}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={Colors.textMuted}
            />

            <TextInput
              style={styles.input}
              placeholder={t('Password / پاسورڈ', 'پاسورڈ')}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor={Colors.textMuted}
            />

            <TouchableOpacity
              style={[styles.btn, styles.btnPrimary, loading && { opacity: 0.7 }]}
              onPress={handleAuth}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={styles.btnText}>
                {loading ? '⏳ ' + t('Please wait...', 'انتظار کریں...') :
                  mode === 'login'
                    ? '🔑 ' + t('Login / لاگ ان', 'لاگ ان کریں')
                    : '📝 ' + t('Register / رجسٹر', 'رجسٹر کریں')}
              </Text>
            </TouchableOpacity>

            {mode === 'login' && (
              <TouchableOpacity style={[styles.btn, styles.btnWarning]} activeOpacity={0.8}>
                <Text style={styles.btnText}>
                  🔒 {t('Forgot Password?', 'پاسورڈ بھول گئے؟')}
                </Text>
              </TouchableOpacity>
            )}

            <Text style={styles.mockNote}>
              {t('MOCK LOGIN — Tap any login button to continue', 'موک لاگ ان — کوئی بھی بٹن دبائیں')}
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { alignItems: 'center', paddingHorizontal: 16 },
  langToggle: { position: 'absolute', right: 16, flexDirection: 'row', gap: 8, zIndex: 100 },
  langBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(255,255,255,0.9)',
    ...Shadow.soft,
  },
  langBtnActive: { backgroundColor: Colors.primary },
  langBtnText: { color: Colors.primary, fontWeight: Typography.bold, fontSize: Typography.sm },
  langBtnTextActive: { color: '#fff' },

  brandCard: {
    width: width - 32,
    height: 220,
    borderRadius: Radius['2xl'],
    overflow: 'hidden',
    marginBottom: 20,
    ...Shadow.pink,
  },
  heroImg: { width: '100%', height: '100%' },
  brandOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  brandTitle: {
    fontSize: Typography['2xl'],
    fontWeight: Typography.bold,
    color: '#fff',
    textShadowColor: 'rgba(255,107,157,0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  brandTagline: { fontSize: Typography.sm, color: 'rgba(255,255,255,0.9)', marginTop: 4 },
  brandSub: { fontSize: Typography.sm, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  brandUrdu: { fontSize: Typography.base, color: '#ffd1dc', fontWeight: Typography.bold, marginTop: 8, textAlign: 'center' },
  brandUrduSm: { fontSize: Typography.xs, color: 'rgba(255,209,220,0.85)', marginTop: 2, textAlign: 'center' },

  authBox: {
    width: width - 32,
    backgroundColor: Colors.surface,
    borderRadius: Radius['2xl'],
    padding: 24,
    ...Shadow.pink,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.8)',
  },
  authTitle: {
    textAlign: 'center',
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
    color: Colors.primary,
    marginBottom: 16,
  },
  btn: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: Radius.lg,
    alignItems: 'center',
    marginVertical: 5,
    ...Shadow.soft,
  },
  btnPrimary: { backgroundColor: Colors.primary },
  btnGoogle: { backgroundColor: '#4285f4' },
  btnWarning: { backgroundColor: Colors.warning },
  btnText: { color: '#fff', fontWeight: Typography.bold, fontSize: Typography.base },

  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.borderLight },
  dividerText: { marginHorizontal: 8, color: Colors.textMuted, fontSize: Typography.sm },

  modeRow: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: Radius.lg,
    padding: 4,
    marginBottom: 12,
  },
  modeBtn: { flex: 1, paddingVertical: 8, borderRadius: Radius.md, alignItems: 'center' },
  modeBtnActive: { backgroundColor: Colors.primary },
  modeBtnText: { color: Colors.textMuted, fontWeight: Typography.medium, fontSize: Typography.base },
  modeBtnTextActive: { color: '#fff' },

  input: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 13,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: Colors.borderLight,
    borderRadius: Radius.lg,
    backgroundColor: '#fff',
    fontSize: Typography.base,
    color: Colors.textPrimary,
  },
  mockNote: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: Typography.xs,
    color: Colors.warning,
    fontWeight: Typography.medium,
  },
});
