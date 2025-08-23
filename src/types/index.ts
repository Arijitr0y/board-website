
export interface PcbConfig {
  layers: string;
  quantity: number;
  material: string;
  thickness: number;
  size: {
    width: number | string;
    height: number | string;
  };
  baseMaterial: string;
  discreteDesign: number;
  deliveryFormat: string;
  maskColor: string;
  pcbFinish: string;
  copperThickness: string;
}

export type BuildTime = "5-6" | "4-5";
export type ShippingMethod = "standard" | "plus";

export interface CartItem {
  id: string;
  gerberFile: File;
  config: PcbConfig;
  quote: number | null;
  buildTime: BuildTime;
  shippingMethod: ShippingMethod;
}
