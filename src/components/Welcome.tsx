import React from 'react';
import { Target, TrendingUp, CheckSquare } from 'lucide-react';

interface WelcomeProps {
  onStart: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingTop: '40px' }}>
      <div>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '16px' }}>
          Measure what matters.
        </h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '90%' }}>
          A minimalist, offline-first progress tracker designed to keep you focused on your quantitative goals and daily habits.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', margin: '24px 0' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <div style={{ padding: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
            <Target color="var(--brand-primary)" size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '4px' }}>Set specific targets</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Track pages read, kilometers run, or simple daily check-ins.</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <div style={{ padding: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
            <TrendingUp color="var(--brand-secondary)" size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '4px' }}>Visualize your progress</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>See your streaks and activity heatmaps grow over time.</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <div style={{ padding: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
            <CheckSquare color="var(--text-primary)" size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '4px' }}>Completely private</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Your data stays on your device. Works entirely offline.</p>
          </div>
        </div>
      </div>

      <button onClick={onStart} className="btn-primary" style={{ width: '100%', fontSize: '1.1rem', padding: '16px' }}>
        Create your first goal
      </button>
    </div>
  );
};
