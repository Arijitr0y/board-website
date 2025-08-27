'use client';
import { createClient } from '@/lib/supabase/client';
import { Button } from '../ui/button';
import { useLoading } from '@/context/loading-context';

export function SignOutButton() {
  const supabase = createClient();
  const { setIsLoading } = useLoading();
  return (
    <Button
      variant="outline"
      onClick={async () => {
        await supabase.auth.signOut();
        setIsLoading(true);
        window.location.href = '/';
      }}
    >
      Sign out
    </Button>
  );
}
