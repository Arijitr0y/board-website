
'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
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

// Create a combined schema for type inference that includes all possible fields.
const combinedSchema = loginSchema.merge(signupSchema.partial());
type AuthFormValues = z.infer<typeof combinedSchema>;


export function AuthForm({ view: initialView = 'login' }: { view?: 'login' | 'signup' }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formType, setFormType] = useState<'login' | 'signup'>(initialView)
  const supabase = createClientComponentClient()
  const router = useRouter()
  const [showPassword, toggleShowPassword] = useToggle(false);

  const currentSchema = formType === 'login' ? loginSchema : signupSchema;

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
    },
  });
  
  useEffect(() => {
    // When the form type changes, update the resolver and reset form values.
    form.reset();
  }, [formType, form]);


  const handleAuthAction = async (values: AuthFormValues) => {
    setIsSubmitting(true)
    if (formType === 'login') {
      const { email, password } = values as z.infer<typeof loginSchema>;
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast({ variant: 'destructive', title: 'Login Failed', description: error.message })
      } else {
        toast({ title: 'Login Successful', description: "Welcome back!" })
        router.push('/account/dashboard')
        router.refresh()
      }
    } else {
      const { email, password, firstName, lastName, phone } = values as z.infer<typeof signupSchema>;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            phone,
          },
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      })
      if (error) {
        toast({ variant: 'destructive', title: 'Sign Up Failed', description: error.message })
      } else {
        toast({ title: 'Confirmation Email Sent', description: 'Please check your email to complete the sign up process.' })
      }
    }
    setIsSubmitting(false)
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{formType === 'login' ? 'Login' : 'Create an Account'}</CardTitle>
        <CardDescription>
          {formType === 'login' 
            ? 'Enter your credentials to access your account.' 
            : 'Enter your details to get started.'}
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
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {formType === 'login' ? 'Log In' : 'Sign Up'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
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
