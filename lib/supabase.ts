import { createClient } from '@supabase/supabase-js';

// Get the Supabase URL and anon key from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definition for the parenting_schedules table
export interface ParentingSchedule {
  id?: number;
  full_name: string;
  case_number?: string | null;
  children_names?: string | null;
  phone?: string | null;
  email: string;
  holidays?: any; // JSONB type
  schedule_type?: string;
  start_date?: string | null;
  effective_date?: string | null;
  want_consultation?: boolean;
  zip_code?: string | null;
  parent_a_name?: string | null;
  parent_a_color?: string;
  parent_b_name?: string | null;
  parent_b_color?: string;
  jurisdiction?: string | null;
  school_breaks?: any; // JSONB type
  created_at?: string;
  updated_at?: string;
  deleted?: boolean;
}

// Function to insert a new parenting schedule
export async function insertParentingSchedule(data: ParentingSchedule) {
  const { data: result, error } = await supabase
    .from('parenting_schedules')
    .insert([
      {
        full_name: data.full_name,
        case_number: data.case_number,
        children_names: data.children_names,
        phone: data.phone,
        email: data.email,
        holidays: data.holidays || [],
        schedule_type: data.schedule_type || '2-2-3',
        start_date: data.start_date,
        effective_date: data.effective_date,
        want_consultation: data.want_consultation || false,
        zip_code: data.zip_code,
        parent_a_name: data.parent_a_name,
        parent_a_color: data.parent_a_color || '#3b82f6',
        parent_b_name: data.parent_b_name,
        parent_b_color: data.parent_b_color || '#ec4899',
        jurisdiction: data.jurisdiction,
        school_breaks: data.school_breaks,
      },
    ])
    .select();

  if (error) {
    console.error('Error inserting parenting schedule:', error);
    throw error;
  }

  return result;
}
