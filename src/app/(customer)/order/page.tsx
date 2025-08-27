

import { Dashboard } from "@/components/pcb-flow/dashboard";
import { Header } from "@/components/pcb-flow/header";

export default function OrderPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900/50">
        <Dashboard />
      </main>
    </div>
  );
}
