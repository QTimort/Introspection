export function rescaleValue(value: number): number {
  if (value <= 0) {
    return 0;
  }
  if (value >= 1) {
    return 1;
  }
  const epsilon = 0.01; // small constant to avoid log(0)
  const scale = 1e1;

  return 1 - Math.log(1 / value + epsilon) / Math.log(scale + epsilon);
}
