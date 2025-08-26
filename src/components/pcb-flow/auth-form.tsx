
'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { toast } from '@/hooks/use-toast'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useToggle } from '@/hooks/use-toggle'
import { supabase } from '@/lib/supabase-client'

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

const signupSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required.' }),
  lastName: z.string().min(1, { message: 'Last name is required.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
});

const otpSchema = z.object({
    otp: z.string().min(6, { message: 'Please enter the 6-digit code.' }),
});


// Create a combined schema for type inference that includes all possible fields.
const combinedSchema = loginSchema.merge(signupSchema).merge(otpSchema);
type AuthFormValues = z.infer<typeof combinedSchema>;


export function AuthForm({ view: initialView = 'login' }: { view?: 'login' | 'signup' }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formType, setFormType] = useState<'login' | 'signup' | 'otp'>(initialView)
  const [signupData, setSignupData] = useState<AuthFormValues | null>(null);
  const router = useRouter()
  const [showPassword, toggleShowPassword] = useToggle(false);
  const [otpTimer, setOtpTimer] = useState(180); // 3 minutes in seconds
  const [isTimerActive, setIsTimerActive] = useState(false);
  
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);


  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isTimerActive && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (otpTimer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, otpTimer]);


  const currentSchema = formType === 'login' ? loginSchema : formType === 'signup' ? signupSchema : otpSchema;

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
      otp: '',
    },
  });
  
  useEffect(() => {
    // When the form type changes, update the resolver and reset form values.
    form.reset();
    setOtp(new Array(6).fill(''));
  }, [formType, form]);

  const handleResendOtp = async () => {
      if (!signupData?.email) return;
      setIsSubmitting(true);
      try {
        const { error } = await supabase.auth.signInWithOtp({
          email: signupData.email,
          options: { shouldCreateUser: false }, // Should not create a user again
        });
        if (error) throw error;
        toast({ title: 'New OTP Sent', description: 'Please check your email for the new code.' });
        setOtpTimer(180); // Reset timer
        setIsTimerActive(true); // Restart timer
      } catch (error) {
        console.error('Error resending OTP:', error);
        toast({ variant: 'destructive', title: 'Error Resending OTP', description: (error as Error).message });
      } finally {
        setIsSubmitting(false);
      }
  }


  const handleAuthAction = async (values: AuthFormValues) => {
    setIsSubmitting(true)
    try {
        if (formType === 'login') {
            const { email, password } = values as z.infer<typeof loginSchema>;
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            toast({ title: 'Login Successful', description: "Welcome back!" })
            window.location.href = '/account/dashboard';
        } else if (formType === 'signup') {
            const { email, password } = values as z.infer<typeof signupSchema>;
            setSignupData(values); 
            
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                // If a user is already logged in, sign them out before signing up a new one.
                await supabase.auth.signOut();
            }

            const { error } = await supabase.auth.signUp({ email, password });
            if (error) throw error;
            
            toast({ title: 'OTP Sent', description: 'Please check your email for the verification code.' });
            setFormType('otp');
            setIsTimerActive(true);
            setOtpTimer(180);
        } else if (formType === 'otp') {
            const { otp } = values as z.infer<typeof otpSchema>;
            if (!signupData || !signupData.email || !signupData.password) {
                throw new Error('Signup data is missing. Please try signing up again.');
            }

            const { email, password, firstName, lastName, phone } = signupData;

            const { data, error: verifyError } = await supabase.auth.verifyOtp({
                email,
                token: otp,
                type: 'email',
            });
            
            if (verifyError) throw verifyError;
            if (!data.user) throw new Error('OTP verification failed to return a user.');
            
            setIsTimerActive(false);

            // Log in with the verified user credentials to establish a session
            const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
            if (signInError) throw new Error(`Could not set password: ${signInError.message}`);

            const { error: profileError } = await supabase
              .from('profiles')
              .update({
                full_name: `${firstName} ${lastName}`,
                phone: phone,
                email: email,
              })
              .eq('id', data.user.id);
            
            if (profileError) throw new Error(`Could not save profile: ${profileError.message}`);

            toast({ title: 'Sign Up Successful!', description: 'Your account has been created.' });
            window.location.href = '/account/dashboard';
        }
    } catch (error: any) {
        console.error(`Error during ${formType}:`, error);
        toast({
            variant: 'destructive',
            title: `${formType.charAt(0).toUpperCase() + formType.slice(1)} Failed`,
            description: error.message || 'An unknown error occurred.',
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    const value = element.value.replace(/[^0-9]/g, ''); // Only allow numbers
    
    if (value.length > 1) {
        // Handle paste
        if (value.length === 6) {
            const newOtp = value.split('');
            setOtp(newOtp);
            form.setValue('otp', value, { shouldValidate: true });
            inputRefs.current[5]?.focus();
        }
        return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    form.setValue('otp', newOtp.join(''), { shouldValidate: true });

    // Move to next input if a digit is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };


  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
            {formType === 'login' && 'Login'}
            {formType === 'signup' && 'Create an Account'}
            {formType === 'otp' && 'Enter Verification Code'}
        </CardTitle>
        <CardDescription>
          {formType === 'login' && 'Enter your credentials to access your account.'}
          {formType === 'signup' && 'Enter your details to get started.'}
          {formType === 'otp' && `A 6-digit code was sent to ${signupData?.email}.`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAuthAction)} className="space-y-4">
             {formType === 'signup' && (
              <>
                 <div className="grid grid-cols-2 gap-4">
                    <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                            <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                 <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 98765 43210" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {formType !== 'otp' && (
                <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••" 
                            {...field}
                            className="pr-10"
                           />
                        </FormControl>
                        <button 
                            type="button" 
                            onClick={toggleShowPassword}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"
                        >
                           {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </>
            )}
            
            {formType === 'otp' && (
                 <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>One-Time Password</FormLabel>
                        <FormControl>
                            <div className="flex justify-between gap-2">
                                {otp.map((data, index) => (
                                    <Input
                                        key={index}
                                        type="text"
                                        maxLength={1}
                                        value={data}
                                        onChange={e => handleOtpChange(e.target, index)}
                                        onKeyDown={e => handleKeyDown(e, index)}
                                        ref={el => (inputRefs.current[index] = el)}
                                        className="w-10 h-10 text-center text-lg"
                                    />
                                ))}
                            </div>
                        </FormControl>
                        {/* Hidden input to hold the combined OTP for react-hook-form */}
                        <input type="hidden" {...field} />
                        <FormMessage />
                    </FormItem>
                  )}
                />
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {formType === 'login' && 'Log In'}
              {formType === 'signup' && 'Sign Up'}
              {formType === 'otp' && 'Verify & Create Account'}
            </Button>
          </form>
        </Form>
      </CardContent>
       <CardFooter className="flex-col items-start gap-2">
         {formType === 'otp' && (
            <div className="text-sm text-muted-foreground">
              {isTimerActive && otpTimer > 0 ? (
                <span>Resend OTP in {Math.floor(otpTimer / 60)}:{otpTimer % 60 < 10 ? `0${otpTimer % 60}` : otpTimer % 60}</span>
              ) : (
                <>
                    Didn't receive a code?{' '}
                    <Button variant="link" size="sm" className="p-0 h-auto" onClick={handleResendOtp} disabled={isSubmitting}>
                        Resend OTP
                    </Button>
                </>
              )}
            </div>
         )}
        <p className="text-sm text-muted-foreground text-center w-full">
          {formType === 'login' ? "Don't have an account?" : "Already have an account?"}
          <Button variant="link" onClick={() => setFormType(formType === 'login' ? 'signup' : 'login')}>
            {formType === 'login' ? 'Sign Up' : 'Log In'}
          </Button>
        </p>
      </CardFooter>
    </Card>
  )
}
