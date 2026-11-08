import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import { Course, fetchCourses } from '../data/courses';

export default function CoursesScreen() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await fetchCourses();
      setCourses(data);
    } catch (err) {
      setError('Деректерді жүктеу мүмкін болмады.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Courses</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#6C4DE6" />
      ) : error ? (
        <View>
          <Text style={styles.error}>{error}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={loadCourses}
          >
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        courses.map((course) => (
          <View key={course.id} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.code}>POST #{course.id}</Text>
              <Text style={styles.credits}>API Data</Text>
            </View>

            <Text style={styles.courseTitle}>{course.title}</Text>
            <Text style={styles.teacher}>{course.body}</Text>
          </View>
        ))
      )}
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
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#6C4DE6',
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '700',
  },
});