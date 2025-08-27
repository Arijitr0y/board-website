
import AuthForm from '@/components/auth/AuthForm';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Header } from '@/components/pcb-flow/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default async function LoginPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect('/order');

  return (
    <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900/50">
            <Tabs defaultValue="signin" className="w-full max-w-md">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Create Account</TabsTrigger>
                </TabsList>
                <TabsContent value="signin">
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl">Sign In</CardTitle>
                            <CardDescription>Enter your email and password to access your account.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <AuthForm mode="signin" />
                        </CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="signup">
                    <Card>
                         <CardHeader className="text-center">
                            <CardTitle className="text-2xl">Create an Account</CardTitle>
                            <CardDescription>Enter your details to get started. We'll verify your email with an OTP.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <AuthForm mode="signup" />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </main>
    </div>
  );
}
