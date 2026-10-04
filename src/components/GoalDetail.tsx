import React, { useEffect, useState } from 'react';
import { Goal, getCheckinsForGoal, CheckIn } from '../lib/db';
import { calculateGoalStats, GoalStats } from '../lib/stats';
import { Heatmap } from './Heatmap';
import { ArrowLeft, Target, Flame, CalendarDays, Trophy, Activity } from 'lucide-react';

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

  // Create a Map of YYYY-MM-DD -> total value for that day
  const checkinMap = new Map<string, number>();
  checkins.forEach(c => {
    checkinMap.set(c.date, (checkinMap.get(c.date) || 0) + (c.value || 1));
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button 
          onClick={onBack}
          className="btn-secondary"
          style={{ 
            padding: '10px', 
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 style={{ fontSize: '1.6rem', margin: '0 0 2px 0', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>{goal.title}</h2>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
            {goal.scheduleType} Schedule
          </span>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
          <Target size={20} color="var(--brand-primary)" /> Analytics Overview
        </h3>
        
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 calc(33.333% - 16px)', background: 'var(--bg-surface)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Activity size={24} color="var(--text-secondary)" />
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{stats.totalCheckIns}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Total Completed</div>
          </div>

          <div style={{ flex: '1 1 calc(33.333% - 16px)', background: 'var(--bg-surface)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Flame size={24} color="var(--brand-primary)" />
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{stats.currentStreak}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Current Streak</div>
          </div>

          <div style={{ flex: '1 1 calc(33.333% - 16px)', background: 'var(--bg-surface)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Trophy size={24} color="var(--brand-secondary)" />
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{stats.longestStreak}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Best Streak</div>
          </div>
        </div>

        {/* Global Progress Bar (for quantitative goals) */}
        {goal.hasEndGoal && stats.progressPercentage !== undefined && (
          <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.95rem' }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Overall Target Progress</span>
              <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{stats.progressPercentage}%</span>
            </div>
            <div style={{ width: '100%', height: '10px', backgroundColor: 'var(--bg-hover)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
              <div 
                style={{ 
                  width: `${stats.progressPercentage}%`, 
                  height: '100%', 
                  backgroundColor: 'var(--brand-primary)',
                  borderRadius: 'var(--radius-full)',
                  transition: 'width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }} 
              />
            </div>
            <div style={{ textAlign: 'right', marginTop: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              {stats.totalCheckIns} / {goal.targetValue} {goal.targetUnit}
            </div>
          </div>
        )}
      </div>

      <div className="card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--text-primary)' }}>
          <CalendarDays size={20} color="var(--brand-primary)" /> Heatmap
        </h3>
        <Heatmap checkinData={checkinMap} />
      </div>
    </div>
  );
};
