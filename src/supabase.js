import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://mbizzrfwhrywrhjlwtoj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1iaXp6cmZ3aHJ5d3Joamx3dG9qIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzgwODQ3MCwiZXhwIjoyMDY5Mzg0NDcwfQ.MsJmacVuXk6cvh-2-FDX1FNB1kf9aqFn7io1xf7IG-s'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase