import React, { useState } from 'react';
import { addGoal, Goal } from '../lib/db';
import { PlusCircle, X } from 'lucide-react';

interface GoalFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const GoalForm: React.FC<GoalFormProps> = ({ onSuccess, onCancel }) => {
  const [title, setTitle] = useState('');
  const [hasEndGoal, setHasEndGoal] = useState(false);
  const [targetValue, setTargetValue] = useState<number | ''>('');
  const [targetUnit, setTargetUnit] = useState('');
  const [scheduleType, setScheduleType] = useState<Goal['scheduleType']>('daily');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await addGoal({
      title: title.trim(),
      hasEndGoal,
      targetValue: hasEndGoal && targetValue ? Number(targetValue) : undefined,
      targetUnit: hasEndGoal && targetUnit ? targetUnit.trim() : undefined,
      scheduleType,
    });
    
    onSuccess();
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2>Create New Goal</h2>
        <button onClick={onCancel} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Goal Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="e.g. Read 10 pages, Meditate"
            required
            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'rgba(0,0,0,0.2)', color: 'var(--text-primary)', outline: 'none' }}
          />
        </div>

        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Schedule</label>
          <select 
            value={scheduleType} 
            onChange={(e) => setScheduleType(e.target.value as Goal['scheduleType'])}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'rgba(0,0,0,0.2)', color: 'var(--text-primary)', outline: 'none' }}
          >
            <option value="daily">Daily</option>
            <option value="weekdays">Weekdays (Mon-Fri)</option>
            <option value="weekends">Weekends (Sat-Sun)</option>
            <option value="weekly">Weekly</option>
            <option value="bi-weekly">Bi-Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="custom_days">Custom Days</option>
          </select>
        </div>

        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input 
            type="checkbox" 
            id="hasEndGoal" 
            checked={hasEndGoal} 
            onChange={(e) => setHasEndGoal(e.target.checked)} 
            style={{ accentColor: 'var(--brand-primary)' }}
          />
          <label htmlFor="hasEndGoal" style={{ fontSize: '0.9rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
            This goal has a specific target
          </label>
        </div>

        {hasEndGoal && (
          <div style={{ display: 'flex', gap: '12px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Target Amount</label>
              <input 
                type="number" 
                value={targetValue} 
                onChange={(e) => setTargetValue(e.target.value ? Number(e.target.value) : '')} 
                min="1"
                placeholder="e.g. 100"
                required
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'rgba(0,0,0,0.2)', color: 'var(--text-primary)', outline: 'none' }}
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Unit</label>
              <input 
                type="text" 
                value={targetUnit} 
                onChange={(e) => setTargetUnit(e.target.value)} 
                placeholder="e.g. pages, km, hours"
                required
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'rgba(0,0,0,0.2)', color: 'var(--text-primary)', outline: 'none' }}
              />
            </div>
          </div>
        )}

        <button 
          type="submit"
          style={{
            marginTop: '8px',
            background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))',
            color: 'white',
            border: 'none',
            padding: '12px',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: 'var(--shadow-glow)'
          }}
        >
          <PlusCircle size={18} />
          Create Goal
        </button>
      </form>
    </div>
  );
};
