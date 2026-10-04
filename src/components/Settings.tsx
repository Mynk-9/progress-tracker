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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>
          <SettingsIcon size={24} /> Settings
        </h2>
        <button className="btn-icon" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ background: 'var(--bg-hover)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>Export Data</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Download a backup of all your goals and check-ins to your device.
          </p>
          <button 
            className="btn-secondary"
            onClick={handleExport}
            style={{ width: '100%', padding: '12px' }}
          >
            <Download size={18} /> Export Backup
          </button>
        </div>

        <div style={{ background: 'var(--bg-hover)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>Import Data</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
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
            className="btn-secondary"
            onClick={() => fileInputRef.current?.click()}
            style={{ width: '100%', padding: '12px', color: 'var(--brand-primary)', borderColor: 'var(--border-focus)' }}
          >
            <Upload size={18} /> Import Backup
          </button>
        </div>

        {message && (
          <div style={{ textAlign: 'center', fontSize: '0.95rem', fontWeight: 500, color: 'var(--brand-secondary)', marginTop: '8px', padding: '12px', background: 'var(--bg-hover)', borderRadius: 'var(--radius-md)' }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};
