import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function CoursesScreen() {
  const courses = [
    { code: 'CS-301', title: 'Software Engineering', teacher: 'Dr. Ahmad Khan', credits: '3 Cr' },
    { code: 'CS-304', title: 'Mobile App Development', teacher: 'Prof. Sarah Ali', credits: '4 Cr' },
    { code: 'MKT-201', title: 'Digital Marketing', teacher: 'Mr. Usman Raza', credits: '3 Cr' },
    { code: 'AI-401', title: 'Artificial Intelligence', teacher: 'Dr. Bilal Malik', credits: '3 Cr' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Courses</Text>

      {courses.map((course) => (
        <View key={course.code} style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.code}>{course.code}</Text>
            <Text style={styles.credits}>{course.credits}</Text>
          </View>

          <Text style={styles.courseTitle}>{course.title}</Text>
          <Text style={styles.teacher}>{course.teacher}</Text>
        </View>
      ))}
    </ScrollView>
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
    marginBottom: 20,
    marginTop: 35,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEEBF5',
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  code: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6C4DE6',
  },
  credits: {
    fontSize: 12,
    backgroundColor: '#F0EBFF',
    color: '#6C4DE6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  courseTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#252238',
    marginTop: 12,
  },
  teacher: {
    fontSize: 13,
    color: '#77738A',
    marginTop: 6,
  },
});
