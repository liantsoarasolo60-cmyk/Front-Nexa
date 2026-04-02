import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const HomeScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>Home</Text>
    <Text style={styles.subtitle}>Bienvenue dans l'application</Text>
  </View>
)

const ProfileScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>Profil</Text>
    <Text style={styles.subtitle}>Section du profil utilisateur</Text>
  </View>
)

const sHome = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#888',
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen name="HomePage" component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil' }} />
    </Tab.Navigator>
  )
}

export default sHome

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
  },
  tabBar: {
    backgroundColor: '#fff',
    borderTopColor: '#000',
    borderTopWidth: 1,
    height: 60,
    paddingBottom: 5,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
})