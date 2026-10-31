import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';

interface PrivacyScreenProps {
  onBack: () => void;
}

export default function PrivacyScreen({ onBack }: PrivacyScreenProps) {
  const [profileVisible, setProfileVisible] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  const [dataProtection, setDataProtection] = useState(true);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onBack}
          style={styles.backButton}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Privacy</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>Privacy Settings</Text>

        <Text style={styles.description}>
          Manage your privacy and personal information.
        </Text>

        <View style={styles.card}>
          {/* Profile visibility */}
          <View style={styles.setting}>
            <View style={styles.textContainer}>
              <Text style={styles.settingTitle}>
                Profile visibility
              </Text>

              <Text style={styles.settingDescription}>
                Allow others to see your profile.
              </Text>
            </View>

            <Switch
              value={profileVisible}
              onValueChange={setProfileVisible}
            />
          </View>

          <View style={styles.divider} />

          {/* Show email */}
          <View style={styles.setting}>
            <View style={styles.textContainer}>
              <Text style={styles.settingTitle}>
                Show email
              </Text>

              <Text style={styles.settingDescription}>
                Allow your email to be visible.
              </Text>
            </View>

            <Switch
              value={showEmail}
              onValueChange={setShowEmail}
            />
          </View>

          <View style={styles.divider} />

          {/* Data protection */}
          <View style={styles.setting}>
            <View style={styles.textContainer}>
              <Text style={styles.settingTitle}>
                Data protection
              </Text>

              <Text style={styles.settingDescription}>
                Enable additional data protection.
              </Text>
            </View>

            <Switch
              value={dataProtection}
              onValueChange={setDataProtection}
            />
          </View>
        </View>

        {/* Privacy Policy */}
        <TouchableOpacity
          style={styles.policyButton}
          onPress={() =>
            Alert.alert(
              'Privacy Policy',
              'Your personal information should be handled securely and responsibly.'
            )
          }
        >
          <Text style={styles.policyText}>Privacy Policy</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </ScrollView>
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
    paddingTop: 35,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    padding: 10,
    marginRight: 15,
  },
  backText: {
    fontSize: 16,
    color: '#6C4AB6',
    fontWeight: '600',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#25213B',
  },
  content: {
    padding: 20,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#25213B',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#777386',
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    elevation: 3,
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#25213B',
  },
  settingDescription: {
    fontSize: 12,
    color: '#89869A',
    marginTop: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0EDF5',
  },
  policyButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
  },
  policyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#25213B',
  },
  arrow: {
    fontSize: 24,
    color: '#777386',
  },
});