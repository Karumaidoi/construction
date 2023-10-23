import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://fykmkpzvkqpraezgogsk.supabase.co';

const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5a21rcHp2a3FwcmFlemdvZ3NrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTczNTIxNzUsImV4cCI6MjAxMjkyODE3NX0.0I72nMS-E12AiWLxic3W_5zz1qf812jKeh0_w3Be7Ro';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
