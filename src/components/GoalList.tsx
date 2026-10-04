import React, { useEffect, useState } from 'react';
import { getGoals, Goal, addCheckin, getCheckinsForGoal } from '../lib/db';
import { getLocalDateString, calculateGoalStats, GoalStats } from '../lib/stats';
import { CheckCircle2, Circle } from 'lucide-react';

export interface GoalListProps {
  onSelectGoal: (goal: Goal) => void;
}

export const GoalList: React.FC<GoalListProps> = ({ onSelectGoal }) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [goalStats, setGoalStats] = useState<Record<string, GoalStats>>({});
  const [todayCheckins, setTodayCheckins] = useState<Set<string>>(new Set());
  const [activeCheckInGoalId, setActiveCheckInGoalId] = useState<string | null>(null);
  const [checkInValue, setCheckInValue] = useState<number | ''>('');

  const loadData = async () => {
    const loadedGoals = await getGoals();
    setGoals(loadedGoals);
    
    const today = getLocalDateString();
    const checkedInSet = new Set<string>();
    const statsMap: Record<string, GoalStats> = {};
    
    for (const goal of loadedGoals) {
      const checkins = await getCheckinsForGoal(goal.id);
      if (checkins.some(c => c.date === today)) {
        checkedInSet.add(goal.id);
      }
      statsMap[goal.id] = calculateGoalStats(goal, checkins);
    }
    
    setTodayCheckins(checkedInSet);
    setGoalStats(statsMap);
  };

  useEffect(() => {
    loadData();
  }, []);

  const initiateCheckIn = (e: React.MouseEvent, goal: Goal, isCheckedIn: boolean) => {
    e.stopPropagation();
    if (isCheckedIn) return;

    if (goal.hasEndGoal) {
      setActiveCheckInGoalId(goal.id);
      setCheckInValue('');
    } else {
      submitCheckIn(goal.id, 1);
    }
  };

  const submitCheckIn = async (goalId: string, value: number) => {
    const today = getLocalDateString();
    await addCheckin({ goalId, date: today, value });
    await loadData();
    setActiveCheckInGoalId(null);
  };

  const handleNumericSubmit = (e: React.FormEvent, goalId: string) => {
    e.preventDefault();
    if (typeof checkInValue === 'number') {
      submitCheckIn(goalId, checkInValue);
    }
  };

  if (goals.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {goals.map(goal => {
        const isCheckedIn = todayCheckins.has(goal.id);
        const isActive = activeCheckInGoalId === goal.id;
        const stats = goalStats[goal.id];
        
        const hasProgress = goal.hasEndGoal && goal.targetValue && stats && stats.progressPercentage !== undefined;
        
        return (
          <div 
            key={goal.id} 
            className="card" 
            onClick={() => { if (!isActive) onSelectGoal(goal); }}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              cursor: isActive ? 'default' : 'pointer' 
            }}
          >
            {/* Header: Title and Icon */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 6px 0', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{goal.title}</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                  {goal.scheduleType}
                </span>
              </div>
              
              {!isActive && (
                <button 
                  onClick={(e) => initiateCheckIn(e, goal, isCheckedIn)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: isCheckedIn ? 'default' : 'pointer',
                    color: isCheckedIn ? 'var(--brand-primary)' : 'var(--text-muted)',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isCheckedIn ? 'scale(1.05)' : 'scale(1)',
                  }}
                  onMouseOver={(e) => {
                    if (!isCheckedIn) e.currentTarget.style.color = 'var(--brand-primary-hover)';
                    if (!isCheckedIn) e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseOut={(e) => {
                    if (!isCheckedIn) e.currentTarget.style.color = 'var(--text-muted)';
                    if (!isCheckedIn) e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  {isCheckedIn ? <CheckCircle2 size={32} /> : <Circle size={32} />}
                </button>
              )}
            </div>

            {/* Inline Progress Bar */}
            {hasProgress && stats && (
              <div style={{ marginTop: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                  <span>{stats.totalCheckIns} / {goal.targetValue} {goal.targetUnit}</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{stats.progressPercentage}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-hover)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <div style={{ 
                    width: `${stats.progressPercentage}%`, 
                    height: '100%', 
                    backgroundColor: 'var(--brand-primary)', 
                    borderRadius: 'var(--radius-full)', 
                    transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)' 
                  }} />
                </div>
              </div>
            )}

            {/* Inline Check-In Form */}
            {isActive && (
              <form onSubmit={(e) => handleNumericSubmit(e, goal.id)} style={{ marginTop: '24px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <input 
                  type="number"
                  autoFocus
                  placeholder={`+ Amount (${goal.targetUnit || 'value'})`}
                  value={checkInValue}
                  onChange={(e) => setCheckInValue(e.target.value ? Number(e.target.value) : '')}
                  required
                  className="form-input"
                  style={{ flex: 1 }}
                />
                <button type="submit" className="btn-primary">
                  Log
                </button>
                <button type="button" className="btn-secondary" onClick={() => setActiveCheckInGoalId(null)}>
                  Cancel
                </button>
              </form>
            )}
          </div>
        );
      })}
    </div>
  );
};
