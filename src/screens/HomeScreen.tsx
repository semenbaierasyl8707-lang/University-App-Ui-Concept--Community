import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from '../navigation/AppNavigator';
import Header from '../components/Header';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  role: 'Student' | 'Teacher';
}

export default function HomeScreen() {
  const navigation =
  useNavigation<BottomTabNavigationProp<MainTabParamList>>();
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('userProfile');

        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.log('Error loading user:', error);
      }
    };

    loadUser();
  }, []);

  const isTeacher = user?.role === 'Teacher';

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.name}>
            {user?.firstName || 'Student'}! 👋
          </Text>
        </View>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.firstName?.charAt(0).toUpperCase() || 'S'}
          </Text>
        </View>
      </View>

      <Header
  title="Your Dashboard"
  subtitle="Your education, your future."
      />

      <View style={styles.semesterCard}>
        <Text style={styles.semesterLabel}>
          {isTeacher ? 'TEACHER ACCOUNT' : 'CURRENT SEMESTER'}
        </Text>

        <Text style={styles.semesterTitle}>
          {isTeacher ? 'Welcome, Teacher!' : 'Fall Semester 2026'}
        </Text>

        <Text style={styles.semesterDescription}>
          {isTeacher
            ? 'Manage your courses and support your students!'
            : 'Keep learning and achieve your goals!'}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>
        {isTeacher ? 'Teaching' : 'Next Class'}
      </Text>

      <View style={styles.classCard}>
        <View style={styles.classIcon}>
          <Text style={styles.iconText}>📚</Text>
        </View>

        <View style={styles.classInfo}>
          <Text style={styles.className}>
            {isTeacher ? 'Your Courses' : 'Digital Thinking'}
          </Text>

          <Text style={styles.classTime}>
            {isTeacher ? 'Manage your subjects' : '09:00 AM – 10:30 AM'}
          </Text>

          <Text style={styles.classLocation}>
            {isTeacher ? '📍 University Campus' : '📍 Auditorium 2'}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Quick Access</Text>

      <View style={styles.quickAccess}>
  {/* Courses */}
  <TouchableOpacity
    style={styles.quickCard}
    onPress={() => navigation.navigate('Courses')}
  >
    <Text style={styles.quickIcon}>📖</Text>
    <Text style={styles.quickTitle}>Courses</Text>
    <Text style={styles.quickDescription}>
      {isTeacher ? 'Manage courses' : 'Your subjects'}
    </Text>
  </TouchableOpacity>

  {/* Schedule */}
  <TouchableOpacity
    style={styles.quickCard}
    onPress={() => navigation.navigate('Schedule')}
  >
    <Text style={styles.quickIcon}>📅</Text>
    <Text style={styles.quickTitle}>Schedule</Text>
    <Text style={styles.quickDescription}>
      {isTeacher ? 'Teaching schedule' : 'Your classes'}
    </Text>
  </TouchableOpacity>

  {/* Students / Results */}
  <TouchableOpacity
    style={styles.quickCard}
    onPress={() =>
      navigation.navigate(isTeacher ? 'Students' : 'Results')
    }
  >
    <Text style={styles.quickIcon}>
      {isTeacher ? '👨‍🎓' : '📊'}
    </Text>
    <Text style={styles.quickTitle}>
      {isTeacher ? 'Students' : 'Results'}
    </Text>
    <Text style={styles.quickDescription}>
      {isTeacher ? 'Student list' : 'Your grades'}
    </Text>
  </TouchableOpacity>

  {/* Profile */}
  <TouchableOpacity
    style={styles.quickCard}
    onPress={() => navigation.navigate('Profile')}
  >
    <Text style={styles.quickIcon}>👤</Text>
    <Text style={styles.quickTitle}>Profile</Text>
    <Text style={styles.quickDescription}>Your account</Text>
  </TouchableOpacity>
</View>

      <Text style={styles.sectionTitle}>Announcements</Text>

      <View style={styles.announcementCard}>
        <Text style={styles.announcementTitle}>
          📢 {isTeacher ? 'University Announcement' : 'Midterm Exam Schedule'}
        </Text>

        <Text style={styles.announcementText}>
          {isTeacher
            ? 'Stay updated with the latest university information.'
            : 'Check your schedule and prepare for your upcoming exams.'}
        </Text>
      </View>

      <View style={styles.bottomSpace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6FF',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    color: '#77738A',
    fontSize: 16,
  },
  name: {
    color: '#252238',
    fontSize: 28,
    fontWeight: '700',
    marginTop: 4,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6C4DE6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    color: '#77738A',
    fontSize: 14,
    marginHorizontal: 24,
    marginTop: 8,
    marginBottom: 24,
  },
  semesterCard: {
    backgroundColor: '#6C4DE6',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 22,
  },
  semesterLabel: {
    color: '#E4DCFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  semesterTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    marginTop: 12,
  },
  semesterDescription: {
    color: '#F0ECFF',
    fontSize: 13,
    marginTop: 8,
    lineHeight: 20,
  },
  sectionTitle: {
    color: '#252238',
    fontSize: 20,
    fontWeight: '700',
    marginHorizontal: 24,
    marginTop: 28,
    marginBottom: 14,
  },
  classCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEEBF5',
  },
  classIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#F0EBFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 24,
  },
  classInfo: {
    marginLeft: 14,
    flex: 1,
  },
  className: {
    color: '#252238',
    fontSize: 16,
    fontWeight: '700',
  },
  classTime: {
    color: '#77738A',
    fontSize: 13,
    marginTop: 6,
  },
  classLocation: {
    color: '#77738A',
    fontSize: 12,
    marginTop: 5,
  },
  quickAccess: {
    marginHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEEBF5',
  },
  quickIcon: {
    fontSize: 25,
    marginBottom: 12,
  },
  quickTitle: {
    color: '#252238',
    fontSize: 15,
    fontWeight: '700',
  },
  quickDescription: {
    color: '#77738A',
    fontSize: 12,
    marginTop: 5,
  },
  announcementCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#EEEBF5',
  },
  announcementTitle: {
    color: '#252238',
    fontSize: 15,
    fontWeight: '700',
  },
  announcementText: {
    color: '#77738A',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },
  bottomSpace: {
    height: 30,
  },
});