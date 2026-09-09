// Mock data for It's Me app — SMART World Order

export const MOCK_USER = {
  id: 'user-001',
  username: 'Ahmad Raza',
  email: 'ahmad@example.com',
  country: 'PK',
  avatar: 'A',
  bio: 'SMART World Order Member 🌐',
  phone: '+92-300-0000000',
  online: true,
};

export const MOCK_CONTACTS = [
  {
    id: 'contact-001',
    username: 'Fatima Zahra',
    email: 'fatima@example.com',
    country: 'PK',
    avatar: 'F',
    online: true,
    lastMessage: 'السلام علیکم! کیسے ہیں آپ؟',
    lastTime: '2m ago',
    unread: 3,
    phone: '+92-300-1111111',
    bio: 'Alhamdulillah for everything 🌸',
  },
  {
    id: 'contact-002',
    username: 'Muhammad Ali',
    email: 'mali@example.com',
    country: 'SA',
    avatar: 'M',
    online: false,
    lastMessage: 'JazakAllah Khair for sharing!',
    lastTime: '1h ago',
    unread: 0,
    phone: '+966-50-2222222',
    bio: 'Seeking knowledge always 📚',
  },
  {
    id: 'contact-003',
    username: 'Ayesha Siddiq',
    email: 'ayesha@example.com',
    country: 'IN',
    avatar: 'A',
    online: true,
    lastMessage: '📷 Photo',
    lastTime: '3h ago',
    unread: 1,
    phone: '+91-98-3333333',
    bio: 'SubhanAllah! Beautiful life 🌺',
  },
  {
    id: 'contact-004',
    username: 'Umar Farooq',
    email: 'umar@example.com',
    country: 'AE',
    avatar: 'U',
    online: false,
    lastMessage: 'Meeting on Friday, InshaAllah',
    lastTime: 'Yesterday',
    unread: 0,
    phone: '+971-50-4444444',
    bio: 'Entrepreneur | SMART World Order',
  },
  {
    id: 'contact-005',
    username: 'Zainab Hassan',
    email: 'zainab@example.com',
    country: 'BD',
    avatar: 'Z',
    online: true,
    lastMessage: '🎤 Voice message',
    lastTime: 'Yesterday',
    unread: 2,
    phone: '+880-17-5555555',
    bio: 'Reading • Writing • Learning ✨',
  },
  {
    id: 'contact-006',
    username: 'Dr. Irfan Qadir',
    email: 'dr.mirfan5577@gmail.com',
    country: 'PK',
    avatar: 'D',
    online: true,
    lastMessage: 'SMART World Order - New Update!',
    lastTime: 'Just now',
    unread: 1,
    phone: '+92-300-4737757',
    bio: 'Founder - SMART World Order 🌐 | نا ممکنات کو ممکن بنانے کا سفر',
    isAdmin: true,
  },
  {
    id: 'group-001',
    username: 'SMART World Order',
    email: '',
    country: 'PK',
    avatar: '🌐',
    online: true,
    lastMessage: 'New announcement from admin!',
    lastTime: '5m ago',
    unread: 5,
    isGroup: true,
    members: 1247,
    bio: 'Official SMART World Order Group',
  },
  {
    id: 'group-002',
    username: 'Islamic Knowledge Hub',
    email: '',
    country: 'PK',
    avatar: '☪️',
    online: true,
    lastMessage: '🎙️ Friday Khutbah recording shared',
    lastTime: '2h ago',
    unread: 12,
    isGroup: true,
    members: 8934,
    bio: 'Quran • Hadith • Islamic Knowledge',
  },
];

export interface Reaction {
  emoji: string;
  count: number;
  reactedByMe: boolean;
}

export interface Message {
  id: string;
  fromUser: string;
  text: string;
  type: 'text' | 'image' | 'voice' | 'video' | 'document' | 'sticker';
  mediaUrl?: string;
  time: string;
  sent: boolean;
  reactions?: Reaction[];
  replyTo?: { id: string; text: string; sender: string };
  isForwarded?: boolean;
  duration?: string;
  isRead?: boolean;
  starred?: boolean;
}

export const MOCK_MESSAGES: Record<string, Message[]> = {
  'contact-001': [
    { id: 'm1', fromUser: 'contact-001', text: 'السلام علیکم! 🌙', type: 'text', time: '10:00 AM', sent: false, isRead: true },
    { id: 'm2', fromUser: 'user-001', text: 'وعلیکم السلام! کیسے ہیں آپ؟', type: 'text', time: '10:01 AM', sent: true, isRead: true },
    { id: 'm3', fromUser: 'contact-001', text: 'الحمدللہ! بہت اچھے ہیں. آپ سنائیں؟', type: 'text', time: '10:02 AM', sent: false, reactions: [{ emoji: '❤️', count: 1, reactedByMe: false }] },
    { id: 'm4', fromUser: 'user-001', text: 'ماشاءاللہ! سب خیر ہے. SMART World Order کا نیا اپڈیٹ آ گیا ہے!', type: 'text', time: '10:03 AM', sent: true },
    { id: 'm5', fromUser: 'contact-001', text: 'الحمدللہ! JazakAllah Khair 🌙', type: 'text', time: '10:05 AM', sent: false, reactions: [{ emoji: '👍', count: 2, reactedByMe: true }] },
    { id: 'm6', fromUser: 'contact-001', text: 'السلام علیکم! کیسے ہیں آپ؟', type: 'text', time: '2m ago', sent: false },
  ],
  'contact-002': [
    { id: 'm1', fromUser: 'user-001', text: 'Assalamu Alaikum! 🌙', type: 'text', time: '9:00 AM', sent: true },
    { id: 'm2', fromUser: 'contact-002', text: 'Wa Alaikum Assalam! Alhamdulillah, doing well. How are you?', type: 'text', time: '9:15 AM', sent: false },
    { id: 'm3', fromUser: 'user-001', text: 'Have you seen the new Islamic Hub features? SubhanAllah it is amazing!', type: 'text', time: '9:16 AM', sent: true },
    { id: 'm4', fromUser: 'contact-002', text: 'JazakAllah Khair for sharing!', type: 'text', time: '1h ago', sent: false },
  ],
  'contact-006': [
    { id: 'm1', fromUser: 'contact-006', text: 'السلام علیکم! It\'s Me App Version 1.0 is now LIVE! 🎉', type: 'text', time: '9:00 AM', sent: false },
    { id: 'm2', fromUser: 'user-001', text: 'وعلیکم السلام! JazakAllah. Amazing work!', type: 'text', time: '9:05 AM', sent: true },
    { id: 'm3', fromUser: 'contact-006', text: 'SMART World Order کا پروجیکٹ ہے یہ۔ نا ممکنات کو ممکن بنانے کا سفر! 🌐', type: 'text', time: '9:06 AM', sent: false, reactions: [{ emoji: '🙏', count: 5, reactedByMe: true }] },
  ],
  'group-001': [
    { id: 'm1', fromUser: 'contact-006', text: '📢 Announcement: It\'s Me v1.0 is now live! Share with everyone.', type: 'text', time: '8:00 AM', sent: false },
    { id: 'm2', fromUser: 'contact-001', text: 'JazakAllah! This is amazing! ❤️', type: 'text', time: '8:05 AM', sent: false },
    { id: 'm3', fromUser: 'user-001', text: 'Alhamdulillah! Great work team! 🌐', type: 'text', time: '8:10 AM', sent: true },
    { id: 'm4', fromUser: 'contact-002', text: 'May Allah bless this project. Ameen 🙏', type: 'text', time: '5m ago', sent: false },
  ],
};

export const MOCK_STATUSES = [
  { id: 's1', userId: 'contact-001', username: 'Fatima Zahra', avatar: 'F', time: '5 min ago', viewed: false, text: '🌸 SubhanAllah Beautiful day!', bgColor: '#ff6b9d' },
  { id: 's2', userId: 'contact-003', username: 'Ayesha Siddiq', avatar: 'A', time: '1 hour ago', viewed: false, text: '📖 Reading Quran today', bgColor: '#1dd1a1' },
  { id: 's3', userId: 'contact-005', username: 'Zainab Hassan', avatar: 'Z', time: '3 hours ago', viewed: true, text: '🌙 Alhamdulillah', bgColor: '#6c5ce7' },
  { id: 's4', userId: 'contact-002', username: 'Muhammad Ali', avatar: 'M', time: '5 hours ago', viewed: true, text: '✨ SMART World Order!', bgColor: '#0984e3' },
  { id: 's5', userId: 'contact-006', username: 'Dr. Irfan Qadir', avatar: 'D', time: '6 hours ago', viewed: false, text: '🌐 It\'s Me App is LIVE! نا ممکنات کو ممکن!', bgColor: '#f39c12' },
];

export const MOCK_COMMUNITIES = [
  {
    id: 'c1',
    name: 'SMART World Order',
    description: 'Official community for SMART World Order members — نا ممکنات کو ممکن',
    icon: '🌐',
    members: 1247,
    isPublic: true,
    category: 'Organization',
    admin: 'Dr. Irfan Qadir',
  },
  {
    id: 'c2',
    name: 'Islamic Knowledge Hub',
    description: 'Share and learn Islamic knowledge, Quran, Hadith, Azkaar and more',
    icon: '☪️',
    members: 8934,
    isPublic: true,
    category: 'Religion',
    admin: 'Muhammad Ali',
  },
  {
    id: 'c3',
    name: 'Pakistan Tech Community',
    description: 'Technology, innovation and entrepreneurship for Pakistanis',
    icon: '💻',
    members: 5621,
    isPublic: true,
    category: 'Technology',
    admin: 'Umar Farooq',
  },
  {
    id: 'c4',
    name: 'Urdu Literature Circle',
    description: 'شاعری، ادب اور اردو زبان کے شیدائیوں کا حلقہ',
    icon: '📝',
    members: 3200,
    isPublic: true,
    category: 'Culture',
    admin: 'Zainab Hassan',
  },
  {
    id: 'c5',
    name: 'Global Muslims Network',
    description: 'Connecting Muslims worldwide in brotherhood and sisterhood',
    icon: '🕌',
    members: 14200,
    isPublic: true,
    category: 'Religion',
    admin: 'Fatima Zahra',
  },
];

export const MOCK_CALLS = [
  { id: 'call-001', contactId: 'contact-001', username: 'Fatima Zahra', avatar: 'F', type: 'audio' as const, direction: 'incoming' as const, status: 'answered' as const, time: '10:30 AM', duration: '5:23', date: 'Today' },
  { id: 'call-002', contactId: 'contact-002', username: 'Muhammad Ali', avatar: 'M', type: 'video' as const, direction: 'outgoing' as const, status: 'answered' as const, time: '9:00 AM', duration: '12:45', date: 'Today' },
  { id: 'call-003', contactId: 'contact-004', username: 'Umar Farooq', avatar: 'U', type: 'audio' as const, direction: 'incoming' as const, status: 'missed' as const, time: '8:15 AM', duration: '', date: 'Today' },
  { id: 'call-004', contactId: 'contact-003', username: 'Ayesha Siddiq', avatar: 'A', type: 'video' as const, direction: 'outgoing' as const, status: 'missed' as const, time: '7:30 PM', duration: '', date: 'Yesterday' },
  { id: 'call-005', contactId: 'contact-005', username: 'Zainab Hassan', avatar: 'Z', type: 'audio' as const, direction: 'incoming' as const, status: 'answered' as const, time: '3:00 PM', duration: '8:12', date: 'Yesterday' },
  { id: 'call-006', contactId: 'contact-001', username: 'Fatima Zahra', avatar: 'F', type: 'audio' as const, direction: 'outgoing' as const, status: 'answered' as const, time: '11:00 AM', duration: '2:55', date: 'Monday' },
];

export const ISLAMIC_CONTENT = {
  azkaar_morning: [
    { arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ', urdu: 'ہم نے صبح کی اور اللہ کی بادشاہت میں صبح کی، اللہ کی تمام تعریفیں', count: 1 },
    { arabic: 'آيَةُ الْكُرْسِيِّ — اللَّهُ لَا إِلَهَ إِلَّا هُوَ', urdu: 'آیت الکرسی (ہر صبح ۳ بار)', count: 3 },
    { arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ', urdu: 'سورۃ الاخلاص، الفلق، الناس', count: 3 },
    { arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ', urdu: 'تمام مخلوقات کے شر سے اللہ کی کامل باتوں کی پناہ', count: 3 },
    { arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا', urdu: 'اے اللہ ہم نے تیرے نام سے صبح کی اور شام کی', count: 1 },
  ],
  azkaar_evening: [
    { arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ', urdu: 'ہم نے شام کی اور اللہ کی بادشاہت میں شام کی', count: 1 },
    { arabic: 'اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا', urdu: 'اے اللہ ہم نے تیرے نام سے شام کی', count: 1 },
    { arabic: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ', urdu: 'شیطان مردود سے اللہ کی پناہ مانگتا ہوں', count: 3 },
    { arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', urdu: 'اللہ پاک ہے اور اس کی تعریف', count: 100 },
  ],
  dajjal_protection: [
    { title: 'Surah Al-Kahf', desc: 'سورۃ الکہف کی پہلی 10 آیات ہر جمعے کو پڑھیں — دجال کے فتنے سے حفاظت', arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَنزَلَ عَلَىٰ عَبْدِهِ الْكِتَابَ' },
    { title: 'Ayat al-Kursi', desc: 'ہر نماز کے بعد آیت الکرسی پڑھیں — نبی ﷺ کی تعلیم', arabic: 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ' },
    { title: 'Dua in Tashahhud', desc: 'تشہد میں دجال کے فتنے سے پناہ مانگیں', arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ' },
    { title: 'Morning/Evening Dhikr', desc: 'صبح و شام تین بار یہ پڑھیں', arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ' },
    { title: 'Madina — Not Entry', desc: 'دجال مدینہ اور مکہ میں داخل نہیں ہو سکتا — ان مقدس شہروں سے محبت رکھیں', arabic: 'لَا يَدْخُلُ الْمَدِينَةَ رُعْبُ الْمَسِيحِ الدَّجَّالِ' },
  ],
};

export const ADMIN_PASSWORD = 'admin@smartworldorder2026';
