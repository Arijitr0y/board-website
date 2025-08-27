
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
import Link from 'next/link';
import type { Address } from '@/types';
import { Loader2 } from 'lucide-react';


type Mode = 'signin' | 'signup';

const AddressForm = ({ address, setAddress }: { address: Partial<Address>, setAddress: (addr: Partial<Address>) => void }) => {
    const [isFetchingPincode, setIsFetchingPincode] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setAddress({ ...address, [id]: value });
    };

    const handlePincodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const zip = e.target.value;
        setAddress({ ...address, zip });

        if (zip.length === 6) {
            setIsFetchingPincode(true);
            try {
                const response = await fetch(`https://api.postalpincode.in/pincode/${zip}`);
                const data = await response.json();
                
                if (data && data[0] && data[0].Status === 'Success' && data[0].PostOffice[0]) {
                    const postOffice = data[0].PostOffice[0];
                    setAddress({
                        ...address,
                        zip,
                        city: postOffice.District,
                        state: postOffice.State,
                        country: postOffice.Country,
                    });
                } else {
                    setAddress({ ...address, zip, city: '', state: '', country: 'India' });
                }
            } catch (error) {
                console.error("Failed to fetch pincode data:", error);
                setAddress({ ...address, zip, city: '', state: '', country: 'India' });
            } finally {
                setIsFetchingPincode(false);
            }
        }
    };
    
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="addressLine1">Address Line 1</Label>
                <Input id="addressLine1" value={address.addressLine1 || ''} onChange={handleInputChange} required />
            </div>
            <div className="relative space-y-2">
                <Label htmlFor="zip">ZIP / Pincode</Label>
                <Input id="zip" value={address.zip || ''} onChange={handlePincodeChange} maxLength={6} required />
                {isFetchingPincode && <Loader2 className="absolute right-2 top-8 h-4 w-4 animate-spin" />}
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" value={address.city || ''} onChange={handleInputChange} disabled={isFetchingPincode} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" value={address.state || ''} onChange={handleInputChange} disabled={isFetchingPincode} required />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" value={address.country || ''} onChange={handleInputChange} disabled={isFetchingPincode} required />
            </div>
        </div>
    );
};


export default function AuthForm({ mode }: { mode: Mode }) {
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [address, setAddress] = useState<Partial<Address>>({});
  const [step, setStep] = useState<'details' | 'otp' | 'address' | 'password'>('details');
  
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const [countdown, setCountdown] = useState(120);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  // Temporary auto-login for testing in Firebase Studio
  useEffect(() => {
    const autoLogin = async () => {
      if (mode === 'signin') {
        const testEmail = 'arijit1roy@gmail.com';
        const testPassword = 'arijit1roy@gmail.com';

        // Check if we are already logged in to prevent loops
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
           window.location.href = '/order';
           return;
        }

        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
          email: testEmail,
          password: testPassword,
        });

        if (error) {
          // If login fails, it might be the first time, so try to sign up the user.
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: testEmail,
            password: testPassword,
            options: {
              data: {
                full_name: 'Arijit Roy (Test)'
              }
            }
          });
          if (!signUpError) {
             // After sign up, sign in again
             const { error: signInAgainError } = await supabase.auth.signInWithPassword({
                email: testEmail,
                password: testPassword,
             });
             if (!signInAgainError) {
                window.location.href = '/order';
             } else {
                setError(`Test user created, but failed to log in: ${signInAgainError.message}`);
             }
          } else {
            // User exists, but login failed (e.g. wrong password)
            console.error("Auto-login failed:", error.message);
            setError(`Auto-login failed. Please sign in manually. (${error.message})`);
          }
        } else {
          window.location.href = '/order';
        }
        setLoading(false);
      }
    };
    // autoLogin(); // Uncomment to enable auto-login
  }, [mode, supabase]);


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
  }, [otp, mode]);


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
      
      setMsg("Email verified successfully! Please enter your address.");
      setStep('address');

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

  const handleAddressSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStep('password');
  };

  const handlePasswordSetSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const completeAddress: Address = {
        fullName: name,
        companyName: address.companyName || '',
        gstNumber: address.gstNumber || '',
        addressLine1: address.addressLine1 || '',
        city: address.city || '',
        state: address.state || '',
        zip: address.zip || '',
        country: address.country || '',
        phone: phoneNumber
    };

    try {
        const { error } = await supabase.auth.updateUser({ 
            password: password,
            data: {
                // We re-supply all metadata here
                full_name: name,
                phone: phoneNumber,
                // And add the new address
                shipping_address: completeAddress,
                billing_address: completeAddress,
            }
        });
        if (error) throw error;

        // Password set, now sign out and sign in properly to establish session
        await supabase.auth.signOut();
        const { error: signInError } = await supabase.auth.signInWithPassword({
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
                <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                        Forgot Password?
                    </Link>
                </div>
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

  if (step === 'address') {
    return (
        <form onSubmit={handleAddressSubmit} className="space-y-4">
            <div className="space-y-2 text-center">
                <Label>Your Shipping Address</Label>
                <p className="text-sm text-muted-foreground">Enter your primary shipping address to continue.</p>
            </div>
            <AddressForm address={address} setAddress={setAddress} />
            <Button type="submit" disabled={loading} className="w-full">
                Continue
            </Button>
        </form>
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
