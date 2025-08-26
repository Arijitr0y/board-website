'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export function AuthForm() {
  const { toast } = useToast()
  const [formType, setFormType] = useState<'login' | 'signup'>('login')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMessageSent, setIsMessageSent] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleAuthAction = async (data: z.infer<typeof signupSchema>) => {
    setIsSubmitting(true)
    const supabase = createClient()
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    if (!siteUrl) {
      toast({
        variant: 'destructive',
        title: 'Configuration Error',
        description: 'Site URL is not configured. Please set NEXT_PUBLIC_SITE_URL.',
      });
      setIsSubmitting(false);
      return;
    }


    if (formType === 'signup') {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${siteUrl}/auth/callback`,
        },
      })
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Error signing up',
          description: error.message,
        })
      } else {
        setIsMessageSent(true)
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Error signing in',
          description: error.message,
        })
      } else {
        // Redirect to account page after successful login
        window.location.href = '/account'
      }
    }
    setIsSubmitting(false)
  }
  
  if (isMessageSent) {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">Check your email</CardTitle>
                <CardDescription>
                    We've sent a confirmation link to your email address. Please click the link to complete the sign up process.
                </CardDescription>
            </CardHeader>
        </Card>
    )
  }


  return (
    <Card className="w-full max-w-sm">
      <form onSubmit={handleSubmit(handleAuthAction)}>
        <CardHeader>
          <CardTitle className="text-2xl">
            {formType === 'login' ? 'Login' : 'Sign Up'}
          </CardTitle>
          <CardDescription>
            {formType === 'login'
              ? 'Enter your email below to login to your account.'
              : 'Enter your details to create an account.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register('password')} />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {formType === 'login' ? 'Sign In' : 'Sign Up'}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            {formType === 'login'
              ? "Don't have an account?"
              : 'Already have an account?'}
            <Button
              variant="link"
              type="button"
              onClick={() =>
                setFormType(formType === 'login' ? 'signup' : 'login')
              }
              className="px-1"
            >
              {formType === 'login' ? 'Sign up' : 'Sign in'}
            </Button>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
