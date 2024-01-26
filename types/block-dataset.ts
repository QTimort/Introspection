export interface BlockDataset {
  meta: Meta;
  maxValues: MaxValues;
  processedTransactions: ProcessedTransaction[];
}

export interface Meta {
  blockHeight: number;
  blockTime: number;
  blockHash: string;
  parentSlot: number;
  blockSlot: number;
  previousBlockhash: string;
  mint: string;
  blockhashPickedNumber: number;
  winning_tx: string;
  direction: number;
}

export interface MaxValues {
  instructionCount: number;
  instructionByteSize: number;
  computeUnitsConsumed: number;
  volume: number;
  solVolume: number;
}

export interface ProcessedTransaction {
  transactionId: string;
  isError: boolean;
  isMintAttempt: boolean;
  instructionCount: number;
  instructionByteSize: number;
  computeUnitsConsumed: number;
  volume: number;
  solVolume: number;
}
