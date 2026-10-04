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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>Create New Goal</h2>
        <button className="btn-icon" onClick={onCancel}>
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Goal Title</label>
          <input 
            type="text" 
            className="form-input"
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="e.g. Read 10 pages, Meditate"
            required
          />
        </div>

        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Schedule</label>
          <select 
            className="form-input"
            value={scheduleType} 
            onChange={(e) => setScheduleType(e.target.value as Goal['scheduleType'])}
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

        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'var(--bg-base)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <input 
            type="checkbox" 
            id="hasEndGoal" 
            checked={hasEndGoal} 
            onChange={(e) => setHasEndGoal(e.target.checked)} 
            style={{ accentColor: 'var(--brand-primary)', width: '18px', height: '18px', cursor: 'pointer' }}
          />
          <label htmlFor="hasEndGoal" style={{ fontSize: '0.95rem', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 500, userSelect: 'none' }}>
            This goal has a specific numeric target
          </label>
        </div>

        {hasEndGoal && (
          <div style={{ display: 'flex', gap: '16px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Target Amount</label>
              <input 
                type="number" 
                className="form-input"
                value={targetValue} 
                onChange={(e) => setTargetValue(e.target.value ? Number(e.target.value) : '')} 
                min="1"
                placeholder="e.g. 100"
                required
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Unit</label>
              <input 
                type="text" 
                className="form-input"
                value={targetUnit} 
                onChange={(e) => setTargetUnit(e.target.value)} 
                placeholder="e.g. pages, km"
                required
              />
            </div>
          </div>
        )}

        <button 
          type="submit"
          className="btn-primary"
          style={{ marginTop: '12px', width: '100%', padding: '14px' }}
        >
          <PlusCircle size={20} />
          Create Goal
        </button>
      </form>
    </div>
  );
};
