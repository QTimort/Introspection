import {Euler, Vector3} from "three";
import {computeBlockRenderData} from "@/utils/compute-block-render";
import Transactions from "@/components/Transactions";
import React, {memo} from "react";
import {basicMaterial, physicalMaterial} from "@/constants/material";
import {Text} from "@react-three/drei";
import {BlockDataset} from "@/types/block-dataset";
import {TraitConfiguration} from "@/utils/trait-configuration";
import {Theme} from "@/types/theme";
import {useScreenshotOnBlockIdChange} from "@/components/useScreenshotOnBlockIdChange";
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

  useScreenshotOnBlockIdChange(props.parsedBlock, props.increaseId, props.render);

  const isDarkMode = props.traitConfiguration.theme === Theme.DARK;

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
    </group>
  );
});
