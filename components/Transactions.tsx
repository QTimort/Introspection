import React, {useEffect, useRef} from 'react';
import {InstancedMesh, Material, Matrix4, Quaternion, Texture, Vector3} from 'three';
import {BlockRenderData} from "@/types/block-render-data";
import {boxGeometry} from "@/constants/geometry";

interface RenderBlockProps {
  position: Vector3;
  blockRenderData: BlockRenderData[];
  material: Material;
  beautiful: boolean;
  normalMap?: Texture;
}

export function Transactions(props: RenderBlockProps) {
  const instancedMeshRef = useRef<InstancedMesh>(null);

  useEffect(() => {
    if (instancedMeshRef.current == null) {
      return;
    }

    let i = 0;
    for (let { size, pos, color } of props.blockRenderData) {
      instancedMeshRef.current.setMatrixAt(i, new Matrix4().compose(pos, new Quaternion(), size));
      instancedMeshRef.current.setColorAt(i, color);
      ++i;
    }
    instancedMeshRef.current.frustumCulled = false;
    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    if (instancedMeshRef.current.instanceColor) {
      instancedMeshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh
      castShadow={props.beautiful}
      receiveShadow={props.beautiful}
      position={props.position}
      ref={instancedMeshRef}
      args={[boxGeometry, props.material, props.blockRenderData.length]}
    />
  );
}

export default Transactions;
