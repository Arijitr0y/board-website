'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import type { Address } from '@/types';

export async function updateUserProfile(formData: {
  fullName: string;
  phone: string;
  companyName: string;
  gstNumber: string;
  shippingAddress: Address | null;
  billingAddress: Address | null;
}) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'You must be logged in to update your profile.' };
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: formData.fullName,
      phone: formData.phone,
      company_name: formData.companyName,
      gst_number: formData.gstNumber,
      shipping_address: formData.shippingAddress,
      billing_address: formData.billingAddress,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id);

  if (error) {
    console.error('Supabase update error:', error);
    return { error: 'Failed to update profile.' };
  }

  revalidatePath('/my-account');
  return { success: true };
}
