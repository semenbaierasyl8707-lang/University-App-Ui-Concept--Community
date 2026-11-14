
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Course = {
  id: string;
  title: string;
  description: string;
  teacher: string;
  credits: string;
};

type Props = NativeStackScreenProps<any>;

export default function CourseDetailsScreen({ route, navigation }: Props) {
  const course: Course = route.params.course;

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>‹ Back to Courses</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.code}>{course.id}</Text>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.description}>{course.description}</Text>

        <View style={styles.divider} />

        <Text style={styles.label}>Department</Text>
        <Text style={styles.value}>{course.teacher}</Text>

        <Text style={styles.label}>Credits</Text>
        <Text style={styles.value}>{course.credits}</Text>

        <Text style={styles.label}>Course status</Text>
        <Text style={styles.status}>Active</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6FF',
    padding: 20,
  },
  back: {
    color: '#6C4DE6',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 35,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#EEEBF5',
  },
  code: {
    color: '#6C4DE6',
    fontWeight: '700',
    fontSize: 13,
  },
  title: {
    color: '#252238',
    fontSize: 25,
    fontWeight: '700',
    marginTop: 12,
  },
  description: {
    color: '#77738A',
    fontSize: 15,
    lineHeight: 23,
    marginTop: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEBF5',
    marginVertical: 22,
  },
  label: {
    color: '#9994AA',
    fontSize: 13,
    marginTop: 15,
  },
  value: {
    color: '#252238',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
  status: {
    color: '#26865B',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 5,
  },
});
