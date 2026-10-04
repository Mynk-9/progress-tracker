import React, { useEffect, useState } from 'react';
import { getGoals, Goal, addCheckin, getCheckinsForGoal } from '../lib/db';
import { getLocalDateString } from '../lib/stats';
import { CheckCircle2, Circle } from 'lucide-react';

export const GoalList: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [todayCheckins, setTodayCheckins] = useState<Set<string>>(new Set());

  const loadData = async () => {
    setLoading(true);
    const loadedGoals = await getGoals();
    setGoals(loadedGoals);
    
    // Determine which goals have been checked in today
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

  const handleCheckIn = async (goalId: string, isCheckedIn: boolean) => {
    if (isCheckedIn) return; // For now, only allow check-ins, no undos for simplicity in Phase 2
    
    const today = getLocalDateString();
    await addCheckin({
      goalId,
      date: today,
    });
    
    setTodayCheckins(prev => new Set(prev).add(goalId));
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-secondary)' }}>Loading your progress...</div>;

  if (goals.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {goals.map(goal => {
        const isCheckedIn = todayCheckins.has(goal.id);
        return (
          <div key={goal.id} className="card glass" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 500, margin: '0 0 4px 0' }}>{goal.title}</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>
                {goal.scheduleType}
              </span>
            </div>
            
            <button 
              onClick={() => handleCheckIn(goal.id, isCheckedIn)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: isCheckedIn ? 'default' : 'pointer',
                color: isCheckedIn ? 'var(--brand-primary)' : 'var(--text-secondary)',
                transition: 'all 0.2s ease',
                transform: isCheckedIn ? 'scale(1.1)' : 'scale(1)'
              }}
            >
              {isCheckedIn ? <CheckCircle2 size={32} /> : <Circle size={32} />}
            </button>
          </div>
        );
      })}
    </div>
  );
};
