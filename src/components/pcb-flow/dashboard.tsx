
"use client";

import { useState, useEffect } from "react";
import type { PcbConfig, BuildTime, ShippingMethod } from "@/types";
import { analyzeGerberFiles } from "@/lib/gerber";

import { PcbConfigurator } from "./pcb-configurator";
import { GerberUpload } from "./gerber-upload";
import { InstantQuote } from "./instant-quote";
import { OrderTracking } from "./order-tracking";
import { useToast } from "@/hooks/use-toast";

const initialConfig: PcbConfig = {
  layers: "2",
  quantity: 10,
  material: "FR-4",
  thickness: 1.6,
  size: { width: 100, height: 100 },
  baseMaterial: "FR4",
  discreteDesign: 1,
  deliveryFormat: "Single PCB",
  maskColor: "Green",
  pcbFinish: "HASL Finish",
  copperThickness: "1 oz (35 um)",
};

export function Dashboard() {
  const { toast } = useToast();
  const [gerberFile, setGerberFile] = useState<File | null>(null);
  const [config, setConfig] = useState<PcbConfig>(initialConfig);
  const [quote, setQuote] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [buildTime, setBuildTime] = useState<BuildTime>("5-6");
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("standard");

  const handleFileSelect = async (file: File) => {
    setGerberFile(file);
    setIsAnalyzing(true);
    setOrderPlaced(false);

    try {
      const gerberAnalysis = await analyzeGerberFiles([file]);
      if (gerberAnalysis.dimensions) {
        const newConfig = {
          ...config,
          size: {
            width: parseFloat(gerberAnalysis.dimensions.widthMM.toFixed(2)),
            height: parseFloat(gerberAnalysis.dimensions.heightMM.toFixed(2)),
          },
          layers: String(gerberAnalysis.layerCount),
        };
        setConfig(newConfig);
      }
    } catch (err) {
      console.error("Failed to analyze gerber files for dimensions/layers", err);
       toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "There was an error processing your file.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleFileReset = () => {
    setGerberFile(null);
    setOrderPlaced(false);
    setConfig(initialConfig);
  };

  const calculateQuote = (
    newConfig: PcbConfig,
    newBuildTime: BuildTime,
    newShippingMethod: ShippingMethod
  ) => {
    // Dummy calculation
    const basePrice = 50;
    const layerPrice = parseInt(newConfig.layers, 10) * 10;
    const sizePrice = (Number(newConfig.size.width) * Number(newConfig.size.height)) / 100;
    const quantityMultiplier = Math.log10(newConfig.quantity) + 1;
    let total = (basePrice + layerPrice + sizePrice) * quantityMultiplier;

    if (newBuildTime === "4-5") {
      total *= 1.2; // 20% faster build time
    }

    if (newShippingMethod === "plus") {
      total += 20; // flat fee for plus shipping
    }

    setQuote(total);
  };

  const handleConfigChange = (newConfig: PcbConfig) => {
    setConfig(newConfig);
    calculateQuote(newConfig, buildTime, shippingMethod);
  };
  
  const handleBuildTimeChange = (newBuildTime: BuildTime) => {
    setBuildTime(newBuildTime);
    calculateQuote(config, newBuildTime, shippingMethod);
  };
  
  const handleShippingMethodChange = (newShippingMethod: ShippingMethod) => {
    setShippingMethod(newShippingMethod);
    calculateQuote(config, buildTime, newShippingMethod);
  };

  const handlePlaceOrder = () => {
    if (gerberFile && quote) {
      setOrderPlaced(true);
      toast({
        title: "Order Placed!",
        description: "Your PCB order has been successfully placed.",
      });
    }
  };

  // Initial quote calculation
  useEffect(() => {
    calculateQuote(config, buildTime, shippingMethod);
  }, [config, buildTime, shippingMethod]);

  return (
    <div className="container mx-auto p-4 md:p-8">
       <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Instant PCB Quote
        </h2>
        <p className="mt-2 text-muted-foreground">
          Upload your files, configure your board, and get an instant price.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <GerberUpload
            onFileSelect={handleFileSelect}
            onFileReset={handleFileReset}
            fileName={gerberFile?.name}
          />
          <PcbConfigurator
            config={config}
            onConfigChange={handleConfigChange}
          />
        </div>
        <div className="relative space-y-8">
          <div className="sticky top-8 space-y-8">
            <InstantQuote
              quote={quote}
              quantity={config.quantity}
              buildTime={buildTime}
              shippingMethod={shippingMethod}
              onBuildTimeChange={handleBuildTimeChange}
              onShippingMethodChange={handleShippingMethodChange}
              onPlaceOrder={handlePlaceOrder}
              disabled={!gerberFile || isAnalyzing}
            />
            {orderPlaced && <OrderTracking />}
          </div>
        </div>
      </div>
    </div>
  );
}
