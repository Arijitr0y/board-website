
"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import type { BuildTime, ShippingMethod } from "@/types";

interface InstantQuoteProps {
  quote: number | null;
  quantity: number;
  buildTime: BuildTime;
  shippingMethod: ShippingMethod;
  onBuildTimeChange: (value: BuildTime) => void;
  onShippingMethodChange: (value: ShippingMethod) => void;
  onPlaceOrder: () => void;
  disabled: boolean;
}

const PriceRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between">
    <p className="text-muted-foreground">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export function InstantQuote({
  quote,
  quantity,
  buildTime,
  shippingMethod,
  onBuildTimeChange,
  onShippingMethodChange,
  onPlaceOrder,
  disabled,
}: InstantQuoteProps) {
  const perUnitCost = quote ? quote / quantity : 0;
  const nreCost = 0;
  const subTotal = quote || 0;
  const gst = subTotal * 0.18; // 18% GST
  const shippingCost = shippingMethod === "plus" ? 20 : 0;
  const totalCost = subTotal + gst + shippingCost;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Charge Details</CardTitle>
        <div className="mt-2">
          <div className="inline-block rounded-md bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-800">
            Make In India
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div>
          <h3 className="mb-2 font-semibold">Price Estimate</h3>
          <div className="space-y-2 rounded-lg bg-orange-50 p-3">
            <PriceRow
              label="Per Unit Cost"
              value={`${formatCurrency(perUnitCost)} × ${quantity}`}
            />
            <PriceRow label="NRE Cost" value={formatCurrency(nreCost)} />
            <PriceRow label="Sub Total" value={formatCurrency(subTotal)} />
          </div>
        </div>

        <div>
          <h3 className="mb-2 font-semibold">Build Time</h3>
          <RadioGroup
            value={buildTime}
            onValueChange={(val: BuildTime) => onBuildTimeChange(val)}
            className="grid grid-cols-2 gap-2 rounded-lg bg-orange-50 p-3"
          >
            <Label className="flex items-center gap-2 cursor-pointer">
              <RadioGroupItem value="5-6" id="bt-5-6" />
              5-6 Days
            </Label>
            <Label className="flex items-center gap-2 cursor-pointer">
              <RadioGroupItem value="4-5" id="bt-4-5" />
              4-5 Days
            </Label>
          </RadioGroup>
        </div>
        
        <div>
          <h3 className="mb-2 font-semibold">Shipping Method</h3>
          <RadioGroup
            value={shippingMethod}
            onValueChange={(val: ShippingMethod) => onShippingMethodChange(val)}
            className="grid grid-cols-2 gap-2 rounded-lg bg-orange-50 p-3"
          >
            <div>
              <Label className="flex items-center gap-2 cursor-pointer">
                <RadioGroupItem value="standard" id="sm-standard" />
                DTDC Standard
              </Label>
              <p className="ml-6 text-xs text-muted-foreground">2-3 Working Days</p>
            </div>
            <div>
              <Label className="flex items-center gap-2 cursor-pointer">
                <RadioGroupItem value="plus" id="sm-plus" />
                DTDC Plus
              </Label>
               <p className="ml-6 text-xs text-muted-foreground">1-2 Working Days</p>
            </div>
          </RadioGroup>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <PriceRow label="New Sub Total" value={formatCurrency(subTotal)} />
          <PriceRow label="GST" value={formatCurrency(gst)} />
          <PriceRow label="Shipping Cost" value={formatCurrency(shippingCost)} />
          <div className="flex items-center justify-between font-bold">
            <p>Total Cost</p>
            <p>{formatCurrency(totalCost)}</p>
          </div>
        </div>

        <Button
          onClick={onPlaceOrder}
          disabled={disabled}
          size="lg"
          className="w-full bg-gray-500 text-white hover:bg-gray-600"
        >
          Save to Cart <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}

