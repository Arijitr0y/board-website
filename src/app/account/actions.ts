
'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { createClient } from '@supabase/supabase-js';

export async function deleteUserAccount() {
  const supabase = createServerActionClient({ cookies });

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not found.');
  }

  // To delete a user, we need admin privileges.
  // The service_role key must be available in environment variables.
  // Ensure SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL are set in your .env.local file.
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing Supabase environment variables for admin action.');
  }
  
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );


  const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id);

  if (error) {
    throw new Error(error.message);
  }

  // Revalidate the path to reflect the user is logged out.
  revalidatePath('/');
  return { success: true };
}
