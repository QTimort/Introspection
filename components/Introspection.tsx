'use client';
import React, {Suspense, useEffect, useState} from "react";
import {useControls} from "leva";
import {Canvas} from "@react-three/fiber";
import {Bounds, OrbitControls} from "@react-three/drei";
import {Vector3} from "three";
import {MainScene} from "@/components/MainScene";
import {Effects} from "@/components/Effects";
import {parseDataset} from "@/utils/parse-dataset";
import {BlockDataset} from "@/types/block-dataset";
import {getTraitConfiguration} from "@/utils/trait-configuration";
import {palettes} from "@/constants/color";
import {PaletteName} from "@/types/palette-name";
import {patterns} from "@/constants/patterns";
import {Theme} from "@/types/theme";

export function Introspection() {
  const [parsedBlock, setParsedBlock] = useState<BlockDataset | undefined>(undefined);
  const startBlock = 236425343;
  const endBlock = 236435967;
  const [blockId, setBlockId] = useState(startBlock);

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

  return (
    <div className='w-[4096px] h-[4096px]'>
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
                increaseId={tryIncrementId}
                render={controls.render}
              />
            </Bounds>
          ))}
        </Suspense>
        <OrbitControls
          enableRotate={false}
          enableZoom={false}
          enablePan={false}
          enableDamping={false}
          makeDefault
          minDistance={0}
          maxDistance={Infinity}
          minPolarAngle={Math.PI / 4.5}
          maxPolarAngle={Math.PI / 4.5}
        />
      </Canvas>
    </div>
  );
}
