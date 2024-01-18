import { ResourceType } from "./resource";
import { BorderStyle, RouteStyle, Territory, Treasury } from "./territory";
import * as bonuses from "./bonuses"
import * as upgrades from "./upgrades";

export class BaseTerritory {
    territory: string;
    ore: number;
    crop: number;
    wood: number;
    fish: number;
    emerald: number;
    conns: string[];

    createTerritoryInstance(): Territory {
        let territory = new Territory();
        territory.HQ = false;
        territory.name = '';
        territory.claim = null;
        territory.treasury = Treasury.VERY_LOW;
        territory.routeStyle = RouteStyle.CHEAPEST;
        territory.borders = BorderStyle.OPEN;
        territory.tax = 0.05;
        territory.allyTax = 0.05;
        territory.storage = new Map<ResourceType, number>([
            [ResourceType.CROP, 0]
            [ResourceType.ORE, 0]
            [ResourceType.WOOD, 0]
            [ResourceType.FISH, 0]
            [ResourceType.EMERALD, 0]
        ]);
        territory.productionMultipliers = new Map<ResourceType, number>([
            [ResourceType.CROP, this.crop],
            [ResourceType.ORE, this.ore],
            [ResourceType.WOOD, this.wood],
            [ResourceType.FISH, this.fish],
            [ResourceType.EMERALD, this.emerald]
        ]);
        territory.passingResource = [];
        territory.lastResourceProduced = 0;
        territory.lastEmeraldProduced = 0;
        territory.lastConsumedResource = 0;
        territory.lastResourceTransfer = 0;
        territory.resourceGap = false;
        territory.resourceOverflow = false;
        territory.connections = this.conns;
        territory.bonuses = new Map<string, number>([
            [bonuses.KEY_BONUS_STRONGER_MINIONS, 0],
            [bonuses.KEY_BONUS_MULTIHIT, 0],
            [bonuses.KEY_BONUS_TOWER_AURA, 0],
            [bonuses.KEY_BONUS_TOWER_VOLLEY, 0],
            [bonuses.KEY_BONUS_GATHER_XP, 0],
            [bonuses.KEY_BONUS_MOB_XP, 0],
            [bonuses.KEY_BONUS_MOB_DAMAGE, 0],
            [bonuses.KEY_BONUS_PVP_DAMAGE, 0],
            [bonuses.KEY_BONUS_XP_SEEKING, 0],
            [bonuses.KEY_BONUS_TOME_SEEKING, 0],
            [bonuses.KEY_BONUS_EMERALD_SEEKING, 0],
            [bonuses.KEY_BONUS_LARGE_RESOURCE_STORAGE, 0],
            [bonuses.KEY_BONUS_LARGE_EMERALD_STORAGE, 0],
            [bonuses.KEY_BONUS_EFFICIENT_RESOURCES, 0],
            [bonuses.KEY_BONUS_EFFICIENT_EMERALDS, 0],
            [bonuses.KEY_BONUS_RESOURCE_RATE, 0],
            [bonuses.KEY_BONUS_EMERALD_RATE, 0],
        ]);
        territory.upgrades = new Map<string, number>([
            [upgrades.KEY_UPGRADE_ATTACK_SPEED, 1],
            [upgrades.KEY_UPGRADE_DAMAGE, 1],
            [upgrades.KEY_UPGRADE_DEFENSE, 1],
            [upgrades.KEY_UPGRADE_HEALTH, 1]
        ]);
        return territory
    }
}
