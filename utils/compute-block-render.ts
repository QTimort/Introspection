import {Color, Vector3} from "three";
import potpack from "potpack";
import {BoxType} from "@/types/box-type";
import {Pattern} from "@/types/pattern";
import {BlockRenderData} from "@/types/block-render-data";
import {
  applyDithering,
  geMotherboardPattern,
  geSquarePattern,
  getColorForCrossStripePattern,
  getColorForWavePattern,
  getColorForWavePatternX,
  getDiagonalPattern,
  getPalindromePattern,
  getSpiralColor,
  getTrianglePattern,
  getFunkyDiagonalPattern,
  getYingYangPattern,
  getRadialLineColor,
  getZPattern,
  getColorForStripeAnglePattern, getColorForSquigglyPattern
} from "@/utils/patterns";
import {errorColor, glowBlue, glowGreen, palettes} from "@/constants/color";
import {BlockDataset} from "@/types/block-dataset";
import {closestColor, interpolateColor} from "@/utils/color";
import {TraitConfiguration} from "@/utils/trait-configuration";

export function computeBlockRenderData(parsedBlock: BlockDataset, traitConfiguration: TraitConfiguration) {
  const spacing = 0.8;
  const colors = palettes[traitConfiguration.palette].map(c => new Color(c));

  const boxes: BoxType[] = parsedBlock.processedTransactions.map((b) => {
    return ({
        w: 0.75 + ((b.instructionByteSize) / parsedBlock.maxValues.instructionByteSize) * 10,
        h: 2 + (b.solVolume / parsedBlock.maxValues.solVolume) * 10,
        x: 0,
        y: 0
    });
  });
  const {w, h, fill} = potpack(boxes);
  const squareSize = Math.max(w, h);

  const platformSize = new Vector3(squareSize + 15, 1, squareSize + 15);
  const platformPosition = new Vector3(squareSize / 2, -3, squareSize / 2);

  return {
    platformSize,
    platformPosition,
    blockRenderData: getBlockRenderData(parsedBlock, boxes, colors, spacing, w, h, traitConfiguration.pattern)
  };
}

export function getBlockRenderData(
  parsedBlock: BlockDataset,
  boxes: BoxType[],
  colorsMaterial: Color[],
  space: number,
  width: number,
  height: number,
  pattern: Pattern
): BlockRenderData[] {
  const blockId = parsedBlock.meta.blockSlot;
  const blockHeight = parsedBlock.meta.blockHeight;
  const widthOffset = blockId % (width / 2);
  const heightOffset = (blockHeight / 33) % (width / 2);

  return parsedBlock.processedTransactions.map((b, index) => {
    const box = boxes[index];
    const isWinner = b.transactionId === parsedBlock.meta.winning_tx;
    const yPos = b.instructionCount / parsedBlock.maxValues.instructionCount * 4 + (isWinner ? 4 : 0);
    const size = new Vector3(box.w * space, 5 + yPos / 2, box.h * space);
    const pos = new Vector3(box.x + box.w / 2, yPos / 2 - 1, box.y + box.h / 2 );
    let color = colorsMaterial[Math.round(box.x ^ box.y) % colorsMaterial.length];

    if (pattern === Pattern.CROSS_STRIP) {
      color = getColorForCrossStripePattern(box.x + blockId, box.y + blockHeight, colorsMaterial, 1 + blockId % 12);
    }
    if (pattern === Pattern.SQUIGGLY) {
      color = getColorForSquigglyPattern(box.x + blockId, box.y + blockHeight, colorsMaterial, blockId % 90, 1 + blockId % 12, 1 / (5 + (blockId % 30)), blockId % 20 + 20);
    }
    if (pattern === Pattern.STRIP) {
      color = getColorForStripeAnglePattern(box.x + blockId, box.y + blockHeight, colorsMaterial, blockId % 90, 4);
    }
    if (pattern === Pattern.STRIP_Y) {
      color = getColorForStripeAnglePattern(box.x + blockId, box.y + blockHeight, colorsMaterial, 45, 2);
    }
    if (pattern === Pattern.SPIRAL) {
      color = getSpiralColor(box.x + widthOffset / 2, box.y + heightOffset / 2, colorsMaterial, width, blockId, 2 + (blockId % 5));
    }
    if (pattern === Pattern.BIG_SPIRAL) {
      color = getSpiralColor(box.x + widthOffset / 2, box.y + heightOffset / 2, colorsMaterial, width, blockId,16);
    }
    if (pattern === Pattern.YING_YANG) {
      color = getYingYangPattern(box.x + widthOffset / 4, box.y + heightOffset / 4, colorsMaterial, width);
    }
    if (pattern === Pattern.RADIAL_LINES) {
      color = getRadialLineColor(box.x + widthOffset, box.y + heightOffset , colorsMaterial, width, 30 + (blockId % 70));
    }
    if (pattern === Pattern.WAVE_X) {
      color = getColorForWavePatternX(box.x + blockId, box.y + blockHeight, colorsMaterial, 0.4 + ((blockId % 100) / 200));
    }
    if (pattern === Pattern.WAVE) {
      color = getColorForWavePattern(box.x + blockId, box.y + blockHeight, colorsMaterial, 0.01 + ((blockId % 100) / 200), 0.01 + (((blockHeight * 1.33 ) % 100) / 200));
    }
    if (pattern === Pattern.DIAGONAL) {
      color = getDiagonalPattern(box.x + blockId, box.y + blockHeight, colorsMaterial, 1 + blockId % 16);
    }
    if (pattern === Pattern.FUNKY_DIAGONAL) {
      color = getFunkyDiagonalPattern(box.x + blockId, box.y + blockHeight, colorsMaterial, 8 + blockId % 8);
    }
    if (pattern === Pattern.GRADIENT) {
      color = interpolateColor(colorsMaterial, index / parsedBlock.processedTransactions.length + ((blockId % 10) / 10));
    }
    if (pattern === Pattern.DITHER) {
      color = applyDithering(box.x + blockId, box.y + blockHeight, colorsMaterial, 3 + (blockId % 6));
    }
    if (pattern === Pattern.HEAT_INSTRUCTION_BYTE_SIZE) {
      const ratio = b.instructionByteSize / parsedBlock.maxValues.instructionByteSize;
      if (colorsMaterial.length > 2) {
        color = closestColor(colorsMaterial, ratio * 4);
      } else {
        color = interpolateColor(colorsMaterial, ratio * 4);
      }
    }
    if (pattern === Pattern.Z) {
      color = getZPattern(box.x + blockId, box.y + blockHeight, colorsMaterial, blockId % 90, 15);
    }
    if (pattern === Pattern.MOTHERBOARD) {
      color = geMotherboardPattern(box.x + blockId, box.y + blockHeight, colorsMaterial, (blockId % 4) / 10, (blockHeight % 4) / 10);
    }
    if (pattern === Pattern.SQUARE) {
      color = geSquarePattern(box.x + blockId, box.y + blockHeight, colorsMaterial);
    }
    if (pattern === Pattern.TRIANGLE) {
      color = getTrianglePattern(box.x, box.y, colorsMaterial);
    }
    if (pattern === Pattern.PALINDROME) {
      color = getPalindromePattern(box.x, box.y, width, height, colorsMaterial);
    }

    if (isWinner) {
      color = glowGreen;
    } else if (b.isMintAttempt) {
      color = glowBlue;
    } else if (b.isError) {
      color = errorColor;
    }


    return { size, pos, color: color };
  });
}
