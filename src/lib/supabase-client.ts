
import { createClient } from '@supabase/supabase-js';

// Use the core `createClient` from supabase-js to bypass auth helper issues.
// This provides a more direct and stable connection.
export const supabase = createClient(
  "https://szltcxtyfswimfludums.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6bHRjeHR5ZnN3aW1mbHVkdW1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYyMjYzOTgsImV4cCI6MjA3MTgwMjM5OH0.g1JBaZMdylsjsxoM5T4Znzfb5JMsm1QVINX9eeR5_4E"
);
