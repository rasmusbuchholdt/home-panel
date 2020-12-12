export interface RGB {
  R: number;
  G: number;
  B: number;
}

export interface LightConfig {
  id: number;
  enabled: boolean;
  rgb: RGB;
  saturation: number;
  brightness: number;
}
