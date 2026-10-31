import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AchievementScreenProps {
  onBack: () => void;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  progress: number;
  goal: number;
  status: string;
}

export default function AchievementScreen({
  onBack,
}: AchievementScreenProps) {
  const [role, setRole] = useState('Student');
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('userProfile');

        if (savedUser) {
          const user = JSON.parse(savedUser);
          setRole(user.role || 'Student');
        }
      } catch (error) {
        console.log('Error loading user:', error);
      }
    };

    loadUser();
  }, []);

  const handleBack = () => {
    console.log('BACK BUTTON CLICKED');

    if (selectedAchievement) {
      setSelectedAchievement(null);
      return;
    }

    onBack();
    console.log('RETURNING TO PROFILE');
  };

  const studentAchievements: Achievement[] = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Complete your first learning activity.',
      icon: '🎯',
      progress: 0,
      goal: 1,
      status: 'In progress',
    },
    {
      id: 2,
      title: 'Perfect Attendance',
      description: 'Attend all classes during one week.',
      icon: '📅',
      progress: 0,
      goal: 5,
      status: 'In progress',
    },
    {
      id: 3,
      title: 'Top Student',
      description: 'Achieve excellent results in your studies.',
      icon: '🏆',
      progress: 0,
      goal: 10,
      status: 'In progress',
    },
    {
      id: 4,
      title: 'Knowledge Seeker',
      description: 'Complete 10 learning activities.',
      icon: '📚',
      progress: 0,
      goal: 10,
      status: 'In progress',
    },
  ];

  const teacherAchievements: Achievement[] = [
    {
      id: 1,
      title: 'First Lesson',
      description: 'Create and complete your first lesson.',
      icon: '🎓',
      progress: 0,
      goal: 1,
      status: 'In progress',
    },
    {
      id: 2,
      title: 'Student Support',
      description: 'Help students with their learning activities.',
      icon: '🤝',
      progress: 0,
      goal: 10,
      status: 'In progress',
    },
    {
      id: 3,
      title: 'Excellent Teacher',
      description: 'Receive positive feedback from students.',
      icon: '⭐',
      progress: 0,
      goal: 5,
      status: 'In progress',
    },
    {
      id: 4,
      title: 'Knowledge Creator',
      description: 'Create 10 educational materials.',
      icon: '📖',
      progress: 0,
      goal: 10,
      status: 'In progress',
    },
  ];

  const achievements =
    role.toLowerCase() === 'teacher'
      ? teacherAchievements
      : studentAchievements;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.5}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Achievements</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroIcon}>🏆</Text>

          <Text style={styles.heroTitle}>Your Achievements</Text>

          <Text style={styles.heroSubtitle}>
            Keep learning and reach new goals!
          </Text>

          <View style={styles.counter}>
            <Text style={styles.counterNumber}>
              0 / {achievements.length}
            </Text>

            <Text style={styles.counterLabel}>
              Achievements unlocked
            </Text>
          </View>
        </View>

        {/* Achievement list */}
        <Text style={styles.sectionTitle}>All Achievements</Text>

        {achievements.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => setSelectedAchievement(item)}
          >
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>{item.icon}</Text>
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>

              <Text style={styles.cardDescription}>
                {item.description}
              </Text>

              <View style={styles.progressBackground}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${Math.min(
                        (item.progress / item.goal) * 100,
                        100,
                      )}%`,
                    },
                  ]}
                />
              </View>

              <View style={styles.cardBottom}>
                <Text style={styles.progressText}>
                  {item.progress} / {item.goal}
                </Text>

                <Text style={styles.status}>{item.status}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Achievement details modal */}
      <Modal
        visible={selectedAchievement !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedAchievement(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedAchievement && (
              <>
                <Text style={styles.modalIcon}>
                  {selectedAchievement.icon}
                </Text>

                <Text style={styles.modalTitle}>
                  {selectedAchievement.title}
                </Text>

                <Text style={styles.modalDescription}>
                  {selectedAchievement.description}
                </Text>

                <View style={styles.modalProgress}>
                  <Text style={styles.modalProgressText}>
                    Progress: {selectedAchievement.progress} /{' '}
                    {selectedAchievement.goal}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.doneButton}
                  onPress={() => setSelectedAchievement(null)}
                >
                  <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6FF',
  },

header: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingTop: 20,
  paddingHorizontal: 20,
  paddingBottom: 15,
},

backButton: {
  paddingVertical: 12,
  paddingHorizontal: 10,
  marginTop: 10,
  zIndex: 10,
  elevation: 10,
},

  backText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#7357E8',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#25233A',
    marginLeft: 20,
  },

  scrollContent: {
    paddingBottom: 20,
  },

  hero: {
    backgroundColor: '#7357E8',
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 24,
    padding: 25,
    alignItems: 'center',
  },

  heroIcon: {
    fontSize: 48,
    marginBottom: 10,
  },

  heroTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },

  heroSubtitle: {
    color: '#E8E2FF',
    fontSize: 13,
    marginTop: 8,
  },

  counter: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginTop: 20,
    alignItems: 'center',
  },

  counterNumber: {
    color: '#7357E8',
    fontSize: 22,
    fontWeight: '800',
  },

  counterLabel: {
    color: '#77738A',
    fontSize: 12,
    marginTop: 3,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#25233A',
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 15,
  },

  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 14,
    padding: 16,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },

  iconContainer: {
    width: 55,
    height: 55,
    borderRadius: 16,
    backgroundColor: '#F0ECFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  icon: {
    fontSize: 27,
  },

  cardContent: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#25233A',
  },

  cardDescription: {
    fontSize: 12,
    color: '#89869A',
    marginTop: 5,
  },

  progressBackground: {
    height: 6,
    backgroundColor: '#EEEAF8',
    borderRadius: 10,
    marginTop: 12,
    overflow: 'hidden',
  },

  progressFill: {
    height: 6,
    backgroundColor: '#7357E8',
    borderRadius: 10,
  },

  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  progressText: {
    fontSize: 11,
    color: '#89869A',
  },

  status: {
    fontSize: 11,
    fontWeight: '700',
    color: '#E5A33B',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },

  modalContent: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 25,
    alignItems: 'center',
  },

  modalIcon: {
    fontSize: 55,
    marginBottom: 15,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#25233A',
    textAlign: 'center',
  },

  modalDescription: {
    fontSize: 14,
    color: '#89869A',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 21,
  },

  modalProgress: {
    backgroundColor: '#F0ECFF',
    padding: 13,
    borderRadius: 12,
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },

  modalProgressText: {
    color: '#7357E8',
    fontWeight: '700',
  },

  doneButton: {
    backgroundColor: '#7357E8',
    width: '100%',
    padding: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 20,
  },

  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});