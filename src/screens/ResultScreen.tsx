import React from 'react';

export default function ResultScreen() {
  const results = [
    { subject: 'Digital Marketing', grade: 'A', gpa: '4.0' },
    { subject: 'Software Engineering', grade: 'A-', gpa: '3.7' },
    { subject: 'Mobile App Development', grade: 'B+', gpa: '3.3' },
    { subject: 'Artificial Intelligence', grade: 'A', gpa: '4.0' },
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#8B2072' }}>Academic Results</h2>
      
      <div style={{ background: '#f3e5f5', padding: '16px', borderRadius: '10px', display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#8B2072' }}>3.75</div>
          <div style={{ fontSize: '12px', color: '#666' }}>CGPA</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#8B2072' }}>48</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Earned Credits</div>
        </div>
      </div>

      <h3>Semester Summary</h3>
      {results.map((res, idx) => (
        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #eee' }}>
          <span>{res.subject}</span>
          <div>
            <strong style={{ color: '#8B2072', marginRight: '8px' }}>{res.grade}</strong>
            <span style={{ fontSize: '12px', color: '#888' }}>({res.gpa})</span>
          </div>
        </div>
      ))}
    </div>
  );
}