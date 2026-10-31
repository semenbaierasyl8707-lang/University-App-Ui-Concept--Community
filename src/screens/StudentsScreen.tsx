import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
} from 'react-native';

const students = [
  { id: '1', name: 'Semenbay Yerassyl', email: 'yerassyl@gmail.com', group: '12-Р' },
  { id: '2', name: 'Abilgazy Daniyar', email: 'daniyar@gmail.com', group: '12-Р' },
  { id: '3', name: 'Sultan Beybarys', email: 'beybarys@gmail.com', group: '11-Р' },
  { id: '4', name: 'Zholdasbay Yerassyl', email: 'yerassyl@gmail.com', group: '10-Р' },
];

export default function StudentsScreen() {
  const [search, setSearch] = useState('');

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Students</Text>
      <Text style={styles.subtitle}>Manage your students</Text>

      <TextInput
        style={styles.search}
        placeholder="Search students..."
        value={search}
        onChangeText={setSearch}
      />

      <Text style={styles.count}>
        Total students: {filteredStudents.length}
      </Text>

      <FlatList
        data={filteredStudents}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {item.name.charAt(0)}
              </Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.email}>{item.email}</Text>
              <Text style={styles.group}>Group: {item.group}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No students found.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6FF',
    padding: 20,
    paddingTop: 55,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#25213D',
  },
  subtitle: {
    fontSize: 14,
    color: '#88839A',
    marginTop: 5,
    marginBottom: 25,
  },
  search: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 14,
    fontSize: 15,
    marginBottom: 20,
  },
  count: {
    fontSize: 15,
    fontWeight: '600',
    color: '#55506D',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E9E2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7655D9',
  },
  info: {
    marginLeft: 14,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#25213D',
  },
  email: {
    fontSize: 13,
    color: '#88839A',
    marginTop: 4,
  },
  group: {
    fontSize: 12,
    color: '#7655D9',
    marginTop: 5,
  },
  empty: {
    textAlign: 'center',
    color: '#88839A',
    marginTop: 30,
  },
});