import {BlockDataset} from "@/types/block-dataset";

export async function parseDataset(datasetJson: string): Promise<BlockDataset> {
  return await fetch('/assets/processed-blocks/' + datasetJson).then(r => r.json());
}
