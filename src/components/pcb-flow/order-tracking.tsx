"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Package, Rocket, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

const statuses = [
  { name: "Order Placed", icon: Check, duration: 1000 },
  { name: "Processing", icon: Wrench, duration: 2000 },
  { name: "Fabrication", icon: Rocket, duration: 3000 },
  { name: "Shipped", icon: Package, duration: 1500 },
];

export function OrderTracking() {
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);

  useEffect(() => {
    if (currentStatusIndex < statuses.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStatusIndex((prevIndex) => prevIndex + 1);
      }, statuses[currentStatusIndex].duration);

      return () => clearTimeout(timer);
    }
  }, [currentStatusIndex]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Tracking</CardTitle>
        <CardDescription>
          Follow your PCB's journey from our factory to your door.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {statuses.map((status, index) => (
            <div key={status.name} className="flex items-center gap-4">
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  index <= currentStatusIndex
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-muted text-muted-foreground"
                )}
              >
                <status.icon className="h-5 w-5" />
              </div>
              <div>
                <p
                  className={cn(
                    "font-medium transition-colors",
                    index <= currentStatusIndex
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {status.name}
                </p>
                {index === currentStatusIndex &&
                  index < statuses.length - 1 && (
                    <p className="animate-pulse text-sm text-muted-foreground">
                      In progress...
                    </p>
                  )}
                {index < currentStatusIndex && (
                  <p className="text-sm text-muted-foreground">Completed</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
