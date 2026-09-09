import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { useApp } from '@/hooks/useApp';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { theme } = useApp();

  const tabBarStyle = {
    height: Platform.select({ ios: insets.bottom + 64, android: insets.bottom + 64, default: 70 }),
    paddingTop: 8,
    paddingBottom: Platform.select({ ios: insets.bottom + 8, android: insets.bottom + 8, default: 8 }),
    paddingHorizontal: 2,
    backgroundColor: theme.isDark ? 'rgba(26,26,46,0.97)' : 'rgba(255,255,255,0.97)',
    borderTopWidth: 1,
    borderTopColor: theme.tabBarBorder,
    shadowColor: theme.primary,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 16,
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.isDark ? '#888' : '#999',
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600', marginTop: -2 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Chats',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons name={focused ? 'chat' : 'chat-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="updates"
        options={{
          title: 'Updates',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons name={focused ? 'circle-slice-8' : 'circle-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="communities"
        options={{
          title: 'Groups',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons name={focused ? 'groups' : 'group'} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calls"
        options={{
          title: 'Calls',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons name={focused ? 'phone' : 'phone-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="islamic"
        options={{
          title: 'I-Hub',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons name={focused ? 'star-crescent' : 'star-crescent'} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="eshub"
        options={{
          title: 'ES Hub',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons name="language" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons name={focused ? 'settings' : 'settings'} size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
