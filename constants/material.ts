import {MeshBasicMaterial, MeshLambertMaterial, MeshPhysicalMaterial} from "three";

export const physicalMaterial = new MeshPhysicalMaterial(
  {toneMapped: false, metalness: 0.1, roughness: 0, clearcoat: 1}
);
export const transparentMaterial = new MeshLambertMaterial(
  {toneMapped: false,  transparent: true, opacity: 0.5}
);
export const basicMaterial = new MeshBasicMaterial(
  {toneMapped: false}
);
