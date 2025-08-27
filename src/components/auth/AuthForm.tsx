
'use client';

import { FormEvent, useState } from 'react';
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
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
              title: title,
              phone: phone,
            },
            emailRedirectTo: `${location.origin}/auth/callback`,
          },
        });
        if (error) throw error;
        setMsg('Check your email to confirm your account.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        // On success, reload or navigate
        setIsLoading(true);
        window.location.href = '/admin/dashboard';
      }
    } catch (err: any) {
      setMsg(err.message ?? 'Auth error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-sm">
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
              placeholder="+1 234 567 890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </>
      )}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
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
      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading ? 'Processing...' : (mode === 'signup' ? 'Create account' : 'Sign in')}
      </Button>
      {msg && <p className="text-sm text-center text-muted-foreground pt-2">{msg}</p>}
    </form>
  );
}
