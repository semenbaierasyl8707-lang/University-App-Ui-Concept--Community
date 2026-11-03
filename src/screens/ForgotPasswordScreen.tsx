import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

type Props = {
  onBack: () => void;
};

const ForgotPasswordScreen: React.FC<Props> = ({ onBack }) => {
  const [email, setEmail] = useState('');

  const handleReset = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }

    if (!emailRegex.test(email.trim())) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    Alert.alert(
      'Success!',
      'If this email is registered, you will receive a password reset link.',
      [{ text: 'OK', onPress: onBack }]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity
          onPress={onBack}
          style={styles.backButton}
        >
          <Text style={styles.backText}>← Back to Login</Text>
        </TouchableOpacity>

        <View style={styles.logo}>
          <Text style={styles.logoText}>U</Text>
        </View>

        <Text style={styles.title}>Forgot Password?</Text>

        <Text style={styles.subtitle}>
          Don't worry! Enter your email address and we'll help you reset your password.
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Email Address</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleReset}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Send Reset Link</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>
          Learn today. Lead tomorrow.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6FF',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingVertical: 30,
  },
  backButton: {
    position: 'absolute',
    top: 45,
    left: 25,
  },
  backText: {
    color: '#7955E8',
    fontSize: 16,
    fontWeight: '600',
  },
  logo: {
    width: 65,
    height: 65,
    borderRadius: 18,
    backgroundColor: '#7955E8',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 25,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#242033',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: '#777386',
    textAlign: 'center',
    lineHeight: 23,
    marginBottom: 35,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 9,
  },
  input: {
    height: 55,
    borderWidth: 1,
    borderColor: '#E4DFF0',
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    fontSize: 15,
    color: '#242033',
    marginBottom: 20,
  },
  button: {
    height: 55,
    backgroundColor: '#7955E8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    textAlign: 'center',
    color: '#999',
    fontSize: 13,
    marginTop: 45,
  },
});

export default ForgotPasswordScreen;