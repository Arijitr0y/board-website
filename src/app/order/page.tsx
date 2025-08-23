import { Dashboard } from "@/components/pcb-flow/dashboard";
import { Header } from "@/components/pcb-flow/header";

export default function OrderPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Dashboard />
      </main>
    </div>
  );
}
