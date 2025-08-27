
'use client';

import { FormEvent, useState, useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useLoading } from '@/context/loading-context';
import { Label } from '../ui/label';

type Mode = 'signin' | 'signup';

export default function AuthForm({ mode }: { mode: Mode }) {
  const supabase = createClient();
  const { setIsLoading } = useLoading();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(120);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (otpSent && timer > 0) {
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [otpSent, timer]);

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMsg(null);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: mode === 'signup',
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
      setMsg(`OTP sent to ${email}`);
      setOtpSent(true);
      setTimer(120); // Reset timer
    } catch (err: any) {
      setError(err.message ?? 'Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: email,
        token: otp,
        type: 'email',
      });
      if (error) throw error;

      // On success, redirect
      if (data.session) {
        setIsLoading(true);
        window.location.href = '/admin/dashboard';
      } else {
        throw new Error("Couldn't verify OTP. Please try again.");
      }
    } catch (err: any) {
      setError(err.message ?? 'Invalid OTP.');
    } finally {
      setLoading(false);
    }
  };

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  if (!otpSent) {
    return (
      <form onSubmit={handleEmailSubmit} className="space-y-4">
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

  return (
    <form onSubmit={handleOtpSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="otp">One-Time Password</Label>
        <Input
          id="otp"
          type="text"
          inputMode="numeric"
          placeholder="123456"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
      </div>
      <Button type="submit" disabled={loading || timer === 0} className="w-full">
        {loading ? 'Verifying...' : 'Verify OTP'}
      </Button>
      <div className="text-center text-sm text-muted-foreground">
        {timer > 0 ? (
          <p>Resend OTP in {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
        ) : (
          <Button
            variant="link"
            type="button"
            className="p-0 h-auto"
            onClick={(e) => {
              setOtpSent(false);
              setOtp('');
              setError(null);
              setMsg(null);
              handleEmailSubmit(e);
            }}
          >
            Resend OTP
          </Button>
        )}
      </div>
       {error && <p className="text-sm text-center text-destructive pt-2">{error}</p>}
       {msg && <p className="text-sm text-center text-muted-foreground pt-2">{msg}</p>}
    </form>
  );
}
