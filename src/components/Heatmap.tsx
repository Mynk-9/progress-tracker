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
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(13, 1fr)', 
          gap: 'min(6px, 1.5vw)'
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
