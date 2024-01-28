import {Color} from "three";
import {PaletteName} from "@/types/palette-name";

export const glowGreen = new Color(0.8, 10, 1);
export const glowBlue = new Color(1, 1.15, 15);
export const errorColor = new Color('#424242');

const beige = '#F5F5DC';

export const palettes: { [key in PaletteName]: string[]} =
  {
    [PaletteName.APAB]: ['#219966', '#E5E5E5', '#4781EB'],
    [PaletteName.SEASIDE_HOLIDAY] : ['#2f74e5', beige, '#f6693b'],
    [PaletteName.INTENTIONAL_COLOURING] : ['#1ccc86', '#FFFFFF', '#c0c0c0'],
    [PaletteName.MILENA]: ['#5e5d5d', '#6b53e0', '#6e95e3', '#c99664'],
    [PaletteName.MATRIX]: ['#32503e', '#295d33', '#2b7945', '#80ce87', '#92e5a1'],
    [PaletteName.VOID]: ['#343434'],
    [PaletteName.PURE]: ['#f1f1f1'],
    [PaletteName.SOLANA]: ['#9944FF', '#786EE6', '#608ED3','#47AEBF', '#58B5C5'],
    [PaletteName.NETHER]: ['#c33232', '#8c3c3c', '#593333', '#3c3030'],
    [PaletteName.PORTAL] : ['#ff9d08', "#3e3e3e","#44759f","#49acff","#94ceff","#b9dfff","#def0ff"],
    [PaletteName.HEAT] : ['#593e67', '#84495f', '#b85b56', '#de741c', '#fea837'],
    [PaletteName.PICASSO] : ['#ca483e', '#3585cc', '#70b345', '#cfc02e', '#7148bd', '#fd8301', '#4a4a4a'],
    [PaletteName.AE86] : ['#4a4a4a', '#e6e6e6'],
    [PaletteName.SKY] : ['#dcd9d9', '#6cb0e6'],
    [PaletteName.PASTEL_SUNSET] : ['#7071E8', '#C683D7', '#ED9ED6', '#FFC7C7'],
    [PaletteName.LAPIS_LAZULI] : ['#3d455b', '#485380', '#505b91', '#5c66d0', '#94a8fd'],
    [PaletteName.MIRROR_EDGE] : ['#2a49a2', '#227cf2', '#a1bec2', '#fdc384', '#de7334', '#e0505f'],
    [PaletteName.BLADE_RUNNER] : [ '#394465',  '#416bb0', '#3c89e9', '#8460c2', '#9d5bbd', '#dc68b5'],
    [PaletteName.RETRO_PASTEL] : ['#e55d5a', '#e1714c', '#ffaa70', '#67b19d', '#08769a', '#fedbbc'],
    [PaletteName.EMERALD] : ['#84b08d', '#629473', '#477e5e', '#2f6742', '#0a5133'],
    [PaletteName.FIDENZA] : ['#7ca9bf', '#ebe4d8', '#db4f54', '#fcbc19', '#543e2e', '#29a691'],
    [PaletteName.VAN_GOGH] : ['#2b449a', '#4b73a7', '#bec075', '#bfa603', '#2e3d48'],
    [PaletteName.HENRI_MATISSE] : ['#f8c99b', '#64ae99', '#ef967b', '#e87e70', '#e4d0c4', '#7d798e', '#45587d', '#e3dee1'],
    [PaletteName.CLAUDE_MONET] : ['#49676b', '#7aa2b0', '#465079', '#4275b6', '#dcbd71'],
    [PaletteName.WATER_LILLY] : ['#24476e', '#6789b4', '#8bab7b', '#689367', '#bd859f'],
    [PaletteName.THE_BAY] : ['#a3add5', '#7cbd8b', '#6a65b2', '#fdf7d2', '#809dda'],
    [PaletteName.GEORGIA_O_KEEFFE] : ['#add0cb', '#3fadd3', '#0280b5', '#e2a6d6', '#fed1bc'],
    [PaletteName.AURORA_GARDEN] : ['#e9dd8d', '#a4cddb', '#9cbfa1', '#3d7a70', '#5d5cd0', '#feebe2'],
    [PaletteName.LUPINE] : ['#de915e', '#64b394', '#7e82e5', '#715e9f', '#e06b6b'],
    [PaletteName.MARITIME_MINGLE] : ['#6079bb', '#3aa18c', '#d56162', '#f7f8fd'],
    [PaletteName.RETRO] : ['#d0d0d0', '#4b6cd9', '#484848', '#cc5454', '#f6b908'],
    [PaletteName.CH] : [beige, '#e54d4d'],
    [PaletteName.BTC] : ['#ff9900'],
};

export const heatInstructionSizePalettes = [
  PaletteName.HENRI_MATISSE,
  PaletteName.RETRO_PASTEL,
  PaletteName.AURORA_GARDEN
];

export const palettesWeight: { [key in PaletteName]: number} = {
  [PaletteName.APAB]: 512,
  [PaletteName.SEASIDE_HOLIDAY]: 256,
  [PaletteName.INTENTIONAL_COLOURING]: 256,
  [PaletteName.MILENA]: 512,
  [PaletteName.MATRIX]: 256,
  [PaletteName.VOID]: 16, // rare
  [PaletteName.PURE]: 16, // rare
  [PaletteName.SOLANA]: 512,
  [PaletteName.NETHER]: 256,
  [PaletteName.PORTAL]: 512,
  [PaletteName.HEAT]: 512,
  [PaletteName.PICASSO]: 512,
  [PaletteName.AE86]: 128, // rare
  [PaletteName.SKY]: 64,  // rare
  [PaletteName.PASTEL_SUNSET]: 256,
  [PaletteName.LAPIS_LAZULI]: 512,
  [PaletteName.MIRROR_EDGE]: 512,
  [PaletteName.BLADE_RUNNER]: 512,
  [PaletteName.RETRO_PASTEL]: 512,
  [PaletteName.EMERALD]: 512,
  [PaletteName.FIDENZA]: 256,
  [PaletteName.VAN_GOGH]: 128,
  [PaletteName.HENRI_MATISSE]: 256,
  [PaletteName.CLAUDE_MONET] : 512,
  [PaletteName.WATER_LILLY] : 128,
  [PaletteName.THE_BAY] : 256,
  [PaletteName.GEORGIA_O_KEEFFE] : 256,
  [PaletteName.AURORA_GARDEN] : 256,
  [PaletteName.LUPINE] : 256,
  [PaletteName.MARITIME_MINGLE] : 256,
  [PaletteName.RETRO] : 512,
  [PaletteName.CH] : 64, // rare
  [PaletteName.BTC] : 4, // rare
}
