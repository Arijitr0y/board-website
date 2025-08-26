
import { AuthForm } from "@/components/pcb-flow/auth-form";
import { Header } from "@/components/pcb-flow/header";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900/50 p-4">
        <AuthForm />
      </main>
    </div>
  );
}
