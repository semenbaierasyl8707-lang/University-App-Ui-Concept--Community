
import React from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

const courses = [
  {
    id: 'CS101',
    title: 'Programming Fundamentals',
    description: 'Бағдарламалаудың негізгі ұғымдары, алгоритмдер және JavaScript.',
    teacher: 'Computer Science',
    credits: '5 Credits',
  },
  {
    id: 'CS102',
    title: 'Database Systems',
    description: 'SQL, деректер базасын құру, кестелер және сұраныстар.',
    teacher: 'Computer Science',
    credits: '5 Credits',
  },
  {
    id: 'CS103',
    title: 'Web Development',
    description: 'HTML, CSS, JavaScript және веб-қосымшаларды әзірлеу.',
    teacher: 'Web Technologies',
    credits: '5 Credits',
  },
  {
    id: 'CS104',
    title: 'Mobile App Development',
    description: 'React Native және Expo арқылы мобильді қосымшалар жасау.',
    teacher: 'Software Development',
    credits: '5 Credits',
  },
  {
    id: 'CS105',
    title: 'Mathematics',
    description: 'Жоғары математика және есептерді шешу әдістері.',
    teacher: 'Mathematics',
    credits: '4 Credits',
  },
  {
    id: 'CS106',
    title: 'Information Systems',
    description: 'Ақпараттық жүйелердің құрылымы және жұмыс істеу принциптері.',
    teacher: 'Information Technology',
    credits: '5 Credits',
  },
];

export default function CoursesScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Courses</Text>
      <Text style={styles.subtitle}>
        Your current study subjects
      </Text>

      {courses.map((course) => (
        <TouchableOpacity
          key={course.id}
          style={styles.card}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('CourseDetails', { course })
          }
        >
          <ViewRow course={course} />

          <Text style={styles.courseTitle}>
            {course.title}
          </Text>

          <Text style={styles.description}>
            {course.description}
          </Text>

          <Text style={styles.teacher}>
            Department: {course.teacher}
          </Text>

          <Text style={styles.openText}>
            View course details →
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function ViewRow({ course }: { course: (typeof courses)[number] }) {
  return (
    <Text style={styles.code}>
      {course.id}  ·  {course.credits}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6FF',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#252238',
    marginTop: 35,
  },
  subtitle: {
    fontSize: 14,
    color: '#77738A',
    marginTop: 6,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEEBF5',
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
  },
  code: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6C4DE6',
  },
  courseTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#252238',
    marginTop: 12,
  },
  description: {
    fontSize: 13,
    color: '#77738A',
    lineHeight: 20,
    marginTop: 7,
  },
  teacher: {
    fontSize: 12,
    color: '#9994AA',
    marginTop: 12,
  },
  openText: {
    color: '#6C4DE6',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 14,
  },
});
