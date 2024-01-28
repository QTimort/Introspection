export function getColorForWavePatternX<T>(x: number, y: number, colors: T[], waveFrequency = 0.5): T {
  const waveAmplitude = colors.length - 1;

  const wave = Math.sin(x * waveFrequency) * waveAmplitude;
  const colorIndex = Math.abs(Math.round(wave)) % colors.length;

  return colors[colorIndex];
}

export function getColorForWavePattern<T>(x: number, y: number, colors: T[], waveFrequencyX = 0.5, waveFrequencyY = 0.5): T {
  const waveAmplitude = colors.length - 1;

  let wave = Math.sin(x * waveFrequencyX) + Math.cos(y * waveFrequencyY);
  wave *= waveAmplitude / 2;

  const colorIndex = Math.abs(Math.round(wave)) % colors.length;

  return colors[colorIndex];
}

export function getColorForStripeAnglePattern<T>(
  x: number, y: number, colors: T[], angle: number, stripeWidth: number
): T {
  const angleRad = angle * Math.PI / 180;

  const rotatedX = x * Math.cos(angleRad) - y * Math.sin(angleRad);
  const rotatedY = x * Math.sin(angleRad) + y * Math.cos(angleRad);

  const stripeCoordinate = rotatedX + rotatedY;

  let index = Math.floor(stripeCoordinate / stripeWidth);
  index = index % colors.length;

  if (index > colors.length - 1 ) {
    return colors[colors.length];
  }
  if (index <= 0) {
    return colors[0];
  }
  return colors[index];
}

export function getColorForSquigglyPattern<T>(
  x: number, y: number, colors: T[], angle: number, stripeWidth: number, squiggleFrequency: number, squiggleAmplitude: number
): T {
  const angleRad = angle * Math.PI / 180;

  const rotatedX = x * Math.cos(angleRad) - y * Math.sin(angleRad);
  const rotatedY = x * Math.sin(angleRad) + y * Math.cos(angleRad);

  const squiggle = Math.sin(rotatedX * squiggleFrequency) * squiggleAmplitude;
  const stripeCoordinate = rotatedX + rotatedY + squiggle;

  let index = Math.floor(stripeCoordinate / stripeWidth);
  index = Math.abs(index) % colors.length;

  return colors[index];
}

export function getColorForCrossStripePattern<T>(x: number, y: number, colors: T[], stripeWidth: number): T {
  const horizontalIndex = Math.floor(y / stripeWidth);
  const verticalIndex = Math.floor(x / stripeWidth);

  let combinedIndex = (horizontalIndex + verticalIndex) % colors.length;

  return colors[combinedIndex];
}
export function getSpiralColor<T>(x: number, y: number, colors: T[], gridSize: number, offset = 0, spiralDensity = 2): T {
  const centerX = x - gridSize / 2;
  const centerY = y - gridSize / 2;

  const r = Math.sqrt(centerX * centerX + centerY * centerY);
  const theta = Math.atan2(centerY, centerX);

  const angleOffset = r / spiralDensity + offset;

  const colorIndex =
    Math.abs(Math.floor((theta + angleOffset) / (2 * Math.PI) * colors.length)) % colors.length;

  return colors[colorIndex];
}

export function getYingYangPattern<T>(x: number, y: number, colors: T[], gridSize: number, spiralDensity = 2): T {
  const centerX = x - gridSize / 2;
  const centerY = y - gridSize / 2;

  const r = Math.sqrt(centerX * centerX + centerY * centerY);
  const theta = Math.atan2(centerY, centerX);

  if (r < gridSize / 4) {
    return colors[Math.abs((theta > 0 ? 0 : 1) % colors.length)];
  }

  if (r < gridSize / 2) {
    const angleOffset = r / spiralDensity;
    let colorIndex = Math.floor((theta + angleOffset) / (2 * Math.PI) * colors.length);
    colorIndex = Math.abs(colorIndex) % colors.length;
    return colors[colorIndex];
  }

  return colors[Math.abs((theta > 0 ? 1 : 0) % colors.length)];
}

export function getRadialLineColor<T>(x: number, y: number, colors: T[], gridSize: number, lineDensity = 20): T {
  const centerX = x - gridSize / 2;
  const centerY = y - gridSize / 2;
  const theta = Math.atan2(centerY, centerX);

  const normalizedTheta = (theta >= 0 ? theta : (2 * Math.PI + theta)) / (2 * Math.PI);

  const colorIndex = Math.floor(normalizedTheta * lineDensity) % colors.length;

  return colors[colorIndex];
}
export function getDiagonalPattern<T>(x: number, y: number, colorPalette: T[], diagonalSize: number): T {
  const row = Math.floor(y / diagonalSize);
  const col = Math.floor(x / diagonalSize);

  const isUpwardTriangle = (row % 2 === 0 && col % 2 === 0) || (row % 2 !== 0 && col % 2 !== 0);

  let colorIndex = (row + col) % colorPalette.length;

  if (!isUpwardTriangle) {
    colorIndex = (colorIndex + 1) % colorPalette.length;
  }

  return colorPalette[colorIndex];
}

export function getFunkyDiagonalPattern<T>(x: number, y: number, colorPalette: T[], triangleHeight: number): T {
  const sqrt3 = Math.sqrt(4);
  const triangleWidth = sqrt3 * triangleHeight;

  const row = Math.floor(y / (triangleHeight / 2));
  const col = Math.floor(x / (triangleWidth / 4));

  const isUpward = ((x % triangleWidth) / (triangleWidth / 2)) + ((y % (triangleHeight / 2)) / (triangleHeight / 2)) < 1;

  let colorIndex = (row + col) % colorPalette.length;

  if (isUpward) {
    colorIndex = (colorIndex + 1) % colorPalette.length;
  }

  return colorPalette[colorIndex];
}

export function getZPattern<T>(x: number, y: number, colorPalette: T[], angle: number = 0, triangleSize: number = 15): T {
  const angleRad = angle * Math.PI / 180;

  const rotatedX = x * Math.cos(angleRad) - y * Math.sin(angleRad);
  const rotatedY = x * Math.sin(angleRad) + y * Math.cos(angleRad);

  const row = Math.floor(rotatedY / (triangleSize * Math.sqrt(3) / 2));
  const col = Math.floor(rotatedX / triangleSize - (row % 2) * 0.5);

  const isUpward = (((rotatedX % triangleSize) - (row % 2) * triangleSize / 2) / triangleSize) > ((rotatedY % (triangleSize * Math.sqrt(3) / 2)) / (triangleSize * Math.sqrt(3) / 2));

  const colorIndex = (row + col + (isUpward ? 0 : 1)) % colorPalette.length;
  if (colorIndex > colorPalette.length - 1 ) {
    return colorPalette[colorPalette.length];
  }
  if (colorIndex <= 0) {
    return colorPalette[0];
  }
  return colorPalette[colorIndex];
}

export function getTrianglePattern<T>(x: number, y: number, palette: T[]): T {
  let depth = 0;
  while (x > 0 || y > 0) {
    if (x % 2 === 1 && y % 2 === 1) {
      if (palette.length < 3) {
        return palette[0];
      }
      return palette[depth % palette.length];
    }
    x = Math.floor(x / 2);
    y = Math.floor(y / 2);
    depth++;
  }
  if (palette.length < 3) {
    return palette[palette.length > 1 ? 1 : 0];
  }
  return palette[depth % palette.length];
}

export function geSquarePattern<T>(x: number, y: number, palette: T[]): T {
  let depth = 0;
  while (x > 0 || y > 0) {
    if (x % 2 === 1 && y % 2 === 1) {
      return palette[depth % palette.length];
    }
    x = Math.floor(x / 3);
    y = Math.floor(y / 3);
    depth++;
  }
  if (palette.length < 3) {
    return palette[palette.length > 1 ? 1 : 0];
  }
  return palette[depth % palette.length];
}

export function geMotherboardPattern<T>(x: number, y: number, palette: T[], variationX: number = 0, variationY: number = 0): T {
  let depth = 0;
  while (x > 0 || y > 0) {
    if (x % 2 === 1 && y % 2 === 1) {
      return palette[depth % palette.length];
    }
    x = Math.floor(x / (1.5 + variationX));
    y = Math.floor(y / (2 + variationY));
    depth++;
  }
  if (palette.length < 3) {
    return palette[palette.length > 1 ? 1 : 0];
  }
  return palette[depth % palette.length];
}

export function applyDithering<T>(x: number, y: number, palette: T[], matrixSize: number): T {
  const matrix = [
    [  0, 32,  8, 40,  2, 34, 10, 42 ],
    [ 48, 16, 56, 24, 50, 18, 58, 26 ],
    [ 12, 44,  4, 36, 14, 46,  6, 38 ],
    [ 60, 28, 52, 20, 62, 30, 54, 22 ],
    [  3, 35, 11, 43,  1, 33,  9, 41 ],
    [ 51, 19, 59, 27, 49, 17, 57, 25 ],
    [ 15, 47,  7, 39, 13, 45,  5, 37 ],
    [ 63, 31, 55, 23, 61, 29, 53, 21 ]
  ];

  const matrixValue = matrix[Math.floor(y) % matrixSize][Math.floor(x) % matrixSize];

  const scaledMatrixValue = Math.floor(matrixValue * (palette.length / 64));

  return palette[scaledMatrixValue];
}

export function getPalindromePattern<T>(x: number, y: number, width: number, height: number, palette: T[]): T {
  const midPoint = width / 2;
  const segmentWidth = midPoint / palette.length;

  if (x >= midPoint) {
    x = midPoint - (x - midPoint) - 1;
  }

  const colorIndex = Math.floor(x / segmentWidth) % palette.length;
  const lastPaletteIndex = palette.length - 1;
  if (colorIndex >= lastPaletteIndex ) {
    return palette[0];
  }
  if (colorIndex <= 0) {
    return palette[lastPaletteIndex];
  }
  return palette[lastPaletteIndex - colorIndex];
}
