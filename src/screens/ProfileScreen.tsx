import React from 'react';

interface ProfileProps {
  onLogout: () => void;
}

export default function ProfileScreen({ onLogout }: ProfileProps) {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#8B2072', color: '#fff', fontSize: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
        S
      </div>
      <h3 style={{ margin: '0 0 4px' }}>Semenov Semen</h3>
      <p style={{ margin: '0 0 16px', color: '#666', fontSize: '14px' }}>BS Computer Science • Reg # 2026-CS-102</p>

      <div style={{ textAlign: 'left', background: '#f9f9f9', padding: '16px', borderRadius: '10px', marginBottom: '20px' }}>
        <p style={{ margin: '6px 0', fontSize: '14px' }}><strong>Email:</strong> student@superior.edu.pk</p>
        <p style={{ margin: '6px 0', fontSize: '14px' }}><strong>Campus:</strong> Main Campus</p>
        <p style={{ margin: '6px 0', fontSize: '14px' }}><strong>Status:</strong> Active Student</p>
      </div>

      <button 
        onClick={onLogout}
        style={{ width: '100%', padding: '12px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
      >
        Log Out
      </button>
    </div>
  );
}