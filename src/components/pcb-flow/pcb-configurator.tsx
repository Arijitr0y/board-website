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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Layers,
  MoveHorizontal,
  Package,
  Ruler,
  Thermometer,
} from "lucide-react";
import type { PcbConfig } from "@/types";

interface PcbConfiguratorProps {
  config: PcbConfig;
  onConfigChange: (config: PcbConfig) => void;
}

export function PcbConfigurator({ config, onConfigChange }: PcbConfiguratorProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "width" || name === "height") {
      onConfigChange({
        ...config,
        size: { ...config.size, [name]: Number(value) },
      });
    } else {
      onConfigChange({ ...config, [name]: Number(value) });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>2. Configure Your PCB</CardTitle>
        <CardDescription>
          Specify the details for your printed circuit board.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Ruler className="h-4 w-4 text-muted-foreground" />
            Board Size (mm)
          </Label>
          <div className="flex gap-4">
            <Input
              type="number"
              name="width"
              placeholder="Width"
              value={config.size.width}
              onChange={handleInputChange}
              min="1"
            />
            <Input
              type="number"
              name="height"
              placeholder="Height"
              value={config.size.height}
              onChange={handleInputChange}
              min="1"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="flex items-center gap-2" htmlFor="quantity">
            <Package className="h-4 w-4 text-muted-foreground" />
            Quantity
          </Label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            value={config.quantity}
            onChange={handleInputChange}
            min="1"
          />
        </div>
        <div className="space-y-2">
          <Label className="flex items-center gap-2" htmlFor="layers">
            <Layers className="h-4 w-4 text-muted-foreground" />
            Layers
          </Label>
          <Select
            value={config.layers}
            onValueChange={(value) => onConfigChange({ ...config, layers: value })}
          >
            <SelectTrigger id="layers">
              <SelectValue placeholder="Select layers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2 Layers</SelectItem>
              <SelectItem value="4">4 Layers</SelectItem>
              <SelectItem value="6">6 Layers</SelectItem>
              <SelectItem value="8">8 Layers</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="flex items-center gap-2" htmlFor="thickness">
            <MoveHorizontal className="h-4 w-4 text-muted-foreground" />
            Board Thickness (mm)
          </Label>
          <Select
            value={String(config.thickness)}
            onValueChange={(val) =>
              onConfigChange({ ...config, thickness: parseFloat(val) })
            }
          >
            <SelectTrigger id="thickness">
              <SelectValue placeholder="Select thickness" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0.8">0.8 mm</SelectItem>
              <SelectItem value="1.0">1.0 mm</SelectItem>
              <SelectItem value="1.2">1.2 mm</SelectItem>
              <SelectItem value="1.6">1.6 mm</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label className="flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-muted-foreground" />
            Material
          </Label>
          <RadioGroup
            value={config.material}
            onValueChange={(value) =>
              onConfigChange({ ...config, material: value })
            }
            className="flex flex-wrap gap-4 pt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="FR-4" id="fr4" />
              <Label htmlFor="fr4">FR-4</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Aluminum" id="aluminum" />
              <Label htmlFor="aluminum">Aluminum</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Rogers" id="rogers" />
              <Label htmlFor="rogers">Rogers</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Flexible" id="flexible" />
              <Label htmlFor="flexible">Flexible (FPC)</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
}
