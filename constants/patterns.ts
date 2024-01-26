import {Pattern} from "@/types/pattern";

export const patterns: Pattern[] = [
  Pattern.NORMAL,
  Pattern.WAVE,
  Pattern.DIAGONAL,
  Pattern.FUNKY_DIAGONAL,
  Pattern.TRIANGLE,
  Pattern.MOTHERBOARD,
  Pattern.SQUARE,
  Pattern.WAVE_X,
  Pattern.SPIRAL,
  Pattern.BIG_SPIRAL,
  Pattern.YING_YANG,
  Pattern.RADIAL_LINES,
  Pattern.STRIP,
  Pattern.STRIP_Y,
  Pattern.CROSS_STRIP,
  Pattern.GRADIENT,
  Pattern.DITHER,
  Pattern.HEAT_INSTRUCTION_BYTE_SIZE,
  Pattern.PALINDROME,
  Pattern.Z,
  Pattern.SQUIGGLY
];

export const patternsWeight: { [key in Pattern]: number} = {
  [Pattern.NORMAL]: 2048,
  [Pattern.WAVE]: 512,
  [Pattern.DIAGONAL]: 256,
  [Pattern.FUNKY_DIAGONAL]: 512,
  [Pattern.TRIANGLE]: 0, // 1 - 1 + // Multiple of 1337
  [Pattern.MOTHERBOARD]: 2048,
  [Pattern.SQUARE]: 0, // Prime numbers
  [Pattern.WAVE_X]: 512,
  [Pattern.SPIRAL]: 256,
  [Pattern.BIG_SPIRAL]: 0, // Multiple of 42
  [Pattern.YING_YANG]: 0, // Multiple of 69
  [Pattern.RADIAL_LINES]: 512,
  [Pattern.STRIP]: 256,
  [Pattern.STRIP_Y]: 256,
  [Pattern.CROSS_STRIP]: 128,
  [Pattern.GRADIENT]: 32,
  [Pattern.DITHER]: 1024,
  [Pattern.HEAT_INSTRUCTION_BYTE_SIZE]: 64,
  [Pattern.PALINDROME]: 0, // 1 - 1
  [Pattern.Z]: 256,
  [Pattern.SQUIGGLY]: 1024
}
