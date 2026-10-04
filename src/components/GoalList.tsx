import React, { useEffect, useState } from 'react';
import { getGoals, Goal, addCheckin, getCheckinsForGoal } from '../lib/db';
import { getLocalDateString } from '../lib/stats';
import { CheckCircle2, Circle } from 'lucide-react';

export interface GoalListProps {
  onSelectGoal: (goal: Goal) => void;
}

export const GoalList: React.FC<GoalListProps> = ({ onSelectGoal }) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [todayCheckins, setTodayCheckins] = useState<Set<string>>(new Set());
  const [activeCheckInGoalId, setActiveCheckInGoalId] = useState<string | null>(null);
  const [checkInValue, setCheckInValue] = useState<number | ''>('');

  const loadData = async () => {
    setLoading(true);
    const loadedGoals = await getGoals();
    setGoals(loadedGoals);
    
    const today = getLocalDateString();
    const checkedInSet = new Set<string>();
    
    for (const goal of loadedGoals) {
      const checkins = await getCheckinsForGoal(goal.id);
      if (checkins.some(c => c.date === today)) {
        checkedInSet.add(goal.id);
      }
    }
    
    setTodayCheckins(checkedInSet);
    setLoading(false);
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
    await addCheckin({
      goalId,
      date: today,
      value
    });
    
    setTodayCheckins(prev => new Set(prev).add(goalId));
    setActiveCheckInGoalId(null);
  };

  const handleNumericSubmit = (e: React.FormEvent, goalId: string) => {
    e.preventDefault();
    if (typeof checkInValue === 'number') {
      submitCheckIn(goalId, checkInValue);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-secondary)' }}>Loading your progress...</div>;

  if (goals.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {goals.map(goal => {
        const isCheckedIn = todayCheckins.has(goal.id);
        const isActive = activeCheckInGoalId === goal.id;
        
        return (
          <div 
            key={goal.id} 
            className="card" 
            onClick={() => { if (!isActive) onSelectGoal(goal); }}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              padding: '16px 20px', 
              cursor: isActive ? 'default' : 'pointer' 
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '0 0 4px 0' }}>{goal.title}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>
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
                    color: isCheckedIn ? 'var(--brand-primary)' : 'var(--text-secondary)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {isCheckedIn ? <CheckCircle2 size={32} /> : <Circle size={32} />}
                </button>
              )}
            </div>

            {isActive && (
              <form onSubmit={(e) => handleNumericSubmit(e, goal.id)} style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
                <input 
                  type="number"
                  autoFocus
                  placeholder={`Amount (${goal.targetUnit || 'value'})`}
                  value={checkInValue}
                  onChange={(e) => setCheckInValue(e.target.value ? Number(e.target.value) : '')}
                  required
                  style={{ flex: 1, padding: '10px 14px', borderRadius: '4px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', color: 'var(--text-primary)', outline: 'none' }}
                />
                <button 
                  type="submit"
                  style={{
                    background: 'var(--brand-primary)',
                    color: 'var(--bg-base)',
                    border: 'none',
                    padding: '0 16px',
                    borderRadius: '4px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Done
                </button>
                <button 
                  type="button"
                  onClick={() => setActiveCheckInGoalId(null)}
                  style={{
                    background: 'transparent',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border-subtle)',
                    padding: '0 16px',
                    borderRadius: '4px',
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
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
