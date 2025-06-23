import { supabase } from './supabase';

export const signUp = async (email: string, password: string, role: 'admin' | 'user') => {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) throw error;

  if (data.user) {
    await supabase.from('profiles').insert([{ id: data.user.id, role }]);
  }

  return data;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
};

export const getUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data?.user || null;
};

export const getUserRole = async (userId: string) => {
  const { data, error } = await supabase.from('profiles').select('role').eq('id', userId).single();

  if (error) throw error;
  return data.role;
};

export const signOut = async () => {
  await supabase.auth.signOut();
};
