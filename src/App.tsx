import React, { useState, useEffect } from 'react';
import { GoalList } from './components/GoalList';
import { GoalForm } from './components/GoalForm';
import { GoalDetail } from './components/GoalDetail';
import { Settings as SettingsComponent } from './components/Settings';
import { Welcome } from './components/Welcome';
import { Plus, Settings as SettingsIcon, Sun, Moon } from 'lucide-react';
import { Goal, getGoals } from './lib/db';

type Theme = 'light' | 'dark';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  
  const [hasGoals, setHasGoals] = useState<boolean | null>(null);
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

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
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={toggleTheme}
            className="btn-secondary"
            style={{
              padding: '10px',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          
          {!showForm && !selectedGoal && !showSettings && hasGoals !== false && (
            <>
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
                className="btn-primary"
                style={{
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Plus size={18} /> New
              </button>
            </>
          )}
        </div>
      </header>
      
      <main className="main-content" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
