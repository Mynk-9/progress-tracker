import React from 'react';

interface HeatmapProps {
  checkinData: Map<string, number>; // Map of YYYY-MM-DD -> total value
}

export const Heatmap: React.FC<HeatmapProps> = ({ checkinData }) => {
  // Generate the last 91 days (13 weeks * 7 days)
  const days = 91;
  const today = new Date();
  
  const dates: { date: string; value: number }[] = [];
  let maxValue = 0;
  
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    
    const value = checkinData.get(dateString) || 0;
    if (value > maxValue) {
      maxValue = value;
    }
    
    dates.push({
      date: dateString,
      value: value,
    });
  }

  // Helper to determine cell opacity/color based on numeric value vs max
  const getCellBackground = (value: number) => {
    if (value === 0) return 'var(--bg-hover)';
    
    // Minimum 30% opacity to ensure visibility if value > 0
    const intensity = Math.max(0.3, value / (maxValue || 1));
    return `rgba(79, 70, 229, ${intensity})`; // Using the core Indigo RGB
  };

  return (
    <div style={{ marginTop: '16px' }}>
      <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px', fontWeight: 500 }}>Activity Heatmap (Last 90 days)</h4>
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(13, 1fr)', 
          gap: '6px',
          background: 'var(--bg-surface)',
          padding: '16px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)'
        }}
      >
        {dates.map((d, index) => {
          const isActive = d.value > 0;
          return (
            <div 
              key={index}
              title={`${d.date}: ${d.value}`}
              className="animate-scale-in"
              style={{
                aspectRatio: '1/1',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: getCellBackground(d.value),
                boxShadow: isActive ? '0 1px 3px rgba(79, 70, 229, 0.3)' : 'none',
                opacity: 0, // Initial state for the scale-in animation
                animationDelay: `${index * 0.005}s`, // Cascading delay
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
