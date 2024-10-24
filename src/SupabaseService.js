import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const signInWithEmail = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data.user;
  };
  

export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
};

export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data.user;
};

export const getUserProfile = async () => {
  try {
    const user = supabase.auth.user()

    if (user) {

      const { data, error, status } = await supabase
        .from('profiles')
        .select('full_name, updated_at')
        .single()

      if (error && status === 406) {
        throw new Error('An error has ocurred')
      }

      return {
        username: data.full_name
      }
    }
  } catch (error) {
    console.log(error)
  }
}