import React, { useState } from 'react';
import { GoalList } from './components/GoalList';
import { GoalForm } from './components/GoalForm';
import { Plus } from 'lucide-react';

function App() {
  const [showForm, setShowForm] = useState(false);
  // Using a key to force re-render GoalList when a new goal is added
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="app-container">
      <header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Progress</h1>
          <p className="subtitle">Track your goals, beautifully.</p>
        </div>
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)}
            className="glass"
            style={{
              padding: '10px 14px',
              border: '1px solid var(--border-highlight)',
              background: 'var(--bg-glass-hover)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 500
            }}
          >
            <Plus size={18} /> New
          </button>
        )}
      </header>
      
      <main className="main-content" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {showForm ? (
          <GoalForm 
            onSuccess={() => {
              setShowForm(false);
              setRefreshKey(prev => prev + 1);
            }} 
            onCancel={() => setShowForm(false)} 
          />
        ) : (
          <GoalList key={refreshKey} />
        )}
      </main>
    </div>
  );
}

export default App;
