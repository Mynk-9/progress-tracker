import React from 'react';
import { Target, TrendingUp, CheckSquare, Zap, Activity } from 'lucide-react';

interface WelcomeProps {
  onStart: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', paddingTop: '20px', paddingBottom: '40px' }}>
      
      {/* Hero Section */}
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
        
        {/* Abstract Progress SVG Visualization */}
        <div style={{ position: 'relative', width: '160px', height: '160px', margin: '0 auto' }}>
          {/* Outer Ring */}
          <svg className="animate-float" width="160" height="160" viewBox="0 0 160 160" style={{ position: 'absolute', top: 0, left: 0 }}>
            <circle cx="80" cy="80" r="76" fill="none" stroke="var(--border-subtle)" strokeWidth="8" />
            <circle cx="80" cy="80" r="76" fill="none" stroke="var(--brand-primary)" strokeWidth="8" strokeDasharray="477" strokeDashoffset="150" strokeLinecap="round" style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }} />
          </svg>
          
          {/* Inner Element */}
          <div className="animate-float-delayed" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'var(--bg-surface)', padding: '16px', borderRadius: '50%', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-subtle)' }}>
             <Activity size={36} color="var(--brand-secondary)" />
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '16px', color: 'var(--text-primary)' }}>
            Master your progress.
          </h2>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '500px', margin: '0 auto' }}>
            A premium, offline-first tracking environment designed for deep focus and actionable insights. Turn daily actions into lasting habits.
          </p>
        </div>

        <button 
          onClick={onStart} 
          className="btn-primary" 
          style={{ fontSize: '1.1rem', padding: '16px 32px', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', boxShadow: 'var(--shadow-lg)' }}
        >
          <Zap size={20} />
          Start Tracking
        </button>
      </div>

      {/* Feature Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '24px', 
        marginTop: '24px' 
      }}>
        <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ padding: '12px', background: 'rgba(79, 70, 229, 0.1)', display: 'inline-flex', borderRadius: 'var(--radius-md)', width: 'fit-content' }}>
            <Target color="var(--brand-primary)" size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>Specific Targets</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Track precise quantities like pages read or kilometers run, not just simple checkboxes.</p>
          </div>
        </div>

        <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ padding: '12px', background: 'rgba(14, 165, 233, 0.1)', display: 'inline-flex', borderRadius: 'var(--radius-md)', width: 'fit-content' }}>
            <TrendingUp color="var(--brand-secondary)" size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>Visual Insights</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>See your momentum build through beautiful activity heatmaps and detailed streak statistics.</p>
          </div>
        </div>

        <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ padding: '12px', background: 'var(--bg-hover)', display: 'inline-flex', borderRadius: 'var(--radius-md)', width: 'fit-content', border: '1px solid var(--border-subtle)' }}>
            <CheckSquare color="var(--text-primary)" size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>100% Private</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Your data never leaves your device. A fully offline PWA architecture ensures total privacy.</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};
