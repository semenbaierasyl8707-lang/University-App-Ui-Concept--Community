import React, { useState, useEffect } from 'react';
import {
View,
Text,
TextInput,
StyleSheet,
Alert,
TouchableOpacity,
ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';

import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import colors from '../theme/colors';
import ForgotPasswordScreen from './ForgotPasswordScreen';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [showPassword, setShowPassword] = useState(false);
const [biometricEnabled, setBiometricEnabled] = useState(false);
const [showForgotPassword, setShowForgotPassword] = useState(false);

useEffect(() => {
const loadBiometricSettings = async () => {
try {
const saved = await AsyncStorage.getItem('appSettings');


    if (saved) {
      const settings = JSON.parse(saved);
      setBiometricEnabled(settings.biometricEnabled ?? false);
    }
  } catch (error) {
    console.log('Error loading biometric settings:', error);
  }
};

loadBiometricSettings();


}, []);

if (showForgotPassword) {
return (
<ForgotPasswordScreen
onBack={() => setShowForgotPassword(false)}
/>
);
}

const handleLogin = () => {
if (!email.trim() || !password.trim()) {
Alert.alert('Error', 'Please enter your email and password.');
return;
}


navigation.replace('Main');


};

const handleBiometricLogin = async () => {
try {
const saved = await AsyncStorage.getItem('appSettings');
const settings = saved ? JSON.parse(saved) : {};


  if (!settings.biometricEnabled) {
    Alert.alert(
      'Face ID disabled',
      'Please enable Face ID in Settings first.',
    );
    setBiometricEnabled(false);
    return;
  }

  const hasHardware =
    await LocalAuthentication.hasHardwareAsync();

  if (!hasHardware) {
    Alert.alert(
      'Not supported',
      'Your device does not support biometric authentication.',
    );
    return;
  }

  const isEnrolled =
    await LocalAuthentication.isEnrolledAsync();

  if (!isEnrolled) {
    Alert.alert(
      'Biometrics not configured',
      'Please configure Face ID or fingerprint in your device settings.',
    );
    return;
  }

  const result =
    await LocalAuthentication.authenticateAsync({
      promptMessage: 'Sign in to UniversityApp',
      cancelLabel: 'Cancel',
      disableDeviceFallback: false,
    });

  if (result.success) {
    navigation.replace('Main');
  }
} catch (error) {
  console.log('Biometric login error:', error);

  Alert.alert(
    'Error',
    'Biometric authentication failed.',
  );
}


};

return (
  <ScrollView
    contentContainerStyle={styles.container}
    keyboardShouldPersistTaps="handled"
  >
    <View style={styles.logo}>
      <Text style={styles.logoText}>U</Text>
    </View>

    <Text style={styles.appName}>UniversityApp</Text>

    <Text style={styles.tagline}>
      Your education, your future.
    </Text>

    <View style={styles.form}>
      <Text style={styles.title}>Welcome back!</Text>

      <Text style={styles.subtitle}>
        Sign in to continue your learning journey.
      </Text>

      <Text style={styles.label}>Email address</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#949494"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <CustomInput
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={styles.showPassword}
        onPress={() => setShowPassword(!showPassword)}
      >
        <Text style={styles.linkText}>
          {showPassword ? 'Hide password' : 'Show password'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => setShowForgotPassword(true)}
      >
        <Text style={styles.forgotText}>
          Forgot password?
        </Text>
      </TouchableOpacity>

      <CustomButton
        title="Sign In"
        onPress={handleLogin}
      />

      {biometricEnabled && (
        <TouchableOpacity
          style={styles.biometricButton}
          onPress={handleBiometricLogin}
          activeOpacity={0.7}
        >
          <Text style={styles.biometricIcon}>🔐</Text>
          <Text style={styles.biometricText}>
            Sign in with Face ID
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.googleButton}
        onPress={() =>
          Alert.alert(
            'Google Sign-In',
            'Google authentication will be connected with Firebase.',
          )
        }
      >
        <Text style={styles.googleText}>G</Text>
        <Text style={styles.googleButtonText}>
          Continue with Google
        </Text>
      </TouchableOpacity>

      <View style={styles.signupRow}>
        <Text style={styles.signupText}>
          Don't have an account?{' '}
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.forgotText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ScrollView>
);
}

const styles = StyleSheet.create({
container: {
flexGrow: 1,
justifyContent: 'center',
paddingHorizontal: 26,
paddingTop: 40,
paddingBottom: 30,
backgroundColor: '#FFFFFF',
},
logo: {
width: 64,
height: 64,
borderRadius: 18,
backgroundColor: colors.primary,
alignItems: 'center',
justifyContent: 'center',
alignSelf: 'center',
marginBottom: 12,
},
logoText: {
color: '#FFFFFF',
fontSize: 36,
fontWeight: '700',
},
appName: {
color: colors.text,
fontSize: 25,
fontWeight: '700',
textAlign: 'center',
},
tagline: {
color: colors.secondary,
fontSize: 14,
textAlign: 'center',
marginTop: 6,
marginBottom: 42,
},
form: {
width: '100%',
},
title: {
fontSize: 28,
fontWeight: '700',
color: '#000000',
marginBottom: 6,
},
subtitle: {
fontSize: 15,
color: '#949494',
lineHeight: 22,
marginBottom: 24,
},
label: {
marginBottom: 8,
fontSize: 14,
color: '#333333',
fontWeight: '500',
},
input: {
height: 52,
borderWidth: 1,
borderColor: '#D8D8D8',
borderRadius: 10,
paddingHorizontal: 14,
color: '#222222',
fontSize: 15,
backgroundColor: '#FFFFFF',
marginBottom: 18,
},
showPassword: {
alignSelf: 'flex-end',
marginTop: -12,
marginBottom: 14,
paddingVertical: 4,
},
linkText: {
color: colors.secondary,
fontSize: 13,
},
forgotButton: {
alignSelf: 'flex-end',
marginBottom: 16,
},
forgotText: {
color: colors.primary,
fontSize: 14,
fontWeight: '600',
},
biometricButton: {
height: 52,
borderWidth: 1,
borderColor: colors.primary,
borderRadius: 10,
marginTop: 14,
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'center',
},
biometricIcon: {
fontSize: 19,
marginRight: 10,
},
biometricText: {
color: colors.primary,
fontSize: 14,
fontWeight: '600',
},
googleButton: {
height: 52,
borderWidth: 1,
borderColor: '#D8D8D8',
borderRadius: 10,
marginTop: 14,
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'center',
},
googleText: {
fontSize: 19,
fontWeight: '700',
color: '#4285F4',
marginRight: 10,
},
googleButtonText: {
color: '#333333',
fontSize: 14,
fontWeight: '600',
},
signupRow: {
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center',
marginTop: 22,
},
signupText: {
color: colors.secondary,
fontSize: 14,
},
});
