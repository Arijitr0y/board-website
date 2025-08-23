
import { Cart } from "@/components/pcb-flow/cart";
import { Header } from "@/components/pcb-flow/header";

export default function CartPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Cart />
      </main>
    </div>
  );
}
