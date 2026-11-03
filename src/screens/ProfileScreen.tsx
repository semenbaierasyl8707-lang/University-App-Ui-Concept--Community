
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

import SettingsScreen from './SettingsScreen';
import AchievementScreen from './Achievement';
import PrivacyScreen from './PrivacyScreen';

interface ProfileProps {
  onLogout: () => void;
}

interface StudentProfile {
  fullName: string;
  studentId: string;
  university: string;
  program: string;
  course: string;
  group: string;
  status: string;
  photo: string | null;
}

const DEFAULT_PROFILE: StudentProfile = {
  fullName: 'SEMENBAY YERASSYL NURZHANULY',
  studentId: '338776',
  university: 'Мұхамеджан Тынышбаев атындағы ALT UNIVERSITY',
  program: '6B06116 - Information Systems',
  course: '2',
  group: 'ИС-25-3к',
  status: 'Обучающийся',
  photo: null,
};

export default function ProfileScreen({ onLogout }: ProfileProps) {
  const [profile, setProfile] = useState<StudentProfile>(DEFAULT_PROFILE);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const [showSettings, setShowSettings] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedProfile = await AsyncStorage.getItem('studentProfile');

        if (savedProfile) {
          setProfile({
            ...DEFAULT_PROFILE,
            ...JSON.parse(savedProfile),
          });
        }
      } catch (error) {
        console.log('Error loading student profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const saveProfile = async () => {
    try {
      await AsyncStorage.setItem(
        'studentProfile',
        JSON.stringify(profile)
      );

      setEditing(false);
      Alert.alert('Success', 'Profile successfully saved!');
    } catch (error) {
      Alert.alert('Error', 'Could not save profile.');
    }
  };

  const choosePhoto = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          'Permission required',
          'Allow access to your photo library to choose a profile picture.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets.length > 0) {
        setProfile({
          ...profile,
          photo: result.assets[0].uri,
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Could not open photo library.');
    }
  };

  const updateField = (field: keyof StudentProfile, value: string) => {
    setProfile((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const showMessage = (title: string) => {
    Alert.alert(title, 'This feature will be available soon.');
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#7955E8" />
      </View>
    );
  }

  if (showSettings) {
    return (
      <SettingsScreen onBack={() => setShowSettings(false)} />
    );
  }

  if (showAchievements) {
    return (
      <AchievementScreen
        onBack={() => setShowAchievements(false)}
      />
    );
  }

  if (showPrivacy) {
    return (
      <PrivacyScreen onBack={() => setShowPrivacy(false)} />
    );
  }

  const initials = profile.fullName
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const renderField = (
    label: string,
    field: keyof StudentProfile
  ) => {
    const value = profile[field];

    if (field === 'photo') return null;

    return (
      <View style={styles.infoRow} key={field}>
        <Text style={styles.infoLabel}>{label}</Text>

        {editing ? (
          <TextInput
            style={styles.editInput}
            value={String(value)}
            onChangeText={(text) => updateField(field, text)}
            multiline={field === 'university' || field === 'program'}
          />
        ) : (
          <Text style={styles.infoValue}>{String(value)}</Text>
        )}
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.header}>My Profile</Text>

      <View style={styles.profileCard}>
        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={choosePhoto}
          activeOpacity={0.8}
        >
          {profile.photo ? (
            <Image
              source={{ uri: profile.photo }}
              style={styles.avatar}
            />
          ) : (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
          )}

          <View style={styles.cameraBadge}>
            <Text style={styles.cameraText}>+</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.name}>{profile.fullName}</Text>
        <Text style={styles.studentId}>
          Student ID: {profile.studentId}
        </Text>

        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>{profile.status}</Text>
        </View>

        <Text style={styles.photoHint}>
          Tap photo to change
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.sectionHeader}>
          <Text style={styles.cardTitle}>Student Information</Text>

          <TouchableOpacity
            onPress={() => {
              if (editing) {
                saveProfile();
              } else {
                setEditing(true);
              }
            }}
          >
            <Text style={styles.editButton}>
              {editing ? 'Save' : 'Edit Profile'}
            </Text>
          </TouchableOpacity>
        </View>

        {renderField('Full Name', 'fullName')}
        {renderField('Student ID', 'studentId')}
        {renderField('University', 'university')}
        {renderField('Educational Program', 'program')}
        {renderField('Course', 'course')}
        {renderField('Group', 'group')}
        {renderField('Status', 'status')}

        {editing && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              setProfile(DEFAULT_PROFILE);
              setEditing(false);
            }}
          >
            <Text style={styles.cancelText}>Cancel editing</Text>
          </TouchableOpacity>
        )}
      </View>

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
    backgroundColor: '#F8F6FF',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 35,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#242033',
    textAlign: 'center',
    marginBottom: 25,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
    alignItems: 'center',
    marginBottom: 22,
    borderWidth: 1,
    borderColor: '#E9E2FA',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#7955E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cameraBadge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#242033',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#242033',
    textAlign: 'center',
  },
  studentId: {
    fontSize: 13,
    color: '#858095',
    marginTop: 7,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F8ED',
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 7,
    marginTop: 13,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#24A35A',
    marginRight: 7,
  },
  statusText: {
    fontSize: 12,
    color: '#21864C',
    fontWeight: '600',
  },
  photoHint: {
    fontSize: 11,
    color: '#AAA4B8',
    marginTop: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: '#E9E2FA',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#242033',
    flex: 1,
  },
  editButton: {
    color: '#7955E8',
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EDF6',
  },
  infoLabel: {
    fontSize: 12,
    color: '#9993A8',
    marginBottom: 6,
  },
  infoValue: {
    fontSize: 14,
    color: '#242033',
    fontWeight: '600',
    lineHeight: 21,
  },
  editInput: {
    backgroundColor: '#F8F6FF',
    borderWidth: 1,
    borderColor: '#DCD2F5',
    borderRadius: 9,
    padding: 10,
    fontSize: 14,
    color: '#242033',
    minHeight: 42,
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: 13,
    marginTop: 8,
  },
  cancelText: {
    color: '#9993A8',
    fontWeight: '600',
  },
  dashboardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#242033',
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EDF6',
  },
  menuIcon: {
    fontSize: 19,
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#242033',
  },
  arrow: {
    fontSize: 25,
    color: '#AAA4B8',
  },
  logoutButton: {
    backgroundColor: '#7955E8',
    paddingVertical: 15,
    borderRadius: 13,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  version: {
    textAlign: 'center',
    fontSize: 11,
    color: '#AAA4B8',
    marginTop: 18,
  },
});

