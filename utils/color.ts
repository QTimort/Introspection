import {Color} from "three";

export function interpolateColor(palette: Color[], value: number): Color {
  if (value <= 0) {
    return palette[0];
  }
  if (value >= 1) {
    value = value % 1;
  }

  const position = value * (palette.length - 1);
  const index = Math.floor(position);

  if (index === palette.length - 1) {
    return palette[index];
  }

  const color1 = palette[index];
  const color2 = palette[index + 1];
  const lerpFactor = position - index;

  return new Color().copy(color1).lerp(color2, lerpFactor);
}

export function closestColor(palette: Color[], value: number): Color {
  if (value <= 0) {
    return palette[0];
  }
  if (value >= 1) {
    return palette[palette.length - 1];
  }

  const position = value * (palette.length - 1);
  const index = Math.round(position);
  return palette[index];
}
