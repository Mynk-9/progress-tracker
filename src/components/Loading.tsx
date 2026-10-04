import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loading: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '40vh',
      gap: '16px',
      color: 'var(--text-muted)'
    }}>
      <div className="animate-pulse">
        <Loader2 size={32} />
      </div>
      <p style={{ fontSize: '0.95rem', fontWeight: 500 }}>Loading workspace...</p>
    </div>
  );
};
