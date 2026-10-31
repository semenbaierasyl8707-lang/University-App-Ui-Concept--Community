import React, { useEffect, useState } from 'react';
import {
View,
Text,
StyleSheet,
Switch,
TouchableOpacity,
ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import PrivacyScreen from './PrivacyScreen';

interface SettingsScreenProps {
onBack: () => void;
}

export default function SettingsScreen({ onBack }: SettingsScreenProps) {
const [notifications, setNotifications] = useState(true);
const [darkMode, setDarkMode] = useState(false);
const [loading, setLoading] = useState(true);
const [showPrivacy, setShowPrivacy] = useState(false);

useEffect(() => {
const loadSettings = async () => {
try {
const saved = await AsyncStorage.getItem('appSettings');


    if (saved) {
      const settings = JSON.parse(saved);
      setNotifications(settings.notifications ?? true);
      setDarkMode(settings.darkMode ?? false);
    }
  } catch (error) {
    console.log('Error loading settings:', error);
  } finally {
    setLoading(false);
  }
};

loadSettings();


}, []);

const saveSettings = async (
newNotifications: boolean,
newDarkMode: boolean,
) => {
try {
await AsyncStorage.setItem(
'appSettings',
JSON.stringify({
notifications: newNotifications,
darkMode: newDarkMode,
}),
);
} catch (error) {
console.log('Error saving settings:', error);
}
};

const toggleNotifications = (value: boolean) => {
setNotifications(value);
saveSettings(value, darkMode);
};

const toggleDarkMode = (value: boolean) => {
setDarkMode(value);
saveSettings(notifications, value);
};

if (loading) {
return ( <View style={styles.loader}> <ActivityIndicator size="large" color="#B52B91" /> </View>
);
}

// Privacy screen
if (showPrivacy) {
return (
<PrivacyScreen
onBack={() => setShowPrivacy(false)}
/>
);
}

return (
<View
style={[
styles.container,
darkMode && styles.darkContainer,
]}
> <TouchableOpacity onPress={onBack} style={styles.backButton}> <Text style={styles.backText}>‹ Back</Text> </TouchableOpacity>


  <Text style={[styles.title, darkMode && styles.darkText]}>
    Settings
  </Text>

  <Text style={[styles.subtitle, darkMode && styles.darkSubtitle]}>
    Customize your application
  </Text>

  <View style={[styles.card, darkMode && styles.darkCard]}>
    <View style={styles.settingItem}>
      <View style={styles.settingInfo}>
        <Text style={styles.icon}>🔔</Text>
        <View>
          <Text style={[styles.settingTitle, darkMode && styles.darkText]}>
            Notifications
          </Text>
          <Text style={styles.description}>
            Notification preference
          </Text>
        </View>
      </View>

      <Switch
        value={notifications}
        onValueChange={toggleNotifications}
        trackColor={{ false: '#CCCCCC', true: '#D98AC5' }}
        thumbColor={notifications ? '#B52B91' : '#F4F3F4'}
      />
    </View>

    <View style={styles.divider} />

    <View style={styles.settingItem}>
      <View style={styles.settingInfo}>
        <Text style={styles.icon}>🌙</Text>
        <View>
          <Text style={[styles.settingTitle, darkMode && styles.darkText]}>
            Dark Mode
          </Text>
          <Text style={styles.description}>
            Change application appearance
          </Text>
        </View>
      </View>

      <Switch
        value={darkMode}
        onValueChange={toggleDarkMode}
        trackColor={{ false: '#CCCCCC', true: '#D98AC5' }}
        thumbColor={darkMode ? '#B52B91' : '#F4F3F4'}
      />
    </View>
  </View>

  {/* Privacy button */}
  <TouchableOpacity
    style={[styles.privacyButton, darkMode && styles.darkCard]}
    onPress={() => setShowPrivacy(true)}
    activeOpacity={0.7}
  >
    <View style={styles.settingInfo}>
      <Text style={styles.icon}>🛡️</Text>
      <View>
        <Text style={[styles.settingTitle, darkMode && styles.darkText]}>
          Privacy
        </Text>
        <Text style={styles.description}>
          Manage your privacy settings
        </Text>
      </View>
    </View>

    <Text style={styles.arrow}>›</Text>
  </TouchableOpacity>

  <Text style={styles.footer}>
    UniversityApp • Settings
  </Text>
</View>


);
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#FFFFFF',
padding: 22,
paddingTop: 55,
},
darkContainer: {
backgroundColor: '#211D2B',
},
loader: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
},
backButton: {
marginBottom: 25,
},
backText: {
color: '#B52B91',
fontSize: 17,
fontWeight: '600',
},
title: {
fontSize: 28,
fontWeight: '700',
color: '#222222',
},
subtitle: {
color: '#999999',
fontSize: 14,
marginTop: 6,
marginBottom: 25,
},
card: {
backgroundColor: '#F7F5FF',
borderRadius: 14,
borderWidth: 1,
borderColor: '#C65AAE',
paddingHorizontal: 16,
},
darkCard: {
backgroundColor: '#332D40',
borderColor: '#805477',
},
settingItem: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
paddingVertical: 20,
},
settingInfo: {
flexDirection: 'row',
alignItems: 'center',
},
icon: {
fontSize: 23,
marginRight: 13,
},
settingTitle: {
fontSize: 15,
fontWeight: '600',
color: '#222222',
},
darkText: {
color: '#FFFFFF',
},
description: {
fontSize: 11,
color: '#999999',
marginTop: 4,
},
darkSubtitle: {
color: '#B9B1C5',
},
divider: {
height: 1,
backgroundColor: '#E5DFEB',
},
privacyButton: {
backgroundColor: '#F7F5FF',
borderRadius: 14,
borderWidth: 1,
borderColor: '#C65AAE',
padding: 18,
marginTop: 18,
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'space-between',
},
arrow: {
fontSize: 25,
color: '#B52B91',
},
footer: {
textAlign: 'center',
color: '#AAAAAA',
fontSize: 11,
marginTop: 25,
},
});
