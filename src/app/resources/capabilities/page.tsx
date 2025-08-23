
import { Header } from "@/components/pcb-flow/header";

export default function CapabilitiesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-bold mb-4">Capabilities</h1>
        <p className="text-lg text-muted-foreground">
          This is the Capabilities page. Content coming soon.
        </p>
      </main>
    </div>
  );
}
