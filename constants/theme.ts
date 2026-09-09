// It's Me - SMART World Order
// Design Tokens + Multi-Theme System

export type ThemeKey = 'pink' | 'blue' | 'dark' | 'green' | 'purple' | 'gold';

export interface AppTheme {
  key: ThemeKey;
  name: string;
  nameUr: string;
  emoji: string;
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  accent: string;
  bgGradient: readonly [string, string, string];
  chatBg: readonly [string, string];
  sentBubble: string;
  surface: string;
  surfaceLight: string;
  borderColor: string;
  headerGradient: readonly [string, string];
  tabBarBorder: string;
  glowColor: string;
  isDark: boolean;
}

export const THEMES: Record<ThemeKey, AppTheme> = {
  pink: {
    key: 'pink',
    name: 'Rose Garden',
    nameUr: 'گلاب باغ',
    emoji: '🌸',
    primary: '#ff6b9d',
    primaryLight: '#ff8fab',
    primaryDark: '#e0557f',
    secondary: '#45aaf2',
    accent: '#feca57',
    bgGradient: ['#ffecd2', '#fcb69f', '#c2e9fb'],
    chatBg: ['#fff5f7', '#f0f9ff'],
    sentBubble: '#ff6b9d',
    surface: 'rgba(255,255,255,0.95)',
    surfaceLight: 'rgba(255,255,255,0.9)',
    borderColor: 'rgba(255,107,157,0.2)',
    headerGradient: ['rgba(255,255,255,0.97)', 'rgba(255,255,255,0.92)'],
    tabBarBorder: 'rgba(255,107,157,0.2)',
    glowColor: 'rgba(255,107,157,0.4)',
    isDark: false,
  },
  blue: {
    key: 'blue',
    name: 'Ocean Breeze',
    nameUr: 'سمندری ہوا',
    emoji: '🌊',
    primary: '#0984e3',
    primaryLight: '#74b9ff',
    primaryDark: '#0652dd',
    secondary: '#00cec9',
    accent: '#fdcb6e',
    bgGradient: ['#dfe6e9', '#a0c4ff', '#c2e9fb'],
    chatBg: ['#e8f4fd', '#d4eaf7'],
    sentBubble: '#0984e3',
    surface: 'rgba(255,255,255,0.95)',
    surfaceLight: 'rgba(255,255,255,0.9)',
    borderColor: 'rgba(9,132,227,0.2)',
    headerGradient: ['rgba(255,255,255,0.97)', 'rgba(232,244,253,0.95)'],
    tabBarBorder: 'rgba(9,132,227,0.2)',
    glowColor: 'rgba(9,132,227,0.35)',
    isDark: false,
  },
  dark: {
    key: 'dark',
    name: 'Midnight',
    nameUr: 'آدھی رات',
    emoji: '🌑',
    primary: '#a29bfe',
    primaryLight: '#b2bec3',
    primaryDark: '#6c5ce7',
    secondary: '#fd79a8',
    accent: '#ffeaa7',
    bgGradient: ['#1a1a2e', '#16213e', '#0f3460'],
    chatBg: ['#1e1e2e', '#252535'],
    sentBubble: '#6c5ce7',
    surface: 'rgba(30,30,50,0.95)',
    surfaceLight: 'rgba(40,40,65,0.9)',
    borderColor: 'rgba(162,155,254,0.2)',
    headerGradient: ['rgba(26,26,46,0.97)', 'rgba(22,33,62,0.97)'],
    tabBarBorder: 'rgba(162,155,254,0.25)',
    glowColor: 'rgba(162,155,254,0.45)',
    isDark: true,
  },
  green: {
    key: 'green',
    name: 'Nature Garden',
    nameUr: 'قدرتی باغ',
    emoji: '🌿',
    primary: '#00b894',
    primaryLight: '#55efc4',
    primaryDark: '#00a381',
    secondary: '#0984e3',
    accent: '#ffeaa7',
    bgGradient: ['#d4efdf', '#a9dfbf', '#d6eaf8'],
    chatBg: ['#eafaf1', '#d5f5e3'],
    sentBubble: '#00b894',
    surface: 'rgba(255,255,255,0.95)',
    surfaceLight: 'rgba(255,255,255,0.9)',
    borderColor: 'rgba(0,184,148,0.2)',
    headerGradient: ['rgba(255,255,255,0.97)', 'rgba(234,250,241,0.95)'],
    tabBarBorder: 'rgba(0,184,148,0.2)',
    glowColor: 'rgba(0,184,148,0.35)',
    isDark: false,
  },
  purple: {
    key: 'purple',
    name: 'Royal Purple',
    nameUr: 'شاہی بنفشی',
    emoji: '💜',
    primary: '#6c5ce7',
    primaryLight: '#a29bfe',
    primaryDark: '#5a4fcf',
    secondary: '#fd79a8',
    accent: '#ffeaa7',
    bgGradient: ['#f3e5f5', '#e1bee7', '#d4e6f1'],
    chatBg: ['#f5eef8', '#ede0f5'],
    sentBubble: '#6c5ce7',
    surface: 'rgba(255,255,255,0.95)',
    surfaceLight: 'rgba(255,255,255,0.9)',
    borderColor: 'rgba(108,92,231,0.2)',
    headerGradient: ['rgba(255,255,255,0.97)', 'rgba(245,238,248,0.95)'],
    tabBarBorder: 'rgba(108,92,231,0.2)',
    glowColor: 'rgba(108,92,231,0.35)',
    isDark: false,
  },
  gold: {
    key: 'gold',
    name: 'Golden Hour',
    nameUr: 'سونے کی گھڑی',
    emoji: '✨',
    primary: '#f39c12',
    primaryLight: '#f9ca24',
    primaryDark: '#d68910',
    secondary: '#e74c3c',
    accent: '#ffd700',
    bgGradient: ['#fef9e7', '#fdebd0', '#fef5e4'],
    chatBg: ['#fffde7', '#fef9e7'],
    sentBubble: '#f39c12',
    surface: 'rgba(255,255,255,0.95)',
    surfaceLight: 'rgba(255,255,255,0.9)',
    borderColor: 'rgba(243,156,18,0.25)',
    headerGradient: ['rgba(255,255,255,0.97)', 'rgba(254,249,231,0.95)'],
    tabBarBorder: 'rgba(243,156,18,0.25)',
    glowColor: 'rgba(243,156,18,0.4)',
    isDark: false,
  },
};

export const Colors = {
  primary: '#ff6b9d',
  primaryLight: '#ff8fab',
  primaryDark: '#e0557f',
  secondary: '#45aaf2',
  secondaryLight: '#74b9ff',
  accent: '#feca57',
  success: '#1dd1a1',
  successDark: '#10ac84',
  warning: '#ffa502',
  danger: '#ff4757',
  islamic: '#1e8449',

  bgGradientStart: '#ffecd2',
  bgGradientMid: '#fcb69f',
  bgGradientEnd: '#c2e9fb',
  surface: 'rgba(255,255,255,0.95)',
  surfaceLight: 'rgba(255,255,255,0.9)',
  surfaceDim: 'rgba(255,255,255,0.8)',
  card: '#ffffff',

  textPrimary: '#2d3748',
  textSecondary: '#555555',
  textMuted: '#888888',
  textLight: '#aaaaaa',

  borderPink: 'rgba(255,107,157,0.2)',
  borderPinkMed: 'rgba(255,107,157,0.4)',
  borderLight: '#ffd1dc',

  glowPink: 'rgba(255,107,157,0.4)',
  glowBlue: 'rgba(69,170,242,0.3)',
  glowGreen: 'rgba(29,209,161,0.3)',

  sentBubble: '#ff6b9d',
  receivedBubble: '#ffffff',
  onlineGreen: '#1dd1a1',
};

export const Typography = {
  xs: 11,
  sm: 13,
  base: 16,
  md: 18,
  lg: 20,
  xl: 22,
  '2xl': 26,
  '3xl': 32,

  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
};

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
};

export const Shadow = {
  pink: {
    shadowColor: '#ff6b9d',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  soft: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
  },
};

export const MESSAGE_REACTIONS = ['❤️', '😂', '😮', '😢', '👍', '🙏'];
