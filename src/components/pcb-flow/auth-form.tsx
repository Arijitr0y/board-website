
'use client'

import { useState } from 'react'
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
import { Loader2 } from 'lucide-react'

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
})

export function AuthForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formType, setFormType] = useState<'login' | 'signup'>('login')
  const supabase = createClientComponentClient()
  const router = useRouter()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleAuthAction = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    if (formType === 'login') {
      const { error } = await supabase.auth.signInWithPassword(values)
      if (error) {
        toast({ variant: 'destructive', title: 'Login Failed', description: error.message })
      } else {
        toast({ title: 'Login Successful', description: "Welcome back!" })
        router.push('/account/dashboard')
        router.refresh()
      }
    } else {
      const { error } = await supabase.auth.signUp({
        ...values,
        options: {
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
            : 'Enter your email and password to get started.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAuthAction)} className="space-y-4">
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
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
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
