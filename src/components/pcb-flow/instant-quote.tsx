import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface InstantQuoteProps {
  quote: number | null;
  onPlaceOrder: () => void;
  disabled: boolean;
}

export function InstantQuote({
  quote,
  onPlaceOrder,
  disabled,
}: InstantQuoteProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Instant Quote</CardTitle>
        <CardDescription>
          Your estimated price based on the configuration.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center text-4xl font-bold text-primary">
          {quote !== null ? `$${quote.toFixed(2)}` : "..."}
        </div>
        <Button
          onClick={onPlaceOrder}
          disabled={disabled}
          size="lg"
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
        >
          Place Order
        </Button>
      </CardContent>
    </Card>
  );
}
