import React, { useState } from 'react';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import CoursesScreen from './src/screens/CoursesScreen';
import ScheduleScreen from './src/screens/ScheduleScreen';
import ResultScreen from './src/screens/ResultScreen';
import ProfileScreen from './src/screens/ProfileScreen';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentTab, setCurrentTab] = useState<'home' | 'courses' | 'schedule' | 'result' | 'profile'>('home');

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div style={{ maxWidth: '420px', margin: '0 auto', height: '100vh', display: 'flex', flexDirection: 'column', border: '1px solid #ddd', fontFamily: 'sans-serif' }}>
      {/* Экран */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {currentTab === 'home' && <HomeScreen />}
        {currentTab === 'courses' && <CoursesScreen />}
        {currentTab === 'schedule' && <ScheduleScreen />}
        {currentTab === 'result' && <ResultScreen />}
        {currentTab === 'profile' && <ProfileScreen onLogout={() => setIsLoggedIn(false)} />}
      </div>

      {/* Нижняя навигационная панель */}
      <div style={{ display: 'flex', justifyContent: 'space-around', background: '#fff', borderTop: '1px solid #eee', padding: '10px 0' }}>
        <button onClick={() => setCurrentTab('home')} style={btnStyle(currentTab === 'home')}>Home</button>
        <button onClick={() => setCurrentTab('courses')} style={btnStyle(currentTab === 'courses')}>Courses</button>
        <button onClick={() => setCurrentTab('schedule')} style={btnStyle(currentTab === 'schedule')}>Schedule</button>
        <button onClick={() => setCurrentTab('result')} style={btnStyle(currentTab === 'result')}>Result</button>
        <button onClick={() => setCurrentTab('profile')} style={btnStyle(currentTab === 'profile')}>Profile</button>
      </div>
    </div>
  );
}

const btnStyle = (active: boolean) => ({
  background: 'none',
  border: 'none',
  fontSize: '11px',
  fontWeight: 'bold' as const,
  color: active ? '#8B2072' : '#888',
  cursor: 'pointer',
});