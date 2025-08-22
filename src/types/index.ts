export interface PcbConfig {
  layers: string;
  quantity: number;
  material: string;
  thickness: number;
  size: {
    width: number;
    height: number;
  };
}
