import { useState, useEffect, useCallback } from 'react';
import * as db from '../lib/db';

export function useData() {
  const [goals, setGoals] = useState([]);
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const loadedGoals = await db.getGoals();
      // To get all checkins, we could add a getAllCheckins to db.js,
      // but for now we can iterate over goals or just create it.
      // Let's add it to db.js on the fly. Wait, actually we can just 
      // rely on getting checkins per goal when viewing details.
      // For global dashboard, we might want all checkins for "today".
      // Let's assume we fetch all goals for now.
      setGoals(loadedGoals);
      setError(null);
    } catch (err) {
      setError(err);
      console.error("Failed to load data from DB", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const createNewGoal = async (goalData) => {
    await db.addGoal(goalData);
    await loadData();
  };

  const removeGoal = async (id) => {
    await db.deleteGoal(id);
    await loadData();
  };

  const performCheckin = async (goalId, value = 1, notes = "") => {
    await db.addCheckin({ goalId, date: new Date().toISOString(), value, notes });
    // Refetching might be heavy if done globally, but ok for now.
    // If needed we can return the ID.
  };

  return {
    goals,
    loading,
    error,
    refresh: loadData,
    createNewGoal,
    removeGoal,
    performCheckin
  };
}
