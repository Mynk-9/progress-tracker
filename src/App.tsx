import React, { useState, useEffect } from 'react';
import { GoalList } from './components/GoalList';
import { GoalForm } from './components/GoalForm';
import { GoalDetail } from './components/GoalDetail';
import { Settings as SettingsComponent } from './components/Settings';
import { Welcome } from './components/Welcome';
import { Plus, Settings as SettingsIcon } from 'lucide-react';
import { Goal, getGoals } from './lib/db';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  
  const [hasGoals, setHasGoals] = useState<boolean | null>(null);

  useEffect(() => {
    const checkGoals = async () => {
      const goals = await getGoals();
      setHasGoals(goals.length > 0);
    };
    checkGoals();
  }, [refreshKey]);

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
            setRefreshKey(prev => prev + 1);
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

    if (hasGoals === false) {
      return <Welcome onStart={() => setShowForm(true)} />;
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
        {!showForm && !selectedGoal && !showSettings && hasGoals !== false && (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => setShowSettings(true)}
              className="btn-secondary"
              style={{
                padding: '10px',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <SettingsIcon size={18} />
            </button>
            <button 
              onClick={() => setShowForm(true)}
              className="btn-secondary"
              style={{
                padding: '10px 14px',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
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
