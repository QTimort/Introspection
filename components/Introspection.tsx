'use client';
import React, { useEffect, useRef, useState} from "react";
import {useControls} from "leva";
import {parseDataset} from "@/utils/parse-dataset";
import {BlockDataset} from "@/types/block-dataset";
import {getTraitConfiguration} from "@/utils/trait-configuration";
import {palettes} from "@/constants/color";
import {PaletteName} from "@/types/palette-name";
import {patterns} from "@/constants/patterns";
import {Theme} from "@/types/theme";

type Attribute = {
  trait_type: string;
  value: string;
};

export function Introspection() {
  const [parsedBlock, setParsedBlock] = useState<BlockDataset | undefined>(undefined);
  const startBlock = 236425343;
  const endBlock = 236435967;
  const [blockId, setBlockId] = useState(startBlock);
  const [metadatum, setMetadatum] = useState<{ [key: number]: Attribute[] }>({});

  const controls = useControls({
    blockId: {
      value: startBlock,
      min: startBlock,
      max: endBlock,
      step: 1,
    },
    ovrTheme: false,
    darkMode: true,
    ovrPalette: false,
    palette: {
      options: Object.keys(palettes) as PaletteName[],
    },
    ovrPattern: false,
    pattern: {
      options: patterns
    },
    render: false,
  });
  const traitConfiguration = parsedBlock ? getTraitConfiguration(parsedBlock) : undefined;
  const nbMintAttempt = parsedBlock?.processedTransactions.filter(t => t.isMintAttempt).length || 0;
  const nbError = parsedBlock?.processedTransactions.filter(t => t.isError).length || 0;
  const nbTransaction = parsedBlock?.processedTransactions.length || 0;

  const attributes: Attribute[] = [
    {
      "trait_type": "Block",
      "value": parsedBlock?.meta.blockSlot.toString() || ""
    },
    {
      "trait_type": "Mint Attempts",
      "value": nbMintAttempt.toString() || ""
    },
    {
      "trait_type": "Failed Transactions",
      "value": nbError.toString() || ""
    },
    {
      "trait_type": "Transactions",
      "value": nbTransaction.toString() || ""
    },
    {
      "trait_type": "Introspection Theme",
      "value": traitConfiguration?.theme || ""
    },
    {
      "trait_type": "Introspection Palette",
      "value": traitConfiguration?.palette || ""
    },
    {
      "trait_type": "Introspection Pattern",
      "value": traitConfiguration?.pattern || ""
    },
  ];

  if (parsedBlock?.meta?.blockSlot && traitConfiguration && !metadatum[parsedBlock.meta.blockSlot]) {
    setMetadatum(prev => ({
      ...prev,
      [parsedBlock.meta.blockSlot]: attributes
    }))
  }

  if (blockId % 100 === 0 || blockId === endBlock) {
    console.log(Object.keys(metadatum).length);
  }

  if (blockId === endBlock) {
    console.log(metadatum);
  }

  if (traitConfiguration) {
    traitConfiguration.palette = controls.ovrPalette ? controls.palette : traitConfiguration.palette;
    traitConfiguration.pattern = controls.ovrPattern ? controls.pattern : traitConfiguration.pattern;
    traitConfiguration.theme = controls.ovrTheme ? (controls.darkMode ? Theme.DARK : Theme.WHITE) : traitConfiguration.theme;
  }

  const isDarkMode = (traitConfiguration?.theme) ? traitConfiguration?.theme === Theme.DARK : true;

  function tryIncrementId() {
    if (blockId < endBlock) {
      setBlockId(prev => {
        if (prev < endBlock) {
          return prev + 1;
        }
        return prev;
      })
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const parsedBlocks = await parseDataset(blockId + '.json');
        setParsedBlock(parsedBlocks);
      } catch (e) {
        tryIncrementId();
        setParsedBlock(undefined);
      }
    })();
  }, [blockId]);

  useEffect(() => {
    setBlockId(controls.blockId)
  }, [controls.blockId]);

  useEffect(() => {
    if (controls.render) {
      tryIncrementId();
    }
  }, [metadatum, controls.render]);

  return (
    <div className='w-[4096px] h-[4096px]'>

    </div>
  );
}
