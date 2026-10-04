import React, { useState } from 'react';
import { GoalList } from './components/GoalList';
import { GoalForm } from './components/GoalForm';
import { GoalDetail } from './components/GoalDetail';
import { Settings as SettingsComponent } from './components/Settings';
import { Plus, Settings as SettingsIcon } from 'lucide-react';
import { Goal } from './lib/db';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const renderContent = () => {
    if (showSettings) {
      return (
        <SettingsComponent 
          onClose={() => setShowSettings(false)}
          onImportSuccess={() => {
            setShowSettings(false);
            setRefreshKey(prev => prev + 1);
          }}
        />
      );
    }

    if (selectedGoal) {
      return (
        <GoalDetail 
          goal={selectedGoal} 
          onBack={() => {
            setSelectedGoal(null);
            setRefreshKey(prev => prev + 1); // refresh list to get latest streaks
          }} 
        />
      );
    }

    if (showForm) {
      return (
        <GoalForm 
          onSuccess={() => {
            setShowForm(false);
            setRefreshKey(prev => prev + 1);
          }} 
          onCancel={() => setShowForm(false)} 
        />
      );
    }

    return <GoalList key={refreshKey} onSelectGoal={setSelectedGoal} />;
  };

  return (
    <div className="app-container">
      <header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Progress</h1>
          <p className="subtitle">Track your goals, beautifully.</p>
        </div>
        {!showForm && !selectedGoal && !showSettings && (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => setShowSettings(true)}
              className="glass"
              style={{
                padding: '10px',
                border: '1px solid var(--border-highlight)',
                background: 'var(--bg-glass-hover)',
                color: 'var(--text-primary)',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <SettingsIcon size={18} />
            </button>
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
          </div>
        )}
      </header>
      
      <main className="main-content" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
