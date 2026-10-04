import React, { useRef, useState } from 'react';
import { exportData, importData } from '../lib/db';
import { Settings as SettingsIcon, Download, Upload, X } from 'lucide-react';

interface SettingsProps {
  onClose: () => void;
  onImportSuccess: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onClose, onImportSuccess }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState('');

  const handleExport = async () => {
    try {
      const data = await exportData();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `progress-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      
      URL.revokeObjectURL(url);
      setMessage('Export successful!');
    } catch (e) {
      setMessage('Export failed.');
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        const success = await importData(result);
        if (success) {
          setMessage('Import successful!');
          setTimeout(() => {
            onImportSuccess();
          }, 1500);
        } else {
          setMessage('Import failed. Invalid file format.');
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SettingsIcon size={20} /> Settings
        </h2>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
          <X size={20} />
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '12px' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '8px' }}>Export Data</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            Download a backup of all your goals and check-ins to your device.
          </p>
          <button 
            onClick={handleExport}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-glass-hover)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            <Download size={18} /> Export Backup
          </button>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '12px' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '8px' }}>Import Data</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            Restore your goals and check-ins from a previously exported backup file.
          </p>
          <input 
            type="file" 
            accept=".json" 
            ref={fileInputRef} 
            onChange={handleImport} 
            style={{ display: 'none' }} 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid var(--brand-primary-glow)',
              background: 'transparent',
              color: 'var(--brand-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            <Upload size={18} /> Import Backup
          </button>
        </div>

        {message && (
          <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--brand-secondary)', marginTop: '8px' }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};
