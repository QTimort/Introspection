import {useEffect, useRef, useCallback, useState} from 'react';
import {useFrame} from "@react-three/fiber";
import {BlockDataset} from "@/types/block-dataset";
import {useBounds} from "@react-three/drei";

export const useScreenshotOnBlockIdChange = (parsedBlock: BlockDataset, increaseId?: () => void, render = false) => {
  const bounds = useBounds()
  const [requestFrame, setRequestFrame] = useState(-1);
  const previousBlockSlot = useRef<number | null>(null);

  const takeScreenshot = useCallback(async () => {
    const filename = parsedBlock.meta.blockSlot + '.png';
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    const dataURL = canvas.toDataURL('image/png');
    increaseId?.();

    try {
      const blob = await (await fetch(dataURL)).blob();
      const formData = new FormData();
      formData.append('file', blob, filename);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Upload failed', error);
    }
  }, [parsedBlock, increaseId]);

  useEffect(() => {
    if (previousBlockSlot.current !== parsedBlock.meta.blockSlot) {
      bounds.refresh().reset().clip().fit();
      if (!render) {
        return;
      }
      previousBlockSlot.current = parsedBlock.meta.blockSlot;
      setRequestFrame(2);
    }
  }, [parsedBlock.meta.blockSlot, render]);

  useFrame(() => {
    if (requestFrame > 0) {
      setRequestFrame(requestFrame - 1);
    }
  });

  useEffect(() => {
    if (requestFrame === 0) {
      setRequestFrame(-1);
      takeScreenshot();
    }
  }, [requestFrame, takeScreenshot]);
};
