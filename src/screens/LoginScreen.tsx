import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
      <h2 style={{ color: '#8B2072', textAlign: 'center', marginBottom: '8px' }}>Superior University</h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '32px' }}>Sign in to continue</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Email / Student ID</label>
          <input 
            type="text" 
            placeholder="student@superior.edu.pk" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', marginTop: '4px', boxSizing: 'border-box' }}
            required
          />
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', marginTop: '4px', boxSizing: 'border-box' }}
            required
          />
        </div>
        <button 
          type="submit" 
          style={{ background: '#8B2072', color: '#fff', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px' }}
        >
          Sign In
        </button>
      </form>
    </div>
  );
}