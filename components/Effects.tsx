import {Bloom, BrightnessContrast, EffectComposer, N8AO, Noise} from '@react-three/postprocessing'
import React from "react";

export function Effects() {
  // todo change according to resolution
  const is4k = true;
  return (
    <EffectComposer multisampling={16} autoClear={false}>
      <Bloom
        //blendFunction={BlendFunction.ADD}
        mipmapBlur luminanceSmoothing={0.5} opacity={0.5} luminanceThreshold={1.1} intensity={is4k ? 1.75 : 1}
        blurPass={undefined} // A blur pass.
        //blendFunction={BlendFunction.ADD}
        //blendFunction={BlendFunction.AVERAGE}
        radius={0.5}
        levels={8}
      />
      <BrightnessContrast contrast={0.1}></BrightnessContrast>
      <N8AO denoiseSamples={16} quality={'ultra'} aoRadius={0.3} intensity={1} />
    </EffectComposer>
  )
}
