import React from 'react';

export default function HomeScreen() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#8B2072' }}>Welcome, Student!</h2>
      <p style={{ color: '#666', marginTop: '-10px' }}>Spring Semester 2026</p>
      
      <div style={{ background: '#8B2072', color: '#fff', padding: '16px', borderRadius: '12px', marginBottom: '20px' }}>
        <span style={{ fontSize: '12px', opacity: 0.8 }}>Next Class</span>
        <h3 style={{ margin: '4px 0' }}>Digital Thinking</h3>
        <p style={{ margin: 0, fontSize: '14px' }}>09:00 AM - 10:30 AM • Auditorium 2</p>
      </div>

      <h3>Announcements</h3>
      <div style={{ background: '#f8f9fa', padding: '12px', borderRadius: '8px', marginBottom: '10px', borderLeft: '4px solid #8B2072' }}>
        <strong>Midterm Exam Schedule</strong>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#555' }}>Midterm examinations start next Monday. Check your schedule tab.</p>
      </div>
      <div style={{ background: '#f8f9fa', padding: '12px', borderRadius: '8px', borderLeft: '4px solid #8B2072' }}>
        <strong>Library Books Return</strong>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#555' }}>Please return all borrowed books before May 15.</p>
      </div>
    </div>
  );
}