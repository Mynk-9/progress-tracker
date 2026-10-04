import React from 'react';

interface HeatmapProps {
  checkinDates: Set<string>; // Set of YYYY-MM-DD strings
}

export const Heatmap: React.FC<HeatmapProps> = ({ checkinDates }) => {
  // Generate the last 91 days (13 weeks * 7 days)
  const days = 91;
  const today = new Date();
  
  const dates: { date: string; active: boolean }[] = [];
  
  // We want to render a grid. Let's just generate an array of dates.
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    
    dates.push({
      date: dateString,
      active: checkinDates.has(dateString),
    });
  }

  // To display nicely like a Github heatmap, we can use CSS Grid.
  // 13 columns, 7 rows.
  // The dates array needs to be organized properly or we can just let CSS grid flex it if we render top-down.
  // We'll use a simple flex wrap for now which is easier for mobile, 
  // or a grid with fixed columns. Let's do grid with 13 columns.
  
  return (
    <div style={{ marginTop: '16px' }}>
      <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '12px', fontWeight: 500 }}>Activity Heatmap (Last 90 days)</h4>
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(13, 1fr)', 
          gap: '4px',
          background: 'rgba(0,0,0,0.2)',
          padding: '12px',
          borderRadius: '12px',
          border: '1px solid var(--border-subtle)'
        }}
      >
        {dates.map((d, index) => (
          <div 
            key={index}
            title={d.date}
            style={{
              aspectRatio: '1/1',
              borderRadius: '2px',
              backgroundColor: d.active ? 'var(--brand-primary)' : 'rgba(255,255,255,0.05)',
              boxShadow: d.active ? '0 0 8px var(--brand-primary-glow)' : 'none',
              transition: 'all 0.2s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
};
