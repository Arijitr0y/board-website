
'use client';

import { FormEvent, useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

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

  const handleOtpSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMsg(null);

    try {
       const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email',
      });

      if (error) throw error;

      // On success, redirect to dashboard
      window.location.href = '/admin/dashboard';

    } catch (err: any) {
       setError(err.message ?? 'Failed to verify OTP.');
    } finally {
       setLoading(false);
    }
  };

  if (step === 'otp') {
    return (
        <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                id="otp"
                type="text"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Verifying...' : 'Verify OTP & Sign In'}
            </Button>
            {error && <p className="text-sm text-center text-destructive pt-2">{error}</p>}
            {msg && <p className="text-sm text-center text-muted-foreground pt-2">{msg}</p>}
        </form>
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
