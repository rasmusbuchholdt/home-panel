export function normalize(value: number, min: number, max: number): number {
  return (value - min) / (max - min) * 100;
}
