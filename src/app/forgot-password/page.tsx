
'use client';

import { useState, FormEvent, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Header } from '@/components/pcb-flow/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [countdown, setCountdown] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'otp' && isResendDisabled) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            setIsResendDisabled(false);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, isResendDisabled]);
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleSendOtp = async (e?: FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setError(null);
    setMsg(null);

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        // A dummy redirect URL is required by Supabase for this flow, 
        // but it won't be used since we are handling the OTP on the client.
        redirectTo: `${window.location.origin}/auth/callback`,
    });

    if (resetError) {
      setError(resetError.message ?? "Could not send password reset email. Please ensure the email is registered.");
    } else {
      setMsg(`A password reset OTP has been sent to ${email}.`);
      setStep('otp');
      setIsResendDisabled(true);
      setCountdown(60);
    }
    setLoading(false);
  };

  const handleResetPassword = async (e: FormEvent) => {
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

    // Step 1: Verify the OTP. This creates a temporary, single-use session.
    const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'recovery',
    });
    
    if (verifyError) {
        let errorMessage = 'Failed to reset password.';
        if (verifyError.message.includes('expired')) {
            errorMessage = 'Your OTP has expired. Please request a new one.';
        } else if (verifyError.message.includes('invalid') || verifyError.message.includes('Token has invalid')) {
            errorMessage = 'The OTP you entered is invalid.';
        }
        setError(errorMessage);
        setLoading(false);
        return;
    }

    // Step 2: With the temporary session from the verified OTP, update the password.
    const { error: updateError } = await supabase.auth.updateUser({ password });
    
    if (updateError) {
        setError(updateError.message ?? "Could not update password. The session might have expired.");
        setLoading(false);
        return;
    }
    
    // Step 3: Sign out to clear the recovery session and force a new login.
    await supabase.auth.signOut();
        
    setMsg("Your password has been successfully updated! You can now sign in.");
    
    setTimeout(() => {
        router.push('/login');
    }, 2000);
        
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900/50">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Forgot Password</CardTitle>
                    <CardDescription>
                        {step === 'email' 
                            ? "Enter your email address and we'll send you an OTP to reset your password."
                            : "Check your email for the OTP and enter it below."
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {msg && <p className="mb-4 text-sm text-center text-green-600">{msg}</p>}
                    
                    {step === 'email' && (
                        <form onSubmit={handleSendOtp} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                />
                            </div>
                            <Button type="submit" disabled={loading} className="w-full">
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {loading ? 'Sending...' : 'Send OTP'}
                            </Button>
                        </form>
                    )}

                    {step === 'otp' && (
                        <form onSubmit={handleResetPassword} className="space-y-4">
                             <div className="space-y-2">
                                <Label htmlFor="otp">Enter OTP</Label>
                                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                                    <InputOTPGroup className="mx-auto">
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                                <div className="text-center text-sm text-muted-foreground pt-1">
                                  {isResendDisabled ? (
                                    <span>Resend OTP in: {formatTime(countdown)}</span>
                                  ) : (
                                    <Button
                                      variant="link"
                                      size="sm"
                                      onClick={() => {
                                        handleSendOtp();
                                      }}
                                      disabled={loading}
                                      className="p-0 h-auto"
                                      type="button"
                                    >
                                      {loading ? 'Sending...' : 'Resend OTP'}
                                    </Button>
                                  )}
                                </div>
                             </div>
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
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </Button>
                        </form>
                    )}

                    {error && <p className="text-sm text-center text-destructive pt-4">{error}</p>}
                     
                     <div className="mt-4 text-center text-sm">
                        Remember your password?{' '}
                        <Link href="/login" className="underline">
                            Sign In
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </main>
    </div>
  );
}
