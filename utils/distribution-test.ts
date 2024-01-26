import {patternsWeight} from "@/constants/patterns";
import {palettesWeight} from "@/constants/color";
import {selectWeightedItem} from "@/utils/trait-configuration";

export function patternDistributionPaTest(blockStart: number, blockEnd: number) {
  const distribution: {[key: string]: number}  = {};
  for (let i = blockStart; i <= blockEnd; i++) {
    const res = selectWeightedItem(patternsWeight, i % 10000);
    distribution[res] = (distribution[res] || 0) + 1;
  }

  console.log(distribution);
}

export function paletteDistributionTest(blockStart: number, blockEnd: number) {
  const distribution: {[key: string]: number}  = {};
  for (let i = blockStart; i <= blockEnd; i++) {
    const res = selectWeightedItem(palettesWeight, i % 10000);
    distribution[res] = (distribution[res] || 0) + 1;
  }

  console.log(distribution);
}
