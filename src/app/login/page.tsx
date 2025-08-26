
'use client'
import { createClient } from '@/lib/supabase/client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Header } from '@/components/pcb-flow/header'
import { useTheme } from 'next-themes'

export default function LoginPage() {
  const supabase = createClient()
  const { theme } = useTheme()

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900/50 p-4">
        <div className="w-full max-w-sm">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome</CardTitle>
              <CardDescription>
                Sign in to your account or create a new one to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                theme={theme === 'dark' ? 'dark' : 'default'}
                providers={['google', 'github']}
                redirectTo={`${location.origin}/auth/callback`}
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
