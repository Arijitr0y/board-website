
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
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

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
          emailRedirectTo: `${location.origin}/auth/callback`,
          data: mode === 'signup' ? {
            full_name: name,
            title: title,
            phone: phoneNumber
          } : undefined,
        },
      });
      if (error) throw error;
      setMsg(`Magic link sent to ${email}. Check your inbox!`);
    } catch (err: any) {
      setError(err.message ?? 'Failed to send magic link.');
    } finally {
      setLoading(false);
    }
  };

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
              <Label htmlFor="title">Title</Label>
              <Input
                  id="title"
                  type="text"
                  placeholder="Hardware Engineer"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
        {loading ? 'Sending...' : 'Send Magic Link'}
      </Button>
      {error && <p className="text-sm text-center text-destructive pt-2">{error}</p>}
      {msg && <p className="text-sm text-center text-muted-foreground pt-2">{msg}</p>}
    </form>
  );
}
