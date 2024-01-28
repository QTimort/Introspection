'use client';
import React, {Suspense, useEffect, useState} from "react";
import {Canvas} from "@react-three/fiber";
import {Bounds} from "@react-three/drei";
import {Vector3} from "three";
import {MainScene} from "@/components/MainScene";
import {Effects} from "@/components/Effects";
import {parseDataset} from "@/utils/parse-dataset";
import {BlockDataset} from "@/types/block-dataset";
import {getTraitConfiguration, TraitConfiguration} from "@/utils/trait-configuration";
import {Theme} from "@/types/theme";

export function Introspection() {
  const [parsedBlock, setParsedBlock] = useState<BlockDataset | undefined>(undefined);
  const startBlock = 236425343;
  const [blockId, setBlockId] = useState(startBlock);
  const [traitConfiguration, setTraitConfiguration] = useState<undefined | TraitConfiguration>(parsedBlock ? getTraitConfiguration(parsedBlock) : undefined);
  const isDarkMode = (traitConfiguration?.theme) ? traitConfiguration?.theme === Theme.DARK : true;

  useEffect(() => {
    (async () => {
      try {
        const parsedBlocks = await parseDataset(blockId + '.json');
        setParsedBlock(parsedBlocks);
      } catch (e) {
        setParsedBlock(undefined);
      }
    })();
  }, [blockId]);

  useEffect(() => {
    setTraitConfiguration(parsedBlock ? getTraitConfiguration(parsedBlock) : undefined);
  }, [parsedBlock]);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'd' || event.key === 'D' || event.key === 'm' || event.key === 'M') {
      setTraitConfiguration(prev => {
        if (!prev) {
          return prev;
        }
        return ({
          ...prev,
          theme: prev.theme === Theme.WHITE ? Theme.DARK : Theme.WHITE
        })
      })
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', handleKeyPress);

    return () => {
      window.removeEventListener('keyup', handleKeyPress);
    };
  }, [traitConfiguration]);

  return (
    <div className='w-screen h-screen'>
      <Canvas
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        dpr={[1, 2]}
        orthographic
      >
        <color attach="background" args={[isDarkMode ? '#1c1c1c' : '#ffffff']}/>
        <hemisphereLight
          position={new Vector3(-100,1000,200)}
          intensity={4}
          color={'#ffffff'}
          groundColor={'#8c8c8c'}
        />
        <Effects is4k={true}/>
        <Suspense fallback={null}>
          {((parsedBlock && traitConfiguration) && (
            <Bounds maxDuration={0} fit clip observe margin={1.1}>
              <MainScene
                traitConfiguration={traitConfiguration}
                beautiful={true}
                position={new Vector3()}
                parsedBlock={parsedBlock}
                render={false}
              />
            </Bounds>
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
}
