import React, { useEffect, useState } from 'react';
import { Goal, getCheckinsForGoal, CheckIn } from '../lib/db';
import { calculateGoalStats, GoalStats } from '../lib/stats';
import { Heatmap } from './Heatmap';
import { ArrowLeft, Target, Flame, CalendarDays } from 'lucide-react';

interface GoalDetailProps {
  goal: Goal;
  onBack: () => void;
}

export const GoalDetail: React.FC<GoalDetailProps> = ({ goal, onBack }) => {
  const [checkins, setCheckins] = useState<CheckIn[]>([]);
  const [stats, setStats] = useState<GoalStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      const data = await getCheckinsForGoal(goal.id);
      setCheckins(data);
      const computedStats = calculateGoalStats(goal, data);
      setStats(computedStats);
      setLoading(false);
    };
    loadStats();
  }, [goal]);

  if (loading || !stats) {
    return <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-secondary)' }}>Loading details...</div>;
  }

  const checkinDateSet = new Set(checkins.map(c => c.date));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button 
          onClick={onBack}
          className="glass"
          style={{ 
            background: 'transparent', 
            border: '1px solid var(--border-subtle)', 
            padding: '8px', 
            borderRadius: '50%',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 style={{ fontSize: '1.4rem', margin: '0 0 2px 0' }}>{goal.title}</h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>
            {goal.scheduleType} Schedule
          </span>
        </div>
      </div>

      <div className="card glass">
        <h3 style={{ fontSize: '1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Target size={18} color="var(--brand-secondary)" /> Overview
        </h3>
        
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          <div style={{ flex: 1, background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>{stats.totalCheckIns}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Total Check-ins</div>
          </div>
          <div style={{ flex: 1, background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              <Flame size={20} /> {stats.currentStreak}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Current Streak</div>
          </div>
          <div style={{ flex: 1, background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>{stats.longestStreak}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Best Streak</div>
          </div>
        </div>

        {goal.hasEndGoal && stats.progressPercentage !== undefined && (
          <div style={{ marginTop: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Overall Progress</span>
              <span style={{ fontWeight: 600 }}>{stats.progressPercentage}%</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  width: `${stats.progressPercentage}%`, 
                  height: '100%', 
                  background: 'linear-gradient(90deg, var(--brand-primary), var(--brand-secondary))',
                  borderRadius: '4px',
                  transition: 'width 0.5s ease-out',
                  boxShadow: 'var(--shadow-glow)'
                }} 
              />
            </div>
            <div style={{ textAlign: 'right', marginTop: '4px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              {stats.totalCheckIns} / {goal.targetValue}
            </div>
          </div>
        )}
      </div>

      <div className="card glass">
        <h3 style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <CalendarDays size={18} color="var(--brand-primary)" /> Schedule Track
        </h3>
        <Heatmap checkinDates={checkinDateSet} />
      </div>
    </div>
  );
};
