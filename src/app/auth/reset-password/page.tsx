
'use client';

import { useState, FormEvent, useEffect, Suspense } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/pcb-flow/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

function ResetPasswordForm() {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) {
        setError("Invalid reset link. No verification code found.");
    } else {
        setShowForm(true);
    }
  }, [searchParams]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
    }

    setLoading(true);
    setError(null);
    setMsg(null);

    try {
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
        setMsg("Your password has been successfully updated! Redirecting to login...");
        setTimeout(() => {
            router.push('/login');
        }, 3000);
    } catch (err: any) {
      setError(err.message ?? "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  if (!showForm) {
      return (
           <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Invalid Link</CardTitle>
                </CardHeader>
                <CardContent>
                     {error && <p className="text-sm text-center text-destructive">{error}</p>}
                </CardContent>
            </Card>
      )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Reset Your Password</CardTitle>
        <CardDescription>Enter your new password below.</CardDescription>
      </CardHeader>
      <CardContent>
        {msg ? (
            <p className="text-sm text-center text-green-600">{msg}</p>
        ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                />
            </div>
             <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="••••••••"
                />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? 'Updating...' : 'Update Password'}
            </Button>
            {error && <p className="text-sm text-center text-destructive pt-2">{error}</p>}
            </form>
        )}
      </CardContent>
    </Card>
  );
}

export default function ResetPasswordPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1 flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900/50">
                <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin" />}>
                   <ResetPasswordForm />
                </Suspense>
            </main>
        </div>
    );
}
