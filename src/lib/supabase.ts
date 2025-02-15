import { Soldier } from '@/types/soldier';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://oklfvgcouhwrjtwyttjm.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rbGZ2Z2NvdWh3cmp0d3l0dGptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1MTAyMzUsImV4cCI6MjA1NTA4NjIzNX0.1yBxPl3uNFQRNHJzZNUCsc7Bm_2Ew20mCkZXIcC2z8o";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


export const fetchSoldiers = async () => {
    const { data, error } = await supabase.from('soldiers').select('*');
    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export const createSoldier = async (soldierData: Omit<Soldier, 'id'>) => {
    const { data, error } = await supabase.from('soldiers').insert(soldierData);
    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export const updateSoldier = async (soldierId: string, soldierData: Soldier) => {
    const { data, error } = await supabase.from('soldiers').update(soldierData).eq('id', soldierId);
    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export const deleteSoldier = async (soldierId: string) => {
    const { error } = await supabase.from('soldiers').delete().eq('id', soldierId);
    if (error) {
        throw new Error(error.message);
    }
};

export const fetchSoldierById = async (soldierId: string) => {
    const { data, error } = await supabase.from('soldiers').select('*').eq('id', soldierId);
    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export const fetchSoldierByName = async (soldierName: string) => {
    const { data, error } = await supabase.from('soldiers').select('*').eq('name', soldierName);
    if (error) {
        throw new Error(error.message);
    }
    return data;
};