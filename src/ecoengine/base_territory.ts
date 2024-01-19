import { ResourceType } from "./resource";
import { Territory } from "./territory";

export class BaseTerritory {
    territory: string;
    ore: number;
    crop: number;
    wood: number;
    fish: number;
    emerald: number;
    conns: string[];
}

export function createTerritoryInstance(terr: BaseTerritory): Territory {
    let territory = new Territory();
    territory.name = terr.territory;
    territory.connections = terr.conns;
    territory.productionMultipliers = new Map<ResourceType, number>([
        [ResourceType.CROP, terr.crop],
        [ResourceType.ORE, terr.ore],
        [ResourceType.WOOD, terr.wood],
        [ResourceType.FISH, terr.fish],
        [ResourceType.EMERALD, terr.emerald]
    ]);
    territory.reset();
    return territory
}
