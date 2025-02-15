import { supabase } from "@/lib/supabase";
import { Soldier } from "@/types/soldier";
import { useCallback, useState } from "react";

export const useSoldierData = () => {
  const [soldiers, setSoldiers] = useState<Soldier[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSoldiersData = useCallback(async (page: number, limit: number) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('soldiers').select('*').range(page, limit);
      if (error) {
        throw new Error(error.message);
      }
      setSoldiers(data);
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
      const { data, error } = await supabase.from('soldiers').insert([soldierData]);
      if (error) {
        throw new Error(error.message);
      }
      setSoldiers(prev => [...prev, (data || [])[0]]);
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSoldier = useCallback(async (soldierId: string, soldierData: Partial<Soldier>) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('soldiers').update(soldierData).eq('id', soldierId);
      if (error) {
        throw new Error(error.message);
      }
      const firstData = data ? data[0] : {}
      setSoldiers(prev => prev.map(soldier => soldier.id === soldierId ? { ...soldier, ...firstData } : soldier));
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteSoldier = useCallback(async (soldierId: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.from('soldiers').delete().eq('id', soldierId);
      if (error) {
        throw new Error(error.message);
      }
      setSoldiers(prev => prev.filter(soldier => soldier.id !== soldierId));
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  return { soldiers, loading, error, fetchSoldiersData, addSoldier, updateSoldier, deleteSoldier };
};