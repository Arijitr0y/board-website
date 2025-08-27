
import { CartProvider } from "@/context/cart-context";
import { Footer } from '@/components/pcb-flow/footer';
import { LoadingProvider, InstantLoadingIndicator } from '@/context/loading-context';
import { ThemeProvider } from "@/components/theme-provider";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LoadingProvider>
        <CartProvider>
          <InstantLoadingIndicator />
          <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
              {children}
            </div>
            <Footer />
          </div>
        </CartProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
}
