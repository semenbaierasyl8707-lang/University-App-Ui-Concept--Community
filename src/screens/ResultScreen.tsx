
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

const results = [
  {
    subject: 'Digital Marketing',
    code: 'DM101',
    grade: 'A',
    gpa: '4.0',
    credits: 5,
    score: 95,
  },
  {
    subject: 'Software Engineering',
    code: 'SE102',
    grade: 'A-',
    gpa: '3.7',
    credits: 5,
    score: 90,
  },
  {
    subject: 'Mobile App Development',
    code: 'MA103',
    grade: 'B+',
    gpa: '3.3',
    credits: 5,
    score: 87,
  },
  {
    subject: 'Artificial Intelligence',
    code: 'AI104',
    grade: 'A',
    gpa: '4.0',
    credits: 5,
    score: 96,
  },
];

export default function ResultScreen() {
  const average =
    results.reduce((sum, item) => sum + item.score, 0) /
    results.length;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Academic Results</Text>
      <Text style={styles.subtitle}>
        Your academic performance
      </Text>

      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>3.75</Text>
          <Text style={styles.statLabel}>GPA</Text>
        </View>

        <View style={styles.verticalLine} />

        <View style={styles.statItem}>
          <Text style={styles.statValue}>20</Text>
          <Text style={styles.statLabel}>Credits</Text>
        </View>

        <View style={styles.verticalLine} />

        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {Math.round(average)}%
          </Text>
          <Text style={styles.statLabel}>Average</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        Semester Summary
      </Text>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>
          Current Semester
        </Text>
        <Text style={styles.summaryDescription}>
          Your grades by subject
        </Text>
      </View>

      {results.map((item) => (
        <View key={item.code} style={styles.resultCard}>
          <View style={styles.resultTop}>
            <View style={styles.subjectInfo}>
              <Text style={styles.code}>{item.code}</Text>
              <Text style={styles.subject}>
                {item.subject}
              </Text>
            </View>

            <View style={styles.gradeBox}>
              <Text style={styles.gradeText}>
                {item.grade}
              </Text>
              <Text style={styles.gpaText}>
                GPA {item.gpa}
              </Text>
            </View>
          </View>

          <View style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>
              Exam score
            </Text>
            <Text style={styles.scoreValue}>
              {item.score}%
            </Text>
          </View>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                { width: `${item.score}%` },
              ]}
            />
          </View>

          <Text style={styles.credits}>
            {item.credits} Credits
          </Text>
        </View>
      ))}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Academic performance overview
        </Text>
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
  header: {
    fontSize: 26,
    fontWeight: '700',
    color: '#252238',
    marginTop: 35,
  },
  subtitle: {
    fontSize: 14,
    color: '#77738A',
    marginTop: 6,
    marginBottom: 22,
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEEBF5',
    marginBottom: 28,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 23,
    fontWeight: '700',
    color: '#6C4DE6',
  },
  statLabel: {
    fontSize: 12,
    color: '#77738A',
    marginTop: 5,
  },
  verticalLine: {
    width: 1,
    height: 38,
    backgroundColor: '#EEEBF5',
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#252238',
    marginBottom: 14,
  },
  summaryCard: {
    backgroundColor: '#6C4DE6',
    borderRadius: 16,
    padding: 18,
    marginBottom: 15,
  },
  summaryTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  summaryDescription: {
    color: '#E6DEFF',
    fontSize: 13,
    marginTop: 5,
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    padding: 17,
    borderRadius: 15,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: '#EEEBF5',
  },
  resultTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subjectInfo: {
    flex: 1,
    paddingRight: 10,
  },
  code: {
    color: '#6C4DE6',
    fontSize: 11,
    fontWeight: '700',
  },
  subject: {
    color: '#252238',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 6,
  },
  gradeBox: {
    backgroundColor: '#F0EBFF',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    minWidth: 65,
  },
  gradeText: {
    color: '#6C4DE6',
    fontSize: 19,
    fontWeight: '700',
  },
  gpaText: {
    color: '#77738A',
    fontSize: 10,
    marginTop: 3,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 17,
    marginBottom: 8,
  },
  scoreLabel: {
    color: '#77738A',
    fontSize: 12,
  },
  scoreValue: {
    color: '#252238',
    fontSize: 12,
    fontWeight: '700',
  },
  progressBackground: {
    height: 7,
    backgroundColor: '#F0EBFF',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: 7,
    backgroundColor: '#6C4DE6',
    borderRadius: 10,
  },
  credits: {
    color: '#9994AA',
    fontSize: 11,
    marginTop: 10,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#9994AA',
    fontSize: 12,
  },
});
