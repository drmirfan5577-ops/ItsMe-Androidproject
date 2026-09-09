import React, { createContext, useState, useCallback, ReactNode } from 'react';
import { MOCK_USER, MOCK_CONTACTS, MOCK_MESSAGES, Message } from '@/constants/mockData';
import { ThemeKey, THEMES, AppTheme } from '@/constants/theme';

type Language = 'en' | 'ur';

export interface Contact {
  id: string;
  username: string;
  email: string;
  country: string;
  avatar: string;
  online: boolean;
  lastMessage: string;
  lastTime: string;
  unread: number;
  isGroup?: boolean;
  members?: number;
  phone?: string;
  bio?: string;
  isAdmin?: boolean;
}

interface AppContextType {
  currentUser: typeof MOCK_USER;
  contacts: Contact[];
  messages: Record<string, Message[]>;
  language: Language;
  setLanguage: (lang: Language) => void;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  sendMessage: (contactId: string, text: string) => void;
  addReaction: (contactId: string, messageId: string, emoji: string) => void;
  starMessage: (contactId: string, messageId: string) => void;
  deleteMessage: (contactId: string, messageId: string) => void;
  markRead: (contactId: string) => void;
  t: (en: string, ur: string) => string;
  themeKey: ThemeKey;
  setThemeKey: (key: ThemeKey) => void;
  theme: AppTheme;
  chatWallpaper: string;
  setChatWallpaper: (wallpaper: string) => void;
  isRecording: boolean;
  setIsRecording: (v: boolean) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [contacts, setContacts] = useState<Contact[]>(MOCK_CONTACTS as Contact[]);
  const [messages, setMessages] = useState<Record<string, Message[]>>(MOCK_MESSAGES);
  const [currentUser] = useState(MOCK_USER);
  const [themeKey, setThemeKey] = useState<ThemeKey>('pink');
  const [chatWallpaper, setChatWallpaper] = useState('gradient');
  const [isRecording, setIsRecording] = useState(false);

  const theme = THEMES[themeKey];

  const t = useCallback((en: string, ur: string) => language === 'ur' ? ur : en, [language]);

  const login = useCallback(() => setIsLoggedIn(true), []);
  const logout = useCallback(() => setIsLoggedIn(false), []);

  const sendMessage = useCallback((contactId: string, text: string) => {
    const newMsg: Message = {
      id: `m-${Date.now()}`,
      fromUser: currentUser.id,
      text,
      type: 'text',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sent: true,
      isRead: false,
    };
    setMessages(prev => ({
      ...prev,
      [contactId]: [...(prev[contactId] || []), newMsg],
    }));

    // Simulate auto-reply after delay
    if (!contactId.startsWith('group')) {
      const contact = contacts.find(c => c.id === contactId);
      if (contact) {
        const replies = [
          'JazakAllah Khair! 🙏',
          'SubhanAllah! That is great.',
          'Alhamdulillah! 🌙',
          'InshaAllah! Will check.',
          'ماشاءاللہ! بہت اچھا',
          '✨ Amazing! Keep it up!',
        ];
        setTimeout(() => {
          const reply: Message = {
            id: `m-reply-${Date.now()}`,
            fromUser: contactId,
            text: replies[Math.floor(Math.random() * replies.length)],
            type: 'text',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sent: false,
            isRead: false,
          };
          setMessages(prev => ({
            ...prev,
            [contactId]: [...(prev[contactId] || []), reply],
          }));
        }, 1500 + Math.random() * 2000);
      }
    }
  }, [currentUser.id, contacts]);

  const addReaction = useCallback((contactId: string, messageId: string, emoji: string) => {
    setMessages(prev => {
      const msgs = prev[contactId] || [];
      return {
        ...prev,
        [contactId]: msgs.map(m => {
          if (m.id !== messageId) return m;
          const existing = m.reactions || [];
          const idx = existing.findIndex(r => r.emoji === emoji);
          if (idx >= 0) {
            const updated = [...existing];
            if (updated[idx].reactedByMe) {
              updated[idx] = { ...updated[idx], count: updated[idx].count - 1, reactedByMe: false };
              if (updated[idx].count <= 0) updated.splice(idx, 1);
            } else {
              updated[idx] = { ...updated[idx], count: updated[idx].count + 1, reactedByMe: true };
            }
            return { ...m, reactions: updated };
          }
          return { ...m, reactions: [...existing, { emoji, count: 1, reactedByMe: true }] };
        }),
      };
    });
  }, []);

  const starMessage = useCallback((contactId: string, messageId: string) => {
    setMessages(prev => ({
      ...prev,
      [contactId]: (prev[contactId] || []).map(m =>
        m.id === messageId ? { ...m, starred: !m.starred } : m
      ),
    }));
  }, []);

  const deleteMessage = useCallback((contactId: string, messageId: string) => {
    setMessages(prev => ({
      ...prev,
      [contactId]: (prev[contactId] || []).filter(m => m.id !== messageId),
    }));
  }, []);

  const markRead = useCallback((contactId: string) => {
    setContacts(prev => prev.map(c => c.id === contactId ? { ...c, unread: 0 } : c));
  }, []);

  return (
    <AppContext.Provider value={{
      currentUser,
      contacts,
      messages,
      language,
      setLanguage,
      isLoggedIn,
      login,
      logout,
      sendMessage,
      addReaction,
      starMessage,
      deleteMessage,
      markRead,
      t,
      themeKey,
      setThemeKey,
      theme,
      chatWallpaper,
      setChatWallpaper,
      isRecording,
      setIsRecording,
    }}>
      {children}
    </AppContext.Provider>
  );
}
