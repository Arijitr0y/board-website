
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/pcb-flow/header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Loader2, User as UserIcon, Shield } from 'lucide-react';
import Link from 'next/link';

export default function MyAccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();

      // The key change is here: we only redirect if the auth check completes
      // and we definitively have no user. We don't redirect on the initial
      // loading state where data.user might be temporarily null.
      if (error || !data.user) {
        router.push('/login');
      } else {
        setUser(data.user);
      }
      setLoading(false);
    };

    const checkSession = async () => {
        const supabase = createClient();
        const { data } = await supabase.auth.getSession();
        if (!data.session) {
            router.push('/login');
        } else {
            setUser(data.session.user);
            setLoading(false);
        }
    };

    checkSession();
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!user) {
    // This case will likely be brief as the redirect should have already happened.
    return null; 
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight">My Account</h1>
            <p className="text-muted-foreground">Manage your profile, orders, and account settings.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">{user.user_metadata?.full_name || 'User'}</CardTitle>
                        <CardDescription>{user.email}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <Link href="/order-history" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                            Order History
                        </Link>
                         <Link href="#" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                            Support Tickets
                        </Link>
                    </CardContent>
                </Card>
            </div>
            <div className="md:col-span-2 space-y-8">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><UserIcon className="h-5 w-5"/> Profile Information</CardTitle>
                        <CardDescription>Update your personal details here.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input id="fullName" defaultValue={user.user_metadata?.full_name} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" defaultValue={user.email} disabled />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" type="tel" defaultValue={user.user_metadata?.phone} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save Changes</Button>
                    </CardFooter>
                </Card>
                
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5"/> Login & Security</CardTitle>
                        <CardDescription>Manage your password and secure your account.</CardDescription>
                    </CardHeader>
                     <CardContent>
                        <Button variant="outline">Change Password</Button>
                    </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
