
'use client';

import { FormEvent, useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import type { User } from '@supabase/supabase-js';


type Mode = 'signin' | 'signup';

export default function AuthForm({ mode }: { mode: Mode }) {
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'details' | 'otp' | 'password'>('details');
  const [verifiedUser, setVerifiedUser] = useState<User | null>(null);
  
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const [countdown, setCountdown] = useState(120);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'otp' && countdown > 0) {
      setIsResendDisabled(true);
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsResendDisabled(false);
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);


  useEffect(() => {
    if (otp.length === 6 && mode === 'signup') {
      handleOtpSubmit();
    }
  }, [otp]);


  const handleSignUpDetailsSubmit = async (e?: FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setError(null);
    setMsg(null);
    setCountdown(120);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: true,
          data: {
            full_name: name,
            phone: phoneNumber
          },
        },
      });
      if (error) throw error;
      setMsg(`OTP sent to ${email}. Check your inbox!`);
      setStep('otp');
    } catch (err: any) {
      setError(err.message ?? 'Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    await handleSignUpDetailsSubmit();
    setLoading(false);
  };

  const handleOtpSubmit = async () => {
    if (otpLoading) return; // Prevent multiple submissions
    setOtpLoading(true);
    setError(null);
    setMsg(null);

    try {
       const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email',
      });

      if (error) throw error;
      if (!data.user) throw new Error("Could not verify user.");
      
      setVerifiedUser(data.user);
      setMsg("Email verified successfully! Please set your password.");
      setStep('password');

    } catch (err: any)       {
      let errorMessage = 'Failed to verify OTP.';
      if (err.message) {
        if (err.message.includes('expired')) {
          errorMessage = 'Your OTP has expired. Please request a new one.';
        } else if (err.message.includes('invalid')) {
          errorMessage = 'The OTP you entered is invalid.';
        }
      }
      setError(errorMessage);
      setOtp(''); // Clear OTP input on error
    } finally {
       setOtpLoading(false);
    }
  };

  const handlePasswordSetSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
        const { error } = await supabase.auth.updateUser({ password: password });
        if (error) throw error;

        // Password set, now sign out and sign in properly to establish session
        await supabase.auth.signOut();
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        if(signInError) throw signInError;
        
        window.location.href = '/order';
    } catch (err: any) {
        setError(err.message ?? 'Failed to set password.');
    } finally {
        setLoading(false);
    }
  };


  const handleSignInSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      window.location.href = '/order';
    } catch (err: any) {
      setError(err.message ?? 'Failed to sign in.');
    } finally {
      setLoading(false);
    }
  };


  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  if (mode === 'signin') {
     return (
        <form onSubmit={handleSignInSubmit} className="space-y-4">
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
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Signing In...' : 'Sign In'}
            </Button>
            {error && <p className="text-sm text-center text-destructive pt-2">{error}</p>}
        </form>
    );
  }

  // Signup flow
  if (step === 'otp') {
    return (
        <div className="space-y-4">
            <div className="space-y-2 text-center">
                <Label htmlFor="otp">Enter OTP</Label>
                <p className="text-sm text-muted-foreground">An OTP has been sent to {email}</p>
            </div>
             <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
              disabled={otpLoading || countdown === 0}
            >
              <InputOTPGroup className="mx-auto">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {otpLoading && <p className="text-sm text-center text-muted-foreground animate-pulse">Verifying...</p>}
            
            <div className="text-center text-sm text-muted-foreground">
              {countdown > 0 ? (
                <span>Time remaining: {formatTime(countdown)}</span>
              ) : (
                <Button
                  variant="link"
                  size="sm"
                  onClick={handleResend}
                  disabled={isResendDisabled || loading}
                  className="p-0"
                >
                  {loading ? 'Sending...' : 'Resend OTP'}
                </Button>
              )}
            </div>

            {error && <p className="text-sm text-center text-destructive pt-2">{error}</p>}
            {msg && !error && <p className="text-sm text-center text-muted-foreground pt-2">{msg}</p>}

            <Button variant="link" size="sm" onClick={() => { setStep('details'); setError(null); setMsg(null); }} className="w-full">
              Use a different email
            </Button>
        </div>
    );
  }

  if (step === 'password') {
    return (
        <form onSubmit={handlePasswordSetSubmit} className="space-y-4">
            <div className="space-y-2 text-center">
                <Label>Create Your Password</Label>
                <p className="text-sm text-muted-foreground">Your email has been verified. Set a password to complete your account.</p>
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    placeholder="Choose a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
             <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Saving...' : 'Create Account'}
            </Button>
            {error && <p className="text-sm text-center text-destructive pt-2">{error}</p>}
        </form>
    );
  }


  return (
    <form onSubmit={handleSignUpDetailsSubmit} className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
        </div>
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
        <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
                id="phone"
                type="tel"
                placeholder="+91 12345 67890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
        </div>
      
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Sending OTP...' : 'Continue'}
      </Button>
      {error && <p className="text-sm text-center text-destructive pt-2">{error}</p>}
      {msg && <p className="text-sm text-center text-muted-foreground pt-2">{msg}</p>}
    </form>
  );
}
