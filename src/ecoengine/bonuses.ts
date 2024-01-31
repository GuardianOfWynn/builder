import { ResourceType } from "./resource";

export const KEY_BONUS_STRONGER_MINIONS = "stronger_minions";
export const KEY_BONUS_MULTIHIT = "multihit";
export const KEY_BONUS_TOWER_AURA = "tower_aura";
export const KEY_BONUS_TOWER_VOLLEY = "tower_volley";
export const KEY_BONUS_GATHER_XP = "gather_xp";
export const KEY_BONUS_MOB_XP = "mob_xp";
export const KEY_BONUS_MOB_DAMAGE = "mob_damage";
export const KEY_BONUS_PVP_DAMAGE = "pvp_damage";
export const KEY_BONUS_XP_SEEKING = "xp_seeking";
export const KEY_BONUS_TOME_SEEKING = "tome_seeking";
export const KEY_BONUS_EMERALD_SEEKING = "emerald_seeking";
export const KEY_BONUS_LARGE_RESOURCE_STORAGE = "large_resource_storage";
export const KEY_BONUS_LARGE_EMERALD_STORAGE = "larger_emerald_storage";
export const KEY_BONUS_EFFICIENT_RESOURCES = "efficient_resource";
export const KEY_BONUS_EFFICIENT_EMERALDS = "efficient_emerald";
export const KEY_BONUS_RESOURCE_RATE = "resource_rate";
export const KEY_BONUS_EMERALD_RATE = "emerald_rate";

export interface BonusLevel {
    Level: number;
    Cost: number;
    Value: number;
    MaxTerritories: number;
}

export interface TerritoryBonus {
    Id: string;
    Name: string;
    Format: string;
    Sprite: string;
    UsedResorce: ResourceType;
    Levels: Map<number, BonusLevel>;
    MaxTerritories: number;
    Description: string[];
}

const STRONGER_MINIONS: TerritoryBonus = {
    Id: KEY_BONUS_STRONGER_MINIONS,
    Name: "Stronger Minions",
    Format: "Minion Damage: +{1}%",
    Sprite: "sprites/skull.png",
    UsedResorce: ResourceType.WOOD,
    Description: [
        'Buffs the minions that spawn',
        'when your territory is attacked.'
    ],
    Levels: new Map<number, BonusLevel>([
        [0, { Level: 0, Cost: 0, Value: 0, MaxTerritories: 0 }],
        [1, { Level: 1, Cost: 200, Value: 150, MaxTerritories: 0 }],
        [2, { Level: 2, Cost: 400, Value: 200, MaxTerritories: 0 }],
        [3, { Level: 3, Cost: 800, Value: 250, MaxTerritories: 0 }],
        [4, { Level: 4, Cost: 1600, Value: 300, MaxTerritories: 0 }],
    ]),
    MaxTerritories: 0,
};

const MULTI_HIT: TerritoryBonus = {
    Id: KEY_BONUS_MULTIHIT,
    Name: "Tower Multi-Attacks",
    Format: "Max Targets: {1}",
    Sprite: "sprites/arrow.png",
    UsedResorce: ResourceType.FISH,
    Description: [
        'Increases the number of players',
        'your Guild Tower can attack at once',
        '',
        'This upgrade is limited to',
        '5 territories.'
    ],
    Levels: new Map<number, BonusLevel>([
        [0, { Level: 0, Cost: 0, Value: 1, MaxTerritories: 0 }],
        [1, { Level: 1, Cost: 4800, Value: 2, MaxTerritories: 5 }],
    ]),
    MaxTerritories: 5,
};

const TOWER_AURA: TerritoryBonus = {
    Id: KEY_BONUS_TOWER_AURA,
    Name: "Tower Aura",
    Format: "Frequency: {1}s",
    Sprite: "sprites/368_0.webp",
    UsedResorce: ResourceType.CROP,
    Description: [
        'Cast and outward-moving Aura from',
        'the Tower damaging players between',
        "100% and 200% of the Tower's damage"
    ],
    Levels: new Map<number, BonusLevel>([
        [0, { Level: 0, Cost: 0, Value: 0, MaxTerritories: 0 }],
        [1, { Level: 1, Cost: 800, Value: 24, MaxTerritories: 0 }],
        [2, { Level: 2, Cost: 1600, Value: 18, MaxTerritories: 0 }],
        [3, { Level: 3, Cost: 3200, Value: 12, MaxTerritories: 0 }],
    ]),
    MaxTerritories: 0,
};

const TOWER_VOLLEY: TerritoryBonus = {
    Id: KEY_BONUS_TOWER_VOLLEY,
    Name: "Tower Volley",
    Format: "s",
    Sprite: "sprites/385_0.webp",
    UsedResorce: ResourceType.ORE,
    Description: [
        'Cast a volley of fireballs from the',
        'tower damaging players between 100%',
        "and 200% of the Tower's damage"
    ],
    Levels: new Map<number, BonusLevel>([
        [0, { Level: 0, Cost: 0, Value: 0, MaxTerritories: 0 }],
        [1, { Level: 1, Cost: 200, Value: 20, MaxTerritories: 0 }],
        [2, { Level: 2, Cost: 400, Value: 15, MaxTerritories: 0 }],
        [3, { Level: 3, Cost: 800, Value: 10, MaxTerritories: 0 }],
    ]),
    MaxTerritories: 0,
};

const GATHERING_XP: TerritoryBonus = {
    Id: KEY_BONUS_GATHER_XP,
    Name: "Gathering Experience",
    Format: "Gathering XP: +{1}%",
    Sprite: "sprites/carrot.png",
    UsedResorce: ResourceType.WOOD,
    Description: [
        'Guild members in this territory',
        'will gain bonus gathering XP'
    ],
    Levels: new Map<number, BonusLevel>([
        [0, { Level: 0, Cost: 0, Value: 0, MaxTerritories: 0 }],
        [1, { Level: 1, Cost: 600, Value: 10, MaxTerritories: 0 }],
        [2, { Level: 2, Cost: 1300, Value: 20, MaxTerritories: 0 }],
        [3, { Level: 3, Cost: 2000, Value: 30, MaxTerritories: 0 }],
        [4, { Level: 4, Cost: 2700, Value: 40, MaxTerritories: 0 }],
        [5, { Level: 5, Cost: 3400, Value: 50, MaxTerritories: 0 }],
        [6, { Level: 6, Cost: 5500, Value: 60, MaxTerritories: 0 }],
        [7, { Level: 7, Cost: 10000, Value: 80, MaxTerritories: 0 }],
        [8, { Level: 8, Cost: 20000, Value: 100, MaxTerritories: 0 }],
    ]),
    MaxTerritories: 0,
};

const MOB_XP: TerritoryBonus = {
    Id: KEY_BONUS_MOB_XP,
    Name: "Mob Experience",
    Format: "XP Bonus: +{1}%",
    Sprite: "sprites/175_0.webp",
    MaxTerritories: 5,
    UsedResorce: ResourceType.FISH,
    Description: [
        'Guild members in this territory',
        'will receive more XP from mobs'
    ],
    Levels: new Map<number, BonusLevel>([
        [0, { Level: 0, Cost: 0, Value: 0, MaxTerritories: 5 }],
        [1, { Level: 1, Cost: 600, Value: 10, MaxTerritories: 5 }],
        [2, { Level: 2, Cost: 1200, Value: 20, MaxTerritories: 5 }],
        [3, { Level: 3, Cost: 1800, Value: 30, MaxTerritories: 5 }],
        [4, { Level: 4, Cost: 2400, Value: 40, MaxTerritories: 5 }],
        [5, { Level: 5, Cost: 3000, Value: 50, MaxTerritories: 5 }],
        [6, { Level: 6, Cost: 5000, Value: 60, MaxTerritories: 5 }],
        [7, { Level: 7, Cost: 10000, Value: 80, MaxTerritories: 5 }],
        [8, { Level: 8, Cost: 20000, Value: 100, MaxTerritories: 5 }],
    ]),
};

const MOB_DAMAGE: TerritoryBonus = {
    Id: KEY_BONUS_MOB_DAMAGE,
    Name: "Mob Damage",
    Format: "Damage to mobs: +{1}%",
    Sprite: "sprites/stone_sword.webp",
    UsedResorce: ResourceType.CROP,
    Description: [
        'Guild member in this territory',
        'will deal more damage to mobs'
    ],
    Levels: new Map<number, BonusLevel>([
        [0, { Level: 0, Cost: 0, Value: 0, MaxTerritories: 0 }],
        [1, { Level: 1, Cost: 600, Value: 10, MaxTerritories: 0 }],
        [2, { Level: 2, Cost: 1200, Value: 20, MaxTerritories: 0 }],
        [3, { Level: 3, Cost: 1800, Value: 40, MaxTerritories: 0 }],
        [4, { Level: 4, Cost: 2400, Value: 60, MaxTerritories: 0 }],
        [5, { Level: 5, Cost: 3000, Value: 80, MaxTerritories: 0 }],
        [6, { Level: 6, Cost: 5000, Value: 120, MaxTerritories: 0 }],
        [7, { Level: 7, Cost: 10000, Value: 160, MaxTerritories: 0 }],
        [8, { Level: 8, Cost: 20000, Value: 200, MaxTerritories: 0 }],
    ]),
    MaxTerritories: 0,
};

const PVP_DAMAGE: TerritoryBonus = {
    Id: KEY_BONUS_PVP_DAMAGE,
    Name: "PvP Damage",
    Format: "Damage Bonus: +{1}%",
    Sprite: "sprites/gold_sword.webp",
    UsedResorce: ResourceType.ORE,
    Description: [
        'Guild members in this territory',
        'will deal more damage to players'
    ],
    Levels: new Map<number, BonusLevel>([
        [0, { Level: 0, Cost: 0, Value: 0, MaxTerritories: 0 }],
        [1, { Level: 1, Cost: 600, Value: 5, MaxTerritories: 0 }],
        [2, { Level: 2, Cost: 1200, Value: 10, MaxTerritories: 0 }],
        [3, { Level: 3, Cost: 1800, Value: 15, MaxTerritories: 0 }],
        [4, { Level: 4, Cost: 2400, Value: 20, MaxTerritories: 0 }],
        [5, { Level: 5, Cost: 3000, Value: 25, MaxTerritories: 0 }],
        [6, { Level: 6, Cost: 5000, Value: 40, MaxTerritories: 0 }],
        [7, { Level: 7, Cost: 10000, Value: 60, MaxTerritories: 0 }],
        [8, { Level: 8, Cost: 20000, Value: 80, MaxTerritories: 0 }],
    ]),
    MaxTerritories: 0,
};

const XP_SEEKING: TerritoryBonus = {
    Id: KEY_BONUS_XP_SEEKING,
    Name: "XP Seeking",
    Format: "Guild XP: +{1}/h",
    Sprite: "sprites/348_0.webp",
    UsedResorce: ResourceType.EMERALD,
    Description: [
        'Your Guild will gain XP',
        'while holding this territory',
        '',
        'This upgrade is limited to',
        '5 territories.'
    ],
    Levels: new Map<number, BonusLevel>([
        [0, { Level: 0, Cost: 0, Value: 0, MaxTerritories: 0 }],
        [1, { Level: 1, Cost: 100, Value: 36000, MaxTerritories: 0 }],
        [2, { Level: 2, Cost: 200, Value: 66000, MaxTerritories: 0 }],
        [3, { Level: 3, Cost: 400, Value: 120000, MaxTerritories: 0 }],
        [4, { Level: 4, Cost: 800, Value: 228000, MaxTerritories: 0 }],
        [5, { Level: 5, Cost: 1600, Value: 456000, MaxTerritories: 0 }],
        [6, { Level: 6, Cost: 3200, Value: 900000, MaxTerritories: 0 }],
        [7, { Level: 7, Cost: 6400, Value: 1740000, MaxTerritories: 0 }],
        [8, { Level: 8, Cost: 9600, Value: 2580000, MaxTerritories: 0 }],
        [9, { Level: 9, Cost: 12800, Value: 3360000, MaxTerritories: 0 }],
    ]),
    MaxTerritories: 5,
};

const TOME_SEEKING: TerritoryBonus = {
    Id: KEY_BONUS_TOME_SEEKING,
    Name: "Tome Seeking",
    Format: "Drop Chance: {1}%/h",
    Sprite: "sprites/tome.png",
    UsedResorce: ResourceType.FISH,
    Description: [
        'Your Guild will have a chance',
        'to find exclusive Tomes while',
        'holding this territory'
    ],
    Levels: new Map<number, BonusLevel>([
        [0, { Level: 0, Cost: 0, Value: 0, MaxTerritories: 0 }],
        [1, { Level: 1, Cost: 800, Value: 0.15, MaxTerritories: 0 }],
        [2, { Level: 2, Cost: 4800, Value: 1.2, MaxTerritories: 0 }],
        [3, { Level: 3, Cost: 12800, Value: 2.4, MaxTerritories: 0 }],
    ]),
    MaxTerritories: 0,
};

const EMERALD_SEEKING: TerritoryBonus = {
    Id: KEY_BONUS_EMERALD_SEEKING,
    Name: "Emerald Seeking",
    Format: "Drop Chance: {1}%/h",
    Sprite: "sprites/129_0.webp",
    UsedResorce: ResourceType.WOOD,
    Description: [
        'Your Guild will have a chance',
        'to find Emeralds while holding',
        'this territory'
    ],
    Levels: new Map<number, BonusLevel>([
        [0, { Level: 0, Cost: 0, Value: 0, MaxTerritories: 0 }],
        [1, { Level: 1, Cost: 200, Value: 0.3, MaxTerritories: 0 }],
        [2, { Level: 2, Cost: 800, Value: 3, MaxTerritories: 0 }],
        [3, { Level: 3, Cost: 1600, Value: 6, MaxTerritories: 0 }],
        [4, { Level: 4, Cost: 3200, Value: 12, MaxTerritories: 0 }],
        [5, { Level: 5, Cost: 6400, Value: 24, MaxTerritories: 0 }],
    ]),
    MaxTerritories: 0,
};

const LARGER_RESOURCE_STORAGE: TerritoryBonus = {
    Id: KEY_BONUS_LARGE_RESOURCE_STORAGE,
    Name: "Larger Resource Storage",
    Format: "Storage Bonus: +{1}%",
    Sprite: "sprites/bread.png",
    UsedResorce: ResourceType.EMERALD,
    Description: [
        'Increases the storage limit for',
        'resources in this territory'
    ],
    Levels: new Map<number, BonusLevel>([
        [0, { Level: 0, Cost: 0, Value: 0, MaxTerritories: 0 }],
        [1, { Level: 1, Cost: 400, Value: 100, MaxTerritories: 0 }],
        [2, { Level: 2, Cost: 800, Value: 300, MaxTerritories: 0 }],
        [3, { Level: 3, Cost: 2000, Value: 700, MaxTerritories: 0 }],
        [4, { Level: 4, Cost: 5000, Value: 1400, MaxTerritories: 0 }],
        [5, { Level: 5, Cost: 16000, Value: 3300, MaxTerritories: 0 }],
        [6, { Level: 6, Cost: 48000, Value: 7900, MaxTerritories: 0 }],
    ]),
    MaxTerritories: 0,
};

const LARGER_EMERALD_STORAGE: TerritoryBonus = {
    Id: KEY_BONUS_LARGE_EMERALD_STORAGE,
    Name: "Larger Emerald Storage",
    Format: "Storage Bonus: +{1}%",
    Sprite: "sprites/emerald_block.png",
    UsedResorce: ResourceType.WOOD,
    Description: [
        'Increases the storage limit for',
        'emeralds in this territory'
    ],
    Levels: new Map<number, BonusLevel>([
        [0, { Level: 0, Cost: 0, Value: 0, MaxTerritories: 0 }],
        [1, { Level: 1, Cost: 200, Value: 100, MaxTerritories: 0 }],
        [2, { Level: 2, Cost: 400, Value: 300, MaxTerritories: 0 }],
        [3, { Level: 3, Cost: 1000, Value: 700, MaxTerritories: 0 }],
        [4, { Level: 4, Cost: 2500, Value: 1400, MaxTerritories: 0 }],
        [5, { Level: 5, Cost: 8000, Value: 3300, MaxTerritories: 0 }],
        [6, { Level: 6, Cost: 24000, Value: 7900, MaxTerritories: 0 }],
    ]),
    MaxTerritories: 0,
};

const EFFICIENT_RESOURCES: TerritoryBonus = {
    Id: KEY_BONUS_EFFICIENT_RESOURCES,
    Name: "Efficient Resources",
    Format: "Gathering Bonus: +{1}%",
    Sprite: "sprites/golden_pickaxe.png",
    UsedResorce: ResourceType.EMERALD,
    Description: [
        'Increases the amount of resources',
        'this territory will produce'
    ],
    Levels: new Map<number, BonusLevel>([
        [0, { Level: 0, Cost: 0, Value: 0, MaxTerritories: 0 }],
        [1, { Level: 1, Cost: 6000, Value: 50, MaxTerritories: 0 }],
        [2, { Level: 2, Cost: 12000, Value: 100, MaxTerritories: 0 }],
        [3, { Level: 3, Cost: 24000, Value: 150, MaxTerritories: 0 }],
        [4, { Level: 4, Cost: 48000, Value: 200, MaxTerritories: 0 }],
        [5, { Level: 5, Cost: 96000, Value: 250, MaxTerritories: 0 }],
        [6, { Level: 6, Cost: 192000, Value: 300, MaxTerritories: 0 }],
    ]),
    MaxTerritories: 0,
};

const EFFICIENT_EMERALDS: TerritoryBonus = {
    Id: KEY_BONUS_EFFICIENT_EMERALDS,
    Name: "Efficient Emeralds",
    Format: "Emerald Bonus: +{1}%",
    Sprite: "sprites/emerald.png",
    UsedResorce: ResourceType.ORE,
    Description: [
        'Increases the amount of emeralds',
        'this territory will produce'
    ],
    Levels: new Map<number, BonusLevel>([
        [0, { Level: 0, Cost: 0, Value: 0, MaxTerritories: 0 }],
        [1, { Level: 1, Cost: 2000, Value: 35, MaxTerritories: 0 }],
        [2, { Level: 2, Cost: 8000, Value: 100, MaxTerritories: 0 }],
        [3, { Level: 3, Cost: 32000, Value: 300, MaxTerritories: 0 }],
    ]),
    MaxTerritories: 0,
};

const RESOURCE_RATE: TerritoryBonus = {
    Id: KEY_BONUS_RESOURCE_RATE,
    Name: "Resource Rate",
    Format: "Gather Rate: {1}s",
    Sprite: "sprites/282_0.webp",
    UsedResorce: ResourceType.EMERALD,
    Description: [
        'Decreases the time needed to produce', 
        'resources on this territory'
    ],
    Levels: new Map<number, BonusLevel>([
        [0, { Level: 0, Cost: 0, Value: 4, MaxTerritories: 0 }],
        [1, { Level: 1, Cost: 6000, Value: 3, MaxTerritories: 0 }],
        [2, { Level: 2, Cost: 18000, Value: 2, MaxTerritories: 0 }],
        [3, { Level: 3, Cost: 32000, Value: 1, MaxTerritories: 0 }],
    ]),
    MaxTerritories: 0,
};

const EMERALD_RATE: TerritoryBonus = {
    Id: KEY_BONUS_EMERALD_RATE,
    Name: "Emerald Rate",
    Format: "Gather Rate: {1}s",
    Sprite: "sprites/liquid_emerald.webp",
    UsedResorce: ResourceType.CROP,
    Description: [
        'Decreases the time needed to produce', 
        'emeralds on this territory'
    ],
    Levels: new Map<number, BonusLevel>([
        [0, { Level: 0, Cost: 0, Value: 4, MaxTerritories: 0 }],
        [1, { Level: 1, Cost: 2000, Value: 3, MaxTerritories: 0 }],
        [2, { Level: 2, Cost: 8000, Value: 2, MaxTerritories: 0 }],
        [3, { Level: 3, Cost: 32000, Value: 1, MaxTerritories: 0 }],
    ]),
    MaxTerritories: 0,
};


export const BONUSES_MAP: Map<string, TerritoryBonus> = new Map<string, TerritoryBonus>([
    [KEY_BONUS_STRONGER_MINIONS, STRONGER_MINIONS],
    [KEY_BONUS_MULTIHIT, MULTI_HIT],
    [KEY_BONUS_TOWER_AURA, TOWER_AURA],
    [KEY_BONUS_TOWER_VOLLEY, TOWER_VOLLEY],
    [KEY_BONUS_GATHER_XP, GATHERING_XP],
    [KEY_BONUS_MOB_XP, MOB_XP],
    [KEY_BONUS_MOB_DAMAGE, MOB_DAMAGE],
    [KEY_BONUS_PVP_DAMAGE, PVP_DAMAGE],
    [KEY_BONUS_XP_SEEKING, XP_SEEKING],
    [KEY_BONUS_TOME_SEEKING, TOME_SEEKING],
    [KEY_BONUS_EMERALD_SEEKING, EMERALD_SEEKING],
    [KEY_BONUS_LARGE_RESOURCE_STORAGE, LARGER_RESOURCE_STORAGE],
    [KEY_BONUS_LARGE_EMERALD_STORAGE, LARGER_EMERALD_STORAGE],
    [KEY_BONUS_EFFICIENT_RESOURCES, EFFICIENT_RESOURCES],
    [KEY_BONUS_EFFICIENT_EMERALDS, EFFICIENT_EMERALDS],
    [KEY_BONUS_RESOURCE_RATE, RESOURCE_RATE],
    [KEY_BONUS_EMERALD_RATE, EMERALD_RATE]
]);

export {
    EFFICIENT_EMERALDS,
    EFFICIENT_RESOURCES,
    EMERALD_RATE,
    EMERALD_SEEKING,
    GATHERING_XP,
    LARGER_EMERALD_STORAGE,
    LARGER_RESOURCE_STORAGE,
    MOB_DAMAGE,MOB_XP,
    MULTI_HIT,
    PVP_DAMAGE,
    RESOURCE_RATE,
    STRONGER_MINIONS,
    TOME_SEEKING,
    TOWER_AURA,
    TOWER_VOLLEY,
    XP_SEEKING
}

