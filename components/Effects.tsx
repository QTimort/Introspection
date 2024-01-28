import {Bloom, BrightnessContrast, EffectComposer, N8AO} from '@react-three/postprocessing'
import React from "react";

export interface EffectsProps {
  is4k?: boolean;
}
export function Effects(props: EffectsProps) {
  return (
    <EffectComposer multisampling={16} autoClear={false}>
      <Bloom
        mipmapBlur luminanceSmoothing={0.5} opacity={0.5} luminanceThreshold={1.1} intensity={props.is4k ? 1.75 : 1}
        blurPass={undefined}
        radius={0.5}
        levels={8}
      />
      <BrightnessContrast contrast={0.1}></BrightnessContrast>
      <N8AO denoiseSamples={16} quality={'ultra'} aoRadius={0.3} intensity={1} />
    </EffectComposer>
  )
}
