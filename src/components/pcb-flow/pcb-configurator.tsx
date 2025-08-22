
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PcbConfig } from "@/types";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


interface PcbConfiguratorProps {
  config: PcbConfig;
  onConfigChange: (config: PcbConfig) => void;
}

const options = {
  layers: ["1", "2"],
  comingSoonLayers: ["4", "6", "8", "10", "12"],
  discreteDesigns: [1, 2, 3, 4, 5],
  deliveryFormats: ["Single PCB", "Panel By Customer", "Panel By LionCircuits"],
  thicknesses: [0.4, 0.8, 1.2, 1.6, 2.0, 2.4],
  maskColors: ["Green", "White", "Red", "Blue", "Black"],
  pcbFinishes: ["HASL Finish", "Lead Free HASL", "ENIG"],
  copperThicknesses: ["1 oz (35 um)", "2 oz (70 um)", "3 oz (105 um)"],
};

const ConfigRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="grid grid-cols-3 items-center">
        <Label className="text-muted-foreground">{label}</Label>
        <div className="col-span-2">{children}</div>
    </div>
)

const OptionButton = ({
  value,
  selectedValue,
  onClick,
  className,
  disabled = false,
  tooltip,
}: {
  value: string | number;
  selectedValue: string | number;
  onClick: (value: string | number) => void;
  className?: string;
  disabled?: boolean;
  tooltip?: string;
}) => {
  const button = (
    <button
      onClick={() => !disabled && onClick(value)}
      disabled={disabled}
      className={cn(
        "px-4 py-1.5 border rounded-md text-sm transition-colors",
        selectedValue === value
          ? "bg-primary/10 border-primary text-primary font-semibold"
          : "border-input hover:bg-muted/50",
        disabled && "opacity-50 cursor-not-allowed hover:bg-transparent",
        className
      )}
    >
      {value}
    </button>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return button;
};



export function PcbConfigurator({ config, onConfigChange }: PcbConfiguratorProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "width" || name === "height") {
      onConfigChange({
        ...config,
        size: { ...config.size, [name]: value === "" ? "" : value },
      });
    } else {
      onConfigChange({ ...config, [name]: value === "" ? 0 : Number(value) });
    }
  };

  const handleOptionChange = (field: keyof PcbConfig, value: any) => {
    onConfigChange({ ...config, [field]: value });
  };
  
  const handleThicknessChange = (value: string) => {
    onConfigChange({ ...config, thickness: parseFloat(value) });
  };
  
  const handleDimensionBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "width" || name === "height") {
      const numericValue = parseFloat(value);
      onConfigChange({
        ...config,
        size: { ...config.size, [name]: isNaN(numericValue) ? "" : numericValue.toFixed(2) },
      });
    }
  };
  
  const handleQuantityBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 5) {
      onConfigChange({ ...config, quantity: 5 });
    }
  };


  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
              <CardTitle>2. Configure Your PCB</CardTitle>
              <CardDescription>
                Specify the details for your board. Dimensions and layer count are auto-detected.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
                <ConfigRow label="Base Material">
                    <div className="flex gap-2">
                        <OptionButton value="FR4" selectedValue={config.baseMaterial} onClick={() => handleOptionChange("baseMaterial", "FR4")} />
                    </div>
                </ConfigRow>
                <ConfigRow label="Layers">
                    <div className="flex flex-wrap gap-2">
                        {options.layers.map(l => <OptionButton key={l} value={l} selectedValue={config.layers} onClick={(val) => handleOptionChange("layers", val as string)} />)}
                         {options.comingSoonLayers.map(l => <OptionButton key={l} value={l} selectedValue={config.layers} onClick={() => {}} disabled={true} tooltip="Coming Soon" />)}
                    </div>
                </ConfigRow>
                <ConfigRow label="Dimensions">
                    <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          name="width"
                          placeholder="Width"
                          value={config.size.width}
                          onChange={handleInputChange}
                          onBlur={handleDimensionBlur}
                          className="w-24 bg-muted/50"
                          min="1"
                          step="0.01"
                        />
                        <span>x</span>
                        <Input
                          type="number"
                          name="height"
                          placeholder="Height"
                          value={config.size.height}
                          onChange={handleInputChange}
                          onBlur={handleDimensionBlur}
                          className="w-24 bg-muted/50"
                          min="1"
                          step="0.01"
                        />
                         <span>mm</span>
                    </div>
                </ConfigRow>
                <ConfigRow label="Quantity">
                     <Input
                        id="quantity"
                        name="quantity"
                        type="number"
                        value={config.quantity}
                        onChange={handleInputChange}
                        onBlur={handleQuantityBlur}
                        className="w-24"
                        min="5"
                      />
                </ConfigRow>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>3. Additional Specifications</CardTitle>
                <CardDescription>
                  Provide additional details for the manufacturing process.
                </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
                 <ConfigRow label="Discrete Design">
                    <div className="flex flex-wrap gap-2">
                        {options.discreteDesigns.map(d => <OptionButton key={d} value={d} selectedValue={config.discreteDesign} onClick={(val) => handleOptionChange("discreteDesign", val as number)} />)}
                    </div>
                </ConfigRow>
                 <ConfigRow label="Delivery Format">
                    <div className="flex flex-wrap gap-2">
                        {options.deliveryFormats.map(d => <OptionButton key={d} value={d} selectedValue={config.deliveryFormat} onClick={(val) => handleOptionChange("deliveryFormat", val as string)} />)}
                    </div>
                </ConfigRow>
                 <ConfigRow label="PCB Thickness (mm)">
                    <div className="flex flex-wrap gap-2">
                        {options.thicknesses.map(t => <OptionButton key={t} value={t} selectedValue={config.thickness} onClick={(val) => handleThicknessChange(val as string)} />)}
                    </div>
                </ConfigRow>
                 <ConfigRow label="Mask Color">
                    <div className="flex flex-wrap gap-2">
                        {options.maskColors.map(c => <OptionButton key={c} value={c} selectedValue={config.maskColor} onClick={(val) => handleOptionChange("maskColor", val as string)} />)}
                    </div>
                </ConfigRow>
                 <ConfigRow label="PCB Finish">
                    <div className="flex flex-wrap gap-2">
                        {options.pcbFinishes.map(f => <OptionButton key={f} value={f} selectedValue={config.pcbFinish} onClick={(val) => handleOptionChange("pcbFinish", val as string)} />)}
                    </div>
                </ConfigRow>
                 <ConfigRow label="Copper Thickness">
                    <div className="flex flex-wrap gap-2">
                        {options.copperThicknesses.map(c => <OptionButton key={c} value={c} selectedValue={config.copperThickness} onClick={(val) => handleOptionChange("copperThickness", val as string)} />)}
                    </div>
                </ConfigRow>
            </CardContent>
        </Card>
    </div>
  );
}
