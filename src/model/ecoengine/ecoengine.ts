export const TERRITORIES: any = await (await fetch("/builder/territories.json")).json() ;
export const SKY_CLAIM_PRESET: any = await (await fetch("/builder/presets/sky.json")).json() ;
