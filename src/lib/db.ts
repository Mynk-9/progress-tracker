import { openDB, DBSchema, IDBPDatabase } from 'idb';

export interface Goal {
  id: string;
  title: string;
  hasEndGoal: boolean;
  targetValue?: number;
  scheduleType: 'daily' | 'weekly' | 'custom_days' | 'monthly';
  createdAt: number;
}

export interface CheckIn {
  id: string;
  goalId: string;
  date: string; // YYYY-MM-DD
  value?: number;
  notes?: string;
}

interface ProgressDB extends DBSchema {
  goals: {
    key: string;
    value: Goal;
    indexes: { 'createdAt': number };
  };
  checkins: {
    key: string;
    value: CheckIn;
    indexes: { 'goalId': string, 'date': string };
  };
}

const DB_NAME = 'progress_tracker_db';
const DB_VERSION = 1;

export async function initDB(): Promise<IDBPDatabase<ProgressDB>> {
  const db = await openDB<ProgressDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('goals')) {
        const goalStore = db.createObjectStore('goals', { keyPath: 'id' });
        goalStore.createIndex('createdAt', 'createdAt');
      }
      if (!db.objectStoreNames.contains('checkins')) {
        const checkinStore = db.createObjectStore('checkins', { keyPath: 'id' });
        checkinStore.createIndex('goalId', 'goalId');
        checkinStore.createIndex('date', 'date');
      }
    },
  });
  return db;
}

export async function getGoals(): Promise<Goal[]> {
  const db = await initDB();
  return db.getAll('goals');
}

export async function addGoal(goal: Omit<Goal, 'id' | 'createdAt'>): Promise<string> {
  const db = await initDB();
  return db.add('goals', { ...goal, id: crypto.randomUUID(), createdAt: Date.now() });
}

export async function deleteGoal(id: string): Promise<void> {
  const db = await initDB();
  return db.delete('goals', id);
}

export async function getCheckinsForGoal(goalId: string): Promise<CheckIn[]> {
  const db = await initDB();
  return db.getAllFromIndex('checkins', 'goalId', goalId);
}

export async function addCheckin(checkin: Omit<CheckIn, 'id'>): Promise<string> {
  const db = await initDB();
  return db.add('checkins', { ...checkin, id: crypto.randomUUID() });
}

export async function deleteCheckin(id: string): Promise<void> {
  const db = await initDB();
  return db.delete('checkins', id);
}

export async function exportData(): Promise<string> {
  const db = await initDB();
  const goals = await db.getAll('goals');
  const checkins = await db.getAll('checkins');
  return JSON.stringify({ goals, checkins });
}

export async function importData(jsonData: string): Promise<boolean> {
  try {
    const data = JSON.parse(jsonData);
    const db = await initDB();
    const tx = db.transaction(['goals', 'checkins'], 'readwrite');
    
    if (data.goals) {
      for (const goal of data.goals) {
        await tx.objectStore('goals').put(goal);
      }
    }
    if (data.checkins) {
      for (const checkin of data.checkins) {
        await tx.objectStore('checkins').put(checkin);
      }
    }
    await tx.done;
    return true;
  } catch (error) {
    console.error("Import failed", error);
    return false;
  }
}
