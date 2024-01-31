import { ResourceType } from "./resource";


export interface UpgradeLevel {
    Level: number;
    Cost: number;
    Value: number;
}

export interface TerritoryUpgrade {
    Id: string;
    Name: string;
    Format: string;
    Sprite: string;
    Color: string;
    UsedResource: ResourceType;
    Levels: UpgradeLevel[];
}

export const DEFENCE: TerritoryUpgrade = {
    Id: "defence",
    Color: "mc-aqua",
    Name: "Defence",
    Format: "Defence: +{1}%",
    Sprite: "sprites/shield.webp",
    UsedResource: ResourceType.FISH,
    Levels: [
        { Level: 0, Cost: 0, Value: 0 },
        { Level: 1, Cost: 100, Value: 300 },
        { Level: 2, Cost: 300, Value: 450 },
        { Level: 3, Cost: 600, Value: 525 },
        { Level: 4, Cost: 1200, Value: 600 },
        { Level: 5, Cost: 2400, Value: 650 },
        { Level: 6, Cost: 4800, Value: 690 },
        { Level: 7, Cost: 8400, Value: 720 },
        { Level: 8, Cost: 12000, Value: 740 },
        { Level: 9, Cost: 15600, Value: 760 },
        { Level: 10, Cost: 19200, Value: 780 },
        { Level: 11, Cost: 22800, Value: 800 },
    ],
};

export const DAMAGE: TerritoryUpgrade = {
    Id: "damage",
    Name: "Damage",
    Color: "mc-gold",
    Format: "Damage: +{1}%",
    Sprite: "sprites/iron_sword.webp",
    UsedResource: ResourceType.ORE,
    Levels: [
        { Level: 0, Cost: 0, Value: 0 },
        { Level: 1, Cost: 100, Value: 40 },
        { Level: 2, Cost: 300, Value: 80 },
        { Level: 3, Cost: 600, Value: 120 },
        { Level: 4, Cost: 1200, Value: 160 },
        { Level: 5, Cost: 2400, Value: 200 },
        { Level: 6, Cost: 4800, Value: 240 },
        { Level: 7, Cost: 8400, Value: 280 },
        { Level: 8, Cost: 12000, Value: 320 },
        { Level: 9, Cost: 15600, Value: 360 },
        { Level: 10, Cost: 19200, Value: 400 },
        { Level: 11, Cost: 22800, Value: 440 },
    ],
};

export const ATTACK_SPEED: TerritoryUpgrade = {
    Id: "attack_speed",
    Name: "Attack Speed",
    Color: "mc-lime",
    Format: "Attacks per Second: +{1}%",
    Sprite: "sprites/rabbit_hide.webp",
    UsedResource: ResourceType.CROP,
    Levels: [
        { Level: 0, Cost: 0, Value: 0 },
        { Level: 1, Cost: 100, Value: 50 },
        { Level: 2, Cost: 300, Value: 100 },
        { Level: 3, Cost: 600, Value: 150 },
        { Level: 4, Cost: 1200, Value: 220 },
        { Level: 5, Cost: 2400, Value: 300 },
        { Level: 6, Cost: 4800, Value: 400 },
        { Level: 7, Cost: 8400, Value: 500 },
        { Level: 8, Cost: 12000, Value: 620 },
        { Level: 9, Cost: 15600, Value: 660 },
        { Level: 10, Cost: 19200, Value: 740 },
        { Level: 11, Cost: 22800, Value: 840 },
    ],
};

export const HEALTH: TerritoryUpgrade = {
    Id: "health",
    Name: "Health",
    Color: "mc-red",
    Format: "Health: +{1}%",
    Sprite: "sprites/fermented_spider_eye.png",
    UsedResource: ResourceType.WOOD,
    Levels: [
        { Level: 0, Cost: 0, Value: 0 },
        { Level: 1, Cost: 100, Value: 50 },
        { Level: 2, Cost: 300, Value: 100 },
        { Level: 3, Cost: 600, Value: 150 },
        { Level: 4, Cost: 1200, Value: 220 },
        { Level: 5, Cost: 2400, Value: 300 },
        { Level: 6, Cost: 4800, Value: 400 },
        { Level: 7, Cost: 8400, Value: 520 },
        { Level: 8, Cost: 12000, Value: 640 },
        { Level: 9, Cost: 15600, Value: 760 },
        { Level: 10, Cost: 19200, Value: 880 },
        { Level: 11, Cost: 22800, Value: 1000 },
    ],
};

export const KEY_UPGRADE_ATTACK_SPEED = "attack_speed"
export const KEY_UPGRADE_DEFENSE = "defence"
export const KEY_UPGRADE_HEALTH = "health"
export const KEY_UPGRADE_DAMAGE = "damage"


export const UPGRADES: Map<string, TerritoryUpgrade> = new Map<string, TerritoryUpgrade>([
    [KEY_UPGRADE_ATTACK_SPEED, ATTACK_SPEED],
    [KEY_UPGRADE_DAMAGE, DAMAGE],
    [KEY_UPGRADE_DEFENSE, DEFENCE],
    [KEY_UPGRADE_HEALTH, HEALTH]
])


