import React from 'react';

export default function ScheduleScreen() {
  const schedule = [
    { time: '09:00 - 10:30', subject: 'Software Engineering', room: 'Lab 3', status: 'Upcoming' },
    { time: '11:00 - 12:30', subject: 'Mobile App Development', room: 'Room 204', status: 'Next' },
    { time: '02:00 - 03:30', subject: 'Digital Marketing', room: 'Hall B', status: 'Later' },
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#8B2072' }}>Class Schedule</h2>
      <p style={{ color: '#666', marginTop: '-10px' }}>Today's Timeline</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {schedule.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '12px', padding: '12px', borderBottom: '1px solid #eee' }}>
            <div style={{ minWidth: '90px', fontSize: '12px', fontWeight: 'bold', color: '#333' }}>{item.time}</div>
            <div>
              <div style={{ fontWeight: 'bold' }}>{item.subject}</div>
              <div style={{ fontSize: '12px', color: '#777' }}>📍 {item.room}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}