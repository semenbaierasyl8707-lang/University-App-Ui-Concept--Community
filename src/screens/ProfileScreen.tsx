import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import SettingsScreen from './SettingsScreen';
import AchievementScreen from './Achievement';
import PrivacyScreen from './PrivacyScreen';

interface ProfileProps {
  onLogout: () => void;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  role: 'Student' | 'Teacher';
}

export default function ProfileScreen({ onLogout }: ProfileProps) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('userProfile');

        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.log('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#B52B91" />
      </View>
    );
  }

  // Settings screen
  if (showSettings) {
    return (
      <SettingsScreen
        onBack={() => setShowSettings(false)}
      />
    );
  }

  // Achievement screen
  if (showAchievements) {
    return (
      <AchievementScreen
        onBack={() => {
          console.log('RETURNING TO PROFILE');
          setShowAchievements(false);
        }}
      />
    );
  }

  // Privacy screen
  if (showPrivacy) {
    return (
      <PrivacyScreen
        onBack={() => setShowPrivacy(false)}
      />
    );
  }

  // Ниже должен идти основной return экрана Profile

  const fullName = user
    ? `${user.firstName} ${user.lastName}`
    : 'No user data';

  const isStudent = user?.role === 'Student';

  const showMessage = (title: string) => {
    Alert.alert(title, 'This feature will be available soon.');
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.header}>Profile</Text>

      {/* User information */}
      <View style={styles.userSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.firstName?.charAt(0).toUpperCase() || '?'}
          </Text>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.email}>
            {user?.email || 'Email not provided'}
          </Text>
          <Text style={styles.role}>
            {user?.role || 'User'} • UniversityApp
          </Text>
        </View>
      </View>

      {/* Statistics summary */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>
            {isStudent ? '50/130' : '12'}
          </Text>
          <Text style={styles.summaryLabel}>
            {isStudent ? 'Credit earns' : 'Courses'}
          </Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>
            {isStudent ? '3.02' : '8'}
          </Text>
          <Text style={styles.summaryLabel}>
            {isStudent ? 'GPA' : 'Groups'}
          </Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>2</Text>
          <Text style={styles.summaryLabel}>
            {isStudent ? 'Year student' : 'Year teaching'}
          </Text>
        </View>
      </View>

      {/* Statistics */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.cardTitle}>Statistics</Text>
            <Text style={styles.date}>Your academic overview</Text>
          </View>

          <TouchableOpacity
            style={styles.attendButton}
            onPress={() => showMessage('Attendance')}
          >
            <Text style={styles.attendText}>Mark Attend</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statisticsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>🟡</Text>
            <View>
              <Text style={styles.statLabel}>Attendance</Text>
              <Text style={styles.statValue}>90%</Text>
            </View>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statIcon}>📋</Text>
            <View>
              <Text style={styles.statLabel}>Task & Work</Text>
              <Text style={styles.statValue}>70%</Text>
            </View>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statIcon}>📝</Text>
            <View>
              <Text style={styles.statLabel}>Quiz</Text>
              <Text style={styles.statValue}>85%</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Dashboard */}
      <View style={styles.card}>
        <Text style={styles.dashboardTitle}>Dashboard</Text>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setShowSettings(true)}
        >
          <Text style={styles.menuIcon}>⚙️</Text>
          <Text style={styles.menuText}>Settings</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setShowAchievements(true)}
        >
          <Text style={styles.menuIcon}>🌟</Text>
          <Text style={styles.menuText}>Achievement</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setShowPrivacy(true)}
        >
          <Text style={styles.menuIcon}>🛡️</Text>
          <Text style={styles.menuText}>Privacy</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={onLogout}
      >
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <Text style={styles.version}>UniversityApp • Version 1.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 30,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222222',
    textAlign: 'center',
    marginBottom: 25,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    paddingHorizontal: 5,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#EADCF5',
    borderWidth: 1,
    borderColor: '#B52B91',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 25,
    fontWeight: '700',
    color: '#A52A87',
  },
  userInfo: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222222',
  },
  email: {
    fontSize: 12,
    color: '#888888',
    marginTop: 3,
  },
  role: {
    fontSize: 11,
    color: '#AAAAAA',
    marginTop: 3,
  },
  summaryCard: {
    backgroundColor: '#F5F1FF',
    borderRadius: 12,
    paddingVertical: 17,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 22,
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#B52B91',
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#A52A87',
    marginTop: 3,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#F7F5FF',
    borderWidth: 1,
    borderColor: '#C65AAE',
    borderRadius: 12,
    padding: 15,
    marginBottom: 22,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222222',
  },
  date: {
    fontSize: 10,
    color: '#999999',
    marginTop: 3,
  },
  attendButton: {
    backgroundColor: '#A5E5A7',
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 10,
  },
  attendText: {
    fontSize: 9,
    color: '#245A2A',
    fontWeight: '600',
  },
  statisticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statIcon: {
    fontSize: 19,
    marginRight: 7,
  },
  statLabel: {
    fontSize: 10,
    color: '#999999',
  },
  statValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#222222',
  },
  dashboardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999999',
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  menuIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  menuText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: '#222222',
  },
  arrow: {
    fontSize: 25,
    color: '#BBBBBB',
  },
  logoutButton: {
    backgroundColor: '#B52B91',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 2,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  version: {
    textAlign: 'center',
    fontSize: 10,
    color: '#AAAAAA',
    marginTop: 15,
  },
});
