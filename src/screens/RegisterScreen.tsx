import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import colors from '../theme/colors';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'Student' | 'Teacher'>('Student');


const handleRegister = async () => {
  if (
    !firstName.trim() ||
    !lastName.trim() ||
    !email.trim() ||
    !password ||
    !confirmPassword
  ) {
    Alert.alert('Error', 'Please fill in all fields.');
    return;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    Alert.alert('Error', 'Please enter a valid email.');
    return;
  }

  if (password.length < 6) {
    Alert.alert('Error', 'Password must contain at least 6 characters.');
    return;
  }

  if (password !== confirmPassword) {
    Alert.alert('Error', 'Passwords do not match!');
    return;
  }

  try {
    const userProfile = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      role: role,
    };

    await AsyncStorage.setItem(
      'userProfile',
      JSON.stringify(userProfile)
    );

    Alert.alert('Success', 'Registration completed!');
    navigation.replace('Main');
  } catch (error) {
    Alert.alert('Error', 'Could not save your profile.');
    console.log(error);
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
      <Text style={styles.tagline}>Your education, your future.</Text>

      <View style={styles.form}>
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>
          Join us and start your learning journey.
        </Text>

        <Text style={styles.label}>First name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your first name"
          placeholderTextColor="#949494"
          value={firstName}
          onChangeText={setFirstName}
        />

        <Text style={styles.label}>Last name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your last name"
          placeholderTextColor="#949494"
          value={lastName}
          onChangeText={setLastName}
        />

<Text style={styles.label}>I am a:</Text>

<View style={styles.roleContainer}>
  <TouchableOpacity
    style={[
      styles.roleButton,
      role === 'Student' && styles.roleButtonActive,
    ]}
    onPress={() => setRole('Student')}
  >
    <Text style={styles.roleText}>Student</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[
      styles.roleButton,
      role === 'Teacher' && styles.roleButtonActive,
    ]}
    onPress={() => setRole('Teacher')}
  >
    <Text style={styles.roleText}>Teacher</Text>
  </TouchableOpacity>
</View>

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
          placeholder="Create a password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
        />

        <CustomInput
          label="Confirm password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.showPassword}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Text style={styles.linkText}>
            {showPassword ? 'Hide passwords' : 'Show passwords'}
          </Text>
        </TouchableOpacity>

        <CustomButton title="Create Account" onPress={handleRegister} />

        <TouchableOpacity
          style={styles.googleButton}
          onPress={() =>
            Alert.alert(
              'Google Sign-In',
              'Google authentication will be connected with Firebase.'
            )
          }
        >
          <Text style={styles.googleText}>G</Text>
          <Text style={styles.googleButtonText}>Sign up with Google</Text>
        </TouchableOpacity>

        <View style={styles.signupRow}>
          <Text style={styles.signupText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.forgotText}>Sign In</Text>
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
    marginBottom: 30,
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
    marginBottom: 22,
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
    marginBottom: 16,
  },
  showPassword: {
    alignSelf: 'flex-end',
    marginTop: -8,
    marginBottom: 16,
  },
  linkText: {
    color: colors.secondary,
    fontSize: 13,
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
    flexWrap: 'wrap',
    marginTop: 22,
  },
  signupText: {
    color: colors.secondary,
    fontSize: 14,
  },
  forgotText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
roleContainer: {
  flexDirection: 'row',
  gap: 12,
  marginBottom: 18,
},

roleButton: {
  flex: 1,
  padding: 14,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#D8D8D8',
  backgroundColor: '#FFFFFF',
  alignItems: 'center',
},

roleButtonActive: {
  borderColor: colors.primary,
  backgroundColor: '#F1EDFF',
},

roleText: {
  color: colors.text,
  fontWeight: '600',
},});