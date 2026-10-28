import React from 'react';

export default function CoursesScreen() {
  const courses = [
    { code: 'CS-301', title: 'Software Engineering', teacher: 'Dr. Ahmad Khan', credits: '3 Cr' },
    { code: 'CS-304', title: 'Mobile App Development', teacher: 'Prof. Sarah Ali', credits: '4 Cr' },
    { code: 'MKT-201', title: 'Digital Marketing', teacher: 'Mr. Usman Raza', credits: '3 Cr' },
    { code: 'AI-401', title: 'Artificial Intelligence', teacher: 'Dr. Bilal Malik', credits: '3 Cr' },
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#8B2072' }}>My Courses</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {courses.map((course, idx) => (
          <div key={idx} style={{ background: '#fff', border: '1px solid #e0e0e0', padding: '14px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#8B2072' }}>{course.code}</span>
              <span style={{ fontSize: '12px', background: '#f0f0f0', padding: '2px 8px', borderRadius: '12px' }}>{course.credits}</span>
            </div>
            <h4 style={{ margin: '6px 0 2px' }}>{course.title}</h4>
            <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>{course.teacher}</p>
          </div>
        ))}
      </div>
    </div>
  );
}