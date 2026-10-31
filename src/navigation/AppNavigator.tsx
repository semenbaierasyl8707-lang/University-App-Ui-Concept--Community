import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  NavigationContainer,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import CoursesScreen from '../screens/CoursesScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import ResultScreen from '../screens/ResultScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen';
import StudentsScreen from '../screens/StudentsScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Courses: undefined;
  Schedule: undefined;
  Results: undefined;
  Students: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function TabIcon({ symbol }: { symbol: string }) {
  return <Text style={{ fontSize: 22, fontWeight: '600' }}>{symbol}</Text>;
}

function MainTabs() {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList>>();

  const [role, setRole] = useState<'Student' | 'Teacher' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRole = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('userProfile');

        if (savedUser) {
          const user = JSON.parse(savedUser);
          setRole(user.role === 'Teacher' ? 'Teacher' : 'Student');
        } else {
          setRole('Student');
        }
      } catch (error) {
        console.log('Error loading role:', error);
        setRole('Student');
      } finally {
        setLoading(false);
      }
    };

    loadRole();
  }, []);

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  if (loading || !role) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" color="#6C4DE6" />
      </View>
    );
  }

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6C4DE6',
        tabBarInactiveTintColor: '#9691A8',
        tabBarStyle: {
          height: 62,
          paddingTop: 6,
          paddingBottom: 6,
          backgroundColor: '#FFFFFF',
          borderTopColor: '#EAE6F2',
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Главная',
          tabBarIcon: () => <TabIcon symbol="⌂" />,
        }}
      />

      <Tab.Screen
        name="Courses"
        component={CoursesScreen}
        options={{
          tabBarLabel: 'Курсы',
          tabBarIcon: () => <TabIcon symbol="▤" />,
        }}
      />

      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          tabBarLabel: 'Расписание',
          tabBarIcon: () => <TabIcon symbol="▦" />,
        }}
      />

      {role === 'Student' ? (
        <Tab.Screen
          name="Results"
          component={ResultScreen}
          options={{
            tabBarLabel: 'Оценки',
            tabBarIcon: () => <TabIcon symbol="▥" />,
          }}
        />
      ) : (
        <Tab.Screen
          name="Students"
          component={StudentsScreen}
          options={{
            tabBarLabel: 'Студенты',
            tabBarIcon: () => <TabIcon symbol="♟" />,
          }}
        />
      )}

      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: 'Профиль',
          tabBarIcon: () => <TabIcon symbol="●" />,
        }}
      >
        {() => <ProfileScreen onLogout={handleLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
