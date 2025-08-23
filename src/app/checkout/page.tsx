
'use client';

import { Header } from "@/components/pcb-flow/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/cart-context";
import { ArrowLeft, CreditCard, ShieldCheck, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ShippingAddressForm = () => (
    <Card>
        <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="Embassy Tech Village, Outer Ring Road" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" defaultValue="Bengaluru" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" defaultValue="Karnataka" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" defaultValue="560103" />
                </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" defaultValue="India" />
            </div>
        </CardContent>
    </Card>
);

const PaymentMethods = () => (
    <Card>
        <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>All transactions are secure and encrypted.</CardDescription>
        </CardHeader>
        <CardContent>
            <RadioGroup defaultValue="card" className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <Label htmlFor="card" className="flex items-center gap-4 cursor-pointer">
                         <CreditCard className="h-6 w-6" />
                        <span className="font-medium">Credit/Debit Card</span>
                    </Label>
                    <RadioGroupItem value="card" id="card" />
                </div>
                 <div className="space-y-4 px-2">
                    <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="xxxx xxxx xxxx xxxx" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" />
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4 bg-muted/50 text-muted-foreground opacity-50">
                     <Label htmlFor="upi" className="flex items-center gap-4 cursor-not-allowed">
                        <Image src="https://placehold.co/60x24.png" alt="UPI" width={60} height={24} data-ai-hint="upi logo" />
                        <span className="font-medium">UPI / Netbanking</span>
                    </Label>
                    <RadioGroupItem value="upi" id="upi" disabled />
                </div>
            </RadioGroup>
        </CardContent>
    </Card>
);

const OrderSummary = () => {
    const { items, getTotal } = useCart();
    const total = getTotal();
    const gst = total * 0.18;
    const shipping = 500; // Example shipping cost
    const grandTotal = total + gst + shipping;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2,
        }).format(amount);
    };

    return (
        <Card className="sticky top-24">
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {items.length > 0 ? (
                    <>
                        <div className="space-y-2">
                            {items.map(item => (
                                <div key={item.id} className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">{item.gerberFile.name} (x{item.config.quantity})</span>
                                    <span>{formatCurrency(item.quote || 0)}</span>
                                </div>
                            ))}
                        </div>
                        <Separator />
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>{formatCurrency(total)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">GST (18%)</span>
                                <span>{formatCurrency(gst)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                <span>{formatCurrency(shipping)}</span>
                            </div>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>{formatCurrency(grandTotal)}</span>
                        </div>
                    </>
                ) : (
                    <p className="text-muted-foreground text-center">Your cart is empty.</p>
                )}
            </CardContent>
        </Card>
    );
}

export default function CheckoutPage() {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900/50">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="mb-6">
                    <Button variant="outline" asChild>
                        <Link href="/cart" className="inline-flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Cart
                        </Link>
                    </Button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2 space-y-8">
                        <ShippingAddressForm />
                        <PaymentMethods />
                    </div>
                    <div className="space-y-8">
                        <OrderSummary />
                        <Button className="w-full" size="lg">
                            <ShieldCheck className="mr-2 h-5 w-5" />
                            Place Secure Order
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
