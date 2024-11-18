// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jtetegxxcatpyjakkcky.supabase.co'; // Reemplaza con tu URL de Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0ZXRlZ3h4Y2F0cHlqYWtrY2t5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk1MTIyNDAsImV4cCI6MjA0NTA4ODI0MH0.pAxwsvAEd80sYbqHE5AF0u_RT7KKDiHnOtw5YQ3BM_0'; // Reemplaza con tu clave anónima
export const supabase = createClient(supabaseUrl, supabaseKey);
