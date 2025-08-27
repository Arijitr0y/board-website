
import AuthForm from '@/components/auth/AuthForm';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Header } from '@/components/pcb-flow/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default async function SignupPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect('/admin/dashboard');

  return (
     <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900/50">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Create your account</CardTitle>
                    <CardDescription>Fill in the details below to get started.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AuthForm mode="signup" />
                     <p className="text-center text-sm text-muted-foreground mt-4">
                        Already have an account? <Link href="/login" className="text-primary hover:underline">Sign In</Link>
                    </p>
                </CardContent>
            </Card>
        </main>
    </div>
  );
}
