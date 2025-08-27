
'use client';

import { FormEvent, useState, useRef, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"


type Mode = 'signin' | 'signup';

export default function AuthForm({ mode }: { mode: Mode }) {
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  
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
    if (otp.length === 6) {
      handleOtpSubmit();
    }
  }, [otp]);


  const handleEmailSubmit = async (e?: FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setError(null);
    setMsg(null);
    setCountdown(120);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: mode === 'signup',
          data: mode === 'signup' ? {
            full_name: name,
            phone: phoneNumber
          } : undefined,
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
    await handleEmailSubmit();
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

      // On success, redirect to customer order page
      window.location.href = '/order';

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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

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

            <Button variant="link" size="sm" onClick={() => { setStep('email'); setError(null); setMsg(null); }} className="w-full">
              Use a different email
            </Button>
        </div>
    );
  }

  return (
    <form onSubmit={handleEmailSubmit} className="space-y-4">
      {mode === 'signup' && (
        <>
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
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 12345 67890"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
              />
          </div>
        </>
      )}
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
        {loading ? 'Sending...' : 'Send OTP'}
      </Button>
      {error && <p className="text-sm text-center text-destructive pt-2">{error}</p>}
      {msg && <p className="text-sm text-center text-muted-foreground pt-2">{msg}</p>}
    </form>
  );
}
