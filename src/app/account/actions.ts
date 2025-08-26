
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
  // The service_role key must be available.
  // Replace YOUR_SUPABASE_SERVICE_ROLE_KEY with your actual service role key.
  const serviceRoleKey = "YOUR_SUPABASE_SERVICE_ROLE_KEY";

  if (!serviceRoleKey || serviceRoleKey === "YOUR_SUPABASE_SERVICE_ROLE_KEY") {
      throw new Error('Missing Supabase service role key for admin action. Please update it in src/app/account/actions.ts');
  }
  
  const supabaseAdmin = createClient(
    "https://szltcxtyfswimfludums.supabase.co",
    serviceRoleKey,
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
