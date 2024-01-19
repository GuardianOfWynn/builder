import { BaseTerritory } from "../../ecoengine/base_territory";
import { ClaimPreset } from "../../ecoengine/claim";

export const TERRITORIES: BaseTerritory[] = await (await fetch("/builder/territories.json")).json() ;
export const SKY_CLAIM_PRESET: ClaimPreset = await (await fetch("/builder/presets/sky.json")).json() ;

