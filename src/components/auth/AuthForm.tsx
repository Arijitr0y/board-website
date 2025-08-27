
'use client';

import { FormEvent, useState, useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useLoading } from '@/context/loading-context';
import { Label } from '../ui/label';

export default function AuthForm() {
  const supabase = createClient();
  const { setIsLoading } = useLoading();
  const [phone, setPhone] = useState('');
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

  const handlePhoneSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMsg(null);

    // Add country code if missing, assuming India for this example
    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;

    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
      });
      if (error) throw error;
      setMsg(`OTP sent to ${formattedPhone}`);
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

    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: otp,
        type: 'sms',
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
      <form onSubmit={handlePhoneSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="e.g., +919876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
              handlePhoneSubmit(e);
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
