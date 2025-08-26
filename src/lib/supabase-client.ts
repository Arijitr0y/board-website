
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const supabase = createClientComponentClient({
  supabaseUrl: "https://szltcxtyfswimfludums.supabase.co",
  supabaseKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6bHRjeHR5ZnN3aW1mbHVkdW1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYyMjYzOTgsImV4cCI6MjA3MTgwMjM5OH0.g1JBaZMdylsjsxoM5T4Znzfb5JMsm1QVINX9eeR5_4E",
});
