import { AuthForm } from '@/components/auth/auth-form'
import { Header } from '@/components/pcb-flow/header'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <AuthForm />
      </main>
    </div>
  )
}
