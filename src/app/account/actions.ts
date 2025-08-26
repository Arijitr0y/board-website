'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function deleteUserAccount() {
  const supabase = createServerActionClient({ cookies });

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not found.');
  }

  // To delete a user, we need admin privileges.
  // The service_role key must be available in environment variables.
  // Ensure SUPABASE_SERVICE_ROLE_KEY is set in your .env file.
  const supabaseAdmin = createServerActionClient({
    cookies,
  }, {
    supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL
  });

  const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id);

  if (error) {
    throw new Error(error.message);
  }

  // Revalidate the path to reflect the user is logged out.
  revalidatePath('/');
  return { success: true };
}
