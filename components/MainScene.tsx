import {Euler, Vector3} from "three";
import {computeBlockRenderData} from "@/utils/compute-block-render";
import Transactions from "@/components/Transactions";
import React, {memo, useEffect, useRef, useState} from "react";
import {basicMaterial, physicalMaterial} from "@/constants/material";
import {OrbitControls, Text, useBounds} from "@react-three/drei";
import {BlockDataset} from "@/types/block-dataset";
import {TraitConfiguration} from "@/utils/trait-configuration";
import {Theme} from "@/types/theme";
import {useScreenshotOnBlockIdChange} from "@/components/useScreenshotOnBlockIdChange";
import {font} from "@/constants/font";
import {useScreenshot} from "@/components/useScreenshot";
import {font} from "@/constants/font";

export type MainSceneProps = {
  parsedBlock: BlockDataset,
  beautiful: boolean,
  position: Vector3,
  traitConfiguration: TraitConfiguration,
  increaseId?: () => void;
  render: boolean;
};

export const MainScene = memo((props: MainSceneProps) => {
  const material = props.beautiful ? physicalMaterial: basicMaterial;
  const {platformSize, platformPosition, blockRenderData} =
    computeBlockRenderData(props.parsedBlock, props.traitConfiguration);
  const bounds = useBounds();
  const orbitControlRef = useRef<any>();
  const [autoRotate, setAutoRotate] = useState<boolean>(false);

  useScreenshotOnBlockIdChange(props.parsedBlock, props.increaseId, props.render);
  useScreenshot(props.parsedBlock.meta.blockSlot);
  const isDarkMode = props.traitConfiguration.theme === Theme.DARK;

  function resetCamera() {
    bounds.refresh().reset().clip().fit();
    setTimeout(() => {
      orbitControlRef.current.setPolarAngle(Math.PI / 5);
      orbitControlRef.current.setAzimuthalAngle(-2.25450570874225);
      bounds.refresh().reset().clip().fit();
    }, 100)
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'o' || event.key === 'O') {
      setAutoRotate(prev => !prev);
    }
    if (event.key === 'r' || event.key === 'R') {
      resetCamera();
    }
    if (event.key === 'l' || event.key === 'L') {
      resetCamera();
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', handleKeyPress);

    return () => {
      window.removeEventListener('keyup', handleKeyPress);
    };
  }, [bounds]);

  useEffect(() => {
    // initial camera setup
    resetCamera();
    setTimeout(() => {
      // just for extra measure
      resetCamera();
    }, 250)
  }, []);

  return (
    <group>
      <mesh scale={platformSize} position={platformPosition}>
        <boxGeometry args={[1, 1, 1]}/>
        <meshPhysicalMaterial color={isDarkMode ? '#282f38' : '#cbcbcb'}/>
      </mesh>
      <mesh scale={platformSize.clone().add(new Vector3(3, 0, 3))}
            position={platformPosition.clone().sub(new Vector3(0, 1, 0))}>
        <boxGeometry args={[1, 1, 1]}/>
        <meshPhysicalMaterial color={isDarkMode ? '#a4a4a4' : '#525252'}/>
      </mesh>
      <Text
        fillOpacity={isDarkMode ? 0.5 : 0.8}
        font={font}
        position={new Vector3(-3, platformPosition.y + 0.51, 0)}
        scale={[2, 2, 2]}
        rotation={new Euler(-Math.PI / 2, 0, -Math.PI / 2)}
        color={isDarkMode ? '#ffffff' : '#000000'}
        anchorX={'left'}
        anchorY={'top'}
      >
        {props.parsedBlock.meta.blockSlot}
      </Text>
      <Transactions
        beautiful={props.beautiful}
        position={props.position}
        blockRenderData={blockRenderData}
        material={material}
      />
      <OrbitControls
        ref={orbitControlRef}
        autoRotateSpeed={0.5}
        autoRotate={autoRotate}
        enableRotate={true}
        enableZoom={true}
        enablePan={true}
        enableDamping={false}
        makeDefault
        minDistance={0}
        maxDistance={Infinity}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
      />
    </group>
  );
});
