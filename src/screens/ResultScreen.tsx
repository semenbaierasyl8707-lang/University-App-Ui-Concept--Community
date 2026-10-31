import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ResultScreen() {
  const results = [
    { subject: 'Digital Marketing', grade: 'A', gpa: '4.0' },
    { subject: 'Software Engineering', grade: 'A-', gpa: '3.7' },
    { subject: 'Mobile App Development', grade: 'B+', gpa: '3.3' },
    { subject: 'Artificial Intelligence', grade: 'A', gpa: '4.0' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Academic Results</Text>
      
      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>3.75</Text>
          <Text style={styles.statLabel}>CGPA</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>48</Text>
          <Text style={styles.statLabel}>Earned Credits</Text>
        </View>
      </View>

      <Text style={styles.subHeader}>Semester Summary</Text>
      {results.map((res, idx) => (
        <View key={idx} style={styles.resultRow}>
          <Text style={styles.subject}>{res.subject}</Text>
          <View style={styles.gradeBox}>
            <Text style={styles.gradeText}>{res.grade}</Text>
            <Text style={styles.gpaText}>({res.gpa})</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', color: '#8B2072', marginBottom: 16 },
  statsCard: { backgroundColor: '#f3e5f5', padding: 16, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: 'bold', color: '#8B2072' },
  statLabel: { fontSize: 12, color: '#666' },
  subHeader: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  resultRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee', alignItems: 'center' },
  subject: { fontSize: 14, color: '#333' },
  gradeBox: { flexDirection: 'row', alignItems: 'center' },
  gradeText: { fontWeight: 'bold', color: '#8B2072', marginRight: 6 },
  gpaText: { fontSize: 12, color: '#888' },
});