import {Theme} from "@/types/theme";
import {Pattern} from "@/types/pattern";
import {heatInstructionSizePalettes, palettes, palettesWeight} from "@/constants/color";
import {BlockDataset} from "@/types/block-dataset";
import {
  findPalindromicNumbers,
  findPrimesInRange,
  findTriangularNumbersInRange,
  isMultipleOf
} from "@/utils/special-numbers";
import {PaletteName} from "@/types/palette-name";
import {patternsWeight} from "@/constants/patterns";

export type TraitConfiguration = {
  pattern: Pattern,
  theme: Theme
  palette: PaletteName
}

export function getTraitConfiguration(block: BlockDataset): TraitConfiguration {
  const blockId = block.meta.blockSlot;
  const config = {
    pattern: Pattern.NORMAL,
    theme: Theme.DARK,
    palette: PaletteName.HEAT
  }

  config.pattern = selectWeightedItem(patternsWeight, (blockId * block.meta.blockTime * block.meta.blockhashPickedNumber) % 10000);
  config.palette = selectWeightedItem(palettesWeight, ((blockId * block.meta.blockHeight) / block.meta.blockhashPickedNumber % 10000));

  if (config.pattern === Pattern.HEAT_INSTRUCTION_BYTE_SIZE) {
    config.palette = heatInstructionSizePalettes[blockId % heatInstructionSizePalettes.length];
  }

  // ~1500
  if ([1,2].includes(block.meta.blockhashPickedNumber)) {
    config.theme = Theme.WHITE;
  }

  // 1
  const isPalindrome = !!findPalindromicNumbers(blockId, blockId).length;
  // 529
  const isPrime = !!findPrimesInRange(blockId, blockId).length;
  // 1
  const isTriangular = !!findTriangularNumbersInRange(blockId, blockId).length;
  // 239
  const isMultipleOf42 = isMultipleOf(blockId, 42);
  // 150
  const isMultipleOf69 = isMultipleOf(blockId, 69);
  // 8
  const isMultipleOf1337 = isMultipleOf(blockId, 1337);

  if (isMultipleOf1337) {
    config.pattern = Pattern.MOTHERBOARD;
    config.palette = PaletteName.MATRIX;
    config.theme = Theme.DARK;
  }
  if (isMultipleOf69) {
    config.pattern = Pattern.YING_YANG;
  }
  if (isMultipleOf42) {
    config.pattern = Pattern.BIG_SPIRAL;
  }
  if (isPrime) {
    config.pattern = Pattern.SQUARE;
  }

  if (config.pattern === Pattern.DIAGONAL && palettes[config.palette].length === 2) {
    // diagonal only works with 3 or more colors
    config.pattern = Pattern.FUNKY_DIAGONAL;
  }

  if (isPalindrome) {
    config.palette = PaletteName.FIDENZA;
    config.pattern = Pattern.PALINDROME;
    config.theme = Theme.WHITE
  }

  if (isTriangular) {
    config.palette = PaletteName.AE86;
    config.pattern = Pattern.TRIANGLE;
    config.theme = Theme.WHITE
  }

  return config;
}

export function selectWeightedItem<T extends Record<keyof T, number>>(items: T, number: number): keyof T {
  if (number < 0 || number >= 10000) {
    throw new Error("Number must be between 0 and 9999.");
  }
  const entries = Object.entries(items) as [keyof T, number][];

  const totalWeight = entries.reduce((sum, [, weight]) => sum + weight, 0);

  const scaledRandom = (number / 10000) * totalWeight;

  let cumulativeWeight = 0;
  for (const [key, weight] of entries) {
    cumulativeWeight += weight;
    if (scaledRandom <= cumulativeWeight) {
      return key;
    }
  }

  throw new Error("No item selected. Check the item weights and random number.");
}

