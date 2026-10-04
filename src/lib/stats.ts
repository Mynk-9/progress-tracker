import { Goal, CheckIn } from './db';

// Date utility: returns YYYY-MM-DD
export function getLocalDateString(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export interface GoalStats {
  totalCheckIns: number;
  currentStreak: number;
  longestStreak: number;
  progressPercentage?: number; // Only for finite goals
}

export function calculateGoalStats(goal: Goal, checkins: CheckIn[]): GoalStats {
  const sortedCheckIns = [...checkins].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  let currentStreak = 0;
  let longestStreak = 0;
  let totalCheckIns = sortedCheckIns.length;
  
  if (totalCheckIns === 0) {
    return { totalCheckIns: 0, currentStreak: 0, longestStreak: 0, progressPercentage: goal.hasEndGoal ? 0 : undefined };
  }

  // Calculate total achieved value for quantitative goals
  let totalAchieved = 0;
  for (const c of sortedCheckIns) {
    totalAchieved += (c.value || 1);
  }

  let currentRun = 1;
  for (let i = 1; i < sortedCheckIns.length; i++) {
    const prevDate = new Date(sortedCheckIns[i-1].date);
    const currDate = new Date(sortedCheckIns[i].date);
    const diffDays = Math.round((currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      currentRun++;
    } else if (diffDays > 1) {
      longestStreak = Math.max(longestStreak, currentRun);
      currentRun = 1;
    }
  }
  longestStreak = Math.max(longestStreak, currentRun);
  
  const lastCheckinDate = new Date(sortedCheckIns[sortedCheckIns.length - 1].date);
  const today = new Date(getLocalDateString());
  const diffFromToday = Math.round((today.getTime() - lastCheckinDate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffFromToday <= 1) {
    currentStreak = currentRun;
  } else {
    currentStreak = 0; 
  }

  let progressPercentage;
  if (goal.hasEndGoal && goal.targetValue) {
    progressPercentage = Math.min(100, Math.round((totalAchieved / goal.targetValue) * 100));
  }

  return {
    totalCheckIns: totalAchieved, // Using totalAchieved as the primary stat now instead of raw checkin count
    currentStreak,
    longestStreak,
    progressPercentage
  };
}

export function getHeatmapData(checkins: CheckIn[]): { date: string, count: number }[] {
  // Simple map to aggregate checkins by date
  const map = new Map<string, number>();
  checkins.forEach(c => {
    map.set(c.date, (map.get(c.date) || 0) + 1);
  });
  return Array.from(map.entries()).map(([date, count]) => ({ date, count }));
}
