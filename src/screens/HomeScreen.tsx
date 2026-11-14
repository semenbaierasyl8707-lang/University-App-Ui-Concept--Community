
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from '../navigation/AppNavigator';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  role: 'Student' | 'Teacher';
}

interface NewsPost {
  id: number;
  date: string;
  link: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: {
      source_url: string;
    }[];
  };
}

export default function HomeScreen() {
  const navigation =
    useNavigation<BottomTabNavigationProp<MainTabParamList>>();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [news, setNews] = useState<NewsPost[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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

  useEffect(() => {
    const loadNews = async () => {
      try {
        const response = await fetch(
          'https://alt.edu.kz/wp-json/wp/v2/posts?per_page=5&_embed'
        );

        if (!response.ok) {
          throw new Error('Failed to load news');
        }

        const data: NewsPost[] = await response.json();
        setNews(data);
      } catch (error) {
        console.log('Error loading news:', error);
      } finally {
        setNewsLoading(false);
      }
    };

    loadNews();
  }, []);
  const onRefresh = async () => {
  setRefreshing(true);

  try {
    const response = await fetch(
      'https://alt.edu.kz/wp-json/wp/v2/posts?per_page=5&_embed'
    );

    if (!response.ok) {
      throw new Error('Failed to refresh news');
    }

    const data: NewsPost[] = await response.json();
    setNews(data);
  } catch (error) {
    console.log('Error refreshing news:', error);
  } finally {
    setRefreshing(false);
  }
};

  const isTeacher = user?.role === 'Teacher';

  const cleanText = (value: string) =>
    value
      .replace(/<[^>]*>/g, '')
      .replace(/&#8217;/g, "'")
      .replace(/&#8220;|&#8221;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&#8230;/g, '...')
      .replace(/&nbsp;/g, ' ')
      .trim();

  return (
    <ScrollView
  style={styles.container}
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor="#6C4DE6"
      colors={['#6C4DE6']}
    />
  }
>
      {/* Header */}
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

      <Text style={styles.subtitle}>Your Dashboard</Text>

      {/* Semester */}
      <View style={styles.semesterCard}>
        <Text style={styles.semesterLabel}>CURRENT SEMESTER</Text>
        <Text style={styles.semesterTitle}>Fall Semester 2026</Text>
        <Text style={styles.semesterDescription}>
          Welcome to your academic dashboard. Stay updated with your
          courses, schedule and university information.
        </Text>
      </View>

      {/* Session Schedule */}
      <Text style={styles.sectionTitle}>Session Schedule</Text>

      <View style={styles.sessionCard}>
        <View style={styles.sessionHeader}>
          <Text style={styles.sessionIcon}>📅</Text>
          <View>
            <Text style={styles.sessionTitle}>
              Academic Calendar 2026–2027
            </Text>
            <Text style={styles.sessionSubtitle}>
              Important examination dates
            </Text>
          </View>
        </View>

        <View style={styles.sessionDivider} />

        <View style={styles.sessionRow}>
          <View>
            <Text style={styles.sessionName}>Winter Session</Text>
            <Text style={styles.sessionDescription}>
              Fall semester examinations
            </Text>
          </View>
          <Text style={styles.sessionDate}>To be announced</Text>
        </View>

        <View style={styles.sessionDivider} />

        <View style={styles.sessionRow}>
          <View>
            <Text style={styles.sessionName}>Summer Session</Text>
            <Text style={styles.sessionDescription}>
              Spring semester examinations
            </Text>
          </View>
          <Text style={styles.sessionDate}>To be announced</Text>
        </View>

        <View style={styles.sessionDivider} />

        <View style={styles.sessionRow}>
          <View>
            <Text style={styles.sessionName}>Exam Timetable</Text>
            <Text style={styles.sessionDescription}>
              Publication of examination schedule
            </Text>
          </View>
          <Text style={styles.sessionDate}>To be announced</Text>
        </View>
      </View>

      {/* University News */}
      <Text style={styles.sectionTitle}>University News</Text>

      {newsLoading ? (
        <Text style={styles.newsDescription}>Loading news...</Text>
      ) : news.length > 0 ? (
        news.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.newsCard}
            onPress={() => Linking.openURL(item.link)}
          >
          {item._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
  <Image
    source={{
      uri: item._embedded['wp:featuredmedia'][0].source_url,
    }}
    style={styles.newsImage}
    resizeMode="cover"
  />
) : null}
            <Text style={styles.newsDate}>
              {new Date(item.date).toLocaleDateString()}
            </Text>

            <Text style={styles.newsTitle}>
              {cleanText(item.title.rendered)}
            </Text>

            <Text style={styles.newsDescription}>
              {cleanText(item.excerpt.rendered)}
            </Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.newsDescription}>
          News are temporarily unavailable.
        </Text>
      )}

      {/* Next Class */}
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

      {/* Quick Access */}
      <Text style={styles.sectionTitle}>Quick Access</Text>

      <View style={styles.quickAccess}>
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

        <TouchableOpacity
          style={styles.quickCard}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.quickIcon}>👤</Text>
          <Text style={styles.quickTitle}>Profile</Text>
          <Text style={styles.quickDescription}>Your account</Text>
        </TouchableOpacity>
      </View>

      {/* Announcements */}
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
  sessionCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#EEEBF5',
  },
  sessionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sessionIcon: {
    fontSize: 30,
    marginRight: 12,
  },
  sessionTitle: {
    color: '#252238',
    fontSize: 16,
    fontWeight: '700',
  },
  sessionSubtitle: {
    color: '#77738A',
    fontSize: 12,
    marginTop: 4,
  },
  sessionDivider: {
    height: 1,
    backgroundColor: '#EEEBF5',
    marginVertical: 14,
  },
  sessionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sessionName: {
    color: '#252238',
    fontSize: 14,
    fontWeight: '700',
  },
  sessionDescription: {
    color: '#77738A',
    fontSize: 11,
    marginTop: 4,
  },
  sessionDate: {
    color: '#6C4DE6',
    fontSize: 11,
    fontWeight: '700',
    maxWidth: 105,
    textAlign: 'right',
  },
  newsImage: {
  width: '100%',
  height: 180,
  borderRadius: 12,
  marginBottom: 12,
  },
  newsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#EEEBF5',
  },
  newsDate: {
    color: '#9994AA',
    fontSize: 11,
  },
  newsTitle: {
    color: '#252238',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 12,
  },
  newsDescription: {
    color: '#77738A',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 7,
    marginHorizontal: 20,
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
