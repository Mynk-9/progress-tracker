export function calculateCurrentStreak(checkins) {
  if (!checkins || checkins.length === 0) return 0;

  // Sort checkins by date descending
  const sorted = [...checkins].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let expectedDate = new Date(today);

  // Check if there is a checkin today
  const hasCheckedInToday = sorted.some(c => {
    const d = new Date(c.date);
    d.setHours(0,0,0,0);
    return d.getTime() === today.getTime();
  });

  if (!hasCheckedInToday) {
    // If no checkin today, the streak expects a checkin yesterday
    expectedDate.setDate(expectedDate.getDate() - 1);
  }

  for (const checkin of sorted) {
    const d = new Date(checkin.date);
    d.setHours(0, 0, 0, 0);
    
    if (d.getTime() === expectedDate.getTime()) {
      streak++;
      expectedDate.setDate(expectedDate.getDate() - 1);
    } else if (d.getTime() > expectedDate.getTime()) {
      // Ignored: Multiple checkins on the same day or a future checkin
      continue;
    } else {
      // Missed a day, streak is broken
      break;
    }
  }

  return streak;
}

export function calculateTotalProgress(goal, checkins) {
  if (!goal || !checkins || checkins.length === 0) return 0;
  
  // If the goal tracks numerical values, sum them up
  const total = checkins.reduce((acc, curr) => acc + (Number(curr.value) || 1), 0);
  
  if (goal.hasEndGoal && goal.targetValue) {
    return Math.min(100, Math.round((total / goal.targetValue) * 100));
  }
  
  return total; // For infinite goals, just return the total count
}

export function generateHeatmapData(checkins) {
  if (!checkins || checkins.length === 0) return {};
  
  // Returns a map of YYYY-MM-DD string to checkin intensity/value
  return checkins.reduce((acc, curr) => {
    const d = new Date(curr.date);
    const dateStr = d.toISOString().split('T')[0];
    acc[dateStr] = (acc[dateStr] || 0) + (Number(curr.value) || 1);
    return acc;
  }, {});
}
