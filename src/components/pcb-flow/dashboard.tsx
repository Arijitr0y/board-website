"use client";

import { useState } from "react";
import type { AnalyzeGerberForDfmIssuesOutput } from "@/ai/flows/dfm-analysis";
import { analyzeGerberForDfmIssues } from "@/ai/flows/dfm-analysis";
import type { PcbConfig } from "@/types";
import { analyzeGerberFiles } from "@/lib/gerber";

import { PcbConfigurator } from "./pcb-configurator";
import { GerberUpload } from "./gerber-upload";
import { DfmAnalysis } from "./dfm-analysis";
import { InstantQuote } from "./instant-quote";
import { OrderTracking } from "./order-tracking";
import { useToast } from "@/hooks/use-toast";

export function Dashboard() {
  const { toast } = useToast();
  const [gerberFile, setGerberFile] = useState<File | null>(null);
  const [gerberDataUri, setGerberDataUri] = useState<string | null>(null);
  const [config, setConfig] = useState<PcbConfig>({
    layers: "2",
    quantity: 10,
    material: "FR-4",
    thickness: 1.6,
    size: { width: 100, height: 100 },
  });
  const [quote, setQuote] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] =
    useState<AnalyzeGerberForDfmIssuesOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleFileSelect = async (file: File) => {
    setGerberFile(file);
    setAnalysisResult(null);
    setError(null);
    setIsAnalyzing(true);
    setOrderPlaced(false);

    try {
      const gerberAnalysis = await analyzeGerberFiles([file]);
      if (gerberAnalysis.dimensions) {
        const newConfig = {
          ...config,
          size: {
            width: Math.round(gerberAnalysis.dimensions.widthMM),
            height: Math.round(gerberAnalysis.dimensions.heightMM),
          },
          layers: String(gerberAnalysis.layerCount),
        };
        setConfig(newConfig);
        calculateQuote(newConfig);
      }
    } catch (err) {
      console.error("Failed to analyze gerber files for dimensions/layers", err);
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUri = e.target?.result as string;
      if (dataUri) {
        setGerberDataUri(dataUri);
        try {
          const result = await analyzeGerberForDfmIssues({
            gerberDataUri: dataUri,
          });
          setAnalysisResult(result);
        } catch (err) {
          setError("Failed to analyze Gerber file. Please try again.");
          toast({
            variant: "destructive",
            title: "Analysis Failed",
            description: "There was an error processing your file.",
          });
          console.error(err);
        } finally {
          setIsAnalyzing(false);
        }
      }
    };
    reader.onerror = () => {
      setError("Failed to read file.");
      setIsAnalyzing(false);
      toast({
        variant: "destructive",
        title: "File Read Error",
        description: "Could not read the selected file.",
      });
    };
    reader.readAsDataURL(file);
  };

  const calculateQuote = (newConfig: PcbConfig) => {
    // Dummy calculation
    const basePrice = 50;
    const layerPrice = parseInt(newConfig.layers, 10) * 10;
    const sizePrice = (newConfig.size.width * newConfig.size.height) / 100;
    const quantityMultiplier = Math.log10(newConfig.quantity) + 1;
    const total = (basePrice + layerPrice + sizePrice) * quantityMultiplier;
    setQuote(total);
  };

  const handleConfigChange = (newConfig: PcbConfig) => {
    setConfig(newConfig);
    calculateQuote(newConfig);
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
  useState(() => {
    calculateQuote(config);
  });

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <GerberUpload
            onFileSelect={handleFileSelect}
            fileName={gerberFile?.name}
          />
          <PcbConfigurator
            config={config}
            onConfigChange={handleConfigChange}
          />
        </div>
        <div className="space-y-8">
          <InstantQuote
            quote={quote}
            onPlaceOrder={handlePlaceOrder}
            disabled={!gerberFile || isAnalyzing}
          />
          {(isAnalyzing || analysisResult || error) && (
            <DfmAnalysis
              isLoading={isAnalyzing}
              result={analysisResult}
              error={error}
            />
          )}
          {orderPlaced && <OrderTracking />}
        </div>
      </div>
    </div>
  );
}
