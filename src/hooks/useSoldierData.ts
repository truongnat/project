import { Soldier } from '@/types/soldier';
import { useState, useCallback } from 'react';

export const useSoldierData = () => {
  const [soldiers, setSoldiers] = useState<Soldier[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSoldiers = useCallback(async (page?: number, limit?: number) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/soldiers?page=${page}&limit=${limit}`);
      const data = await response.json();
      setSoldiers(data.soldiers);
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const addSoldier = useCallback(async (soldierData: Omit<Soldier, 'id'>) => {
    try {
      setLoading(true);
      const response = await fetch('/api/soldiers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(soldierData),
      });
      const newSoldier = await response.json();
      setSoldiers(prev => [...prev, newSoldier]);
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSoldier = useCallback(async (id: string, updates: Partial<Soldier>) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/soldiers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const updatedSoldier = await response.json();
      setSoldiers(prev => 
        prev.map(soldier => 
          soldier.id === id ? updatedSoldier : soldier
        )
      );
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteSoldier = useCallback(async (id: string) => {
    try {
      setLoading(true);
      await fetch(`/api/soldiers/${id}`, { method: 'DELETE' });
      setSoldiers(prev => prev.filter(soldier => soldier.id !== id));
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    soldiers,
    loading,
    error,
    fetchSoldiers,
    addSoldier,
    updateSoldier,
    deleteSoldier
  };
}; 