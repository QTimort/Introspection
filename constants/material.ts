import {MeshBasicMaterial, MeshPhysicalMaterial} from "three";

export const physicalMaterial = new MeshPhysicalMaterial(
  {toneMapped: false, metalness: 0.1, roughness: 0, clearcoat: 1}
);
export const basicMaterial = new MeshBasicMaterial(
  {toneMapped: false}
);
