import { ResourceType } from "./resource";

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
}

const STRONGER_MINIONS: TerritoryBonus = {
    Id: "stronger_minions",
    Name: "Stronger Minions",
    Format: "%",
    Sprite: "sprites/skull.png",
    UsedResorce: ResourceType.WOOD,
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
    Id: "multihit",
    Name: "Tower Multi-Attacks",
    Format: "Targets",
    Sprite: "sprites/arrow.png",
    UsedResorce: ResourceType.FISH,
    Levels: new Map<number, BonusLevel>([
        [0, { Level: 0, Cost: 0, Value: 1, MaxTerritories: 5 }],
        [1, { Level: 1, Cost: 4800, Value: 2, MaxTerritories: 5 }],
    ]),
    MaxTerritories: 5,
};

const TOWER_AURA: TerritoryBonus = {
    Id: "tower_aura",
    Name: "Tower Aura",
    Format: "s",
    Sprite: "sprites/368_0.webp",
    UsedResorce: ResourceType.CROP,
    Levels: new Map<number, BonusLevel>([
        [0, { Level: 0, Cost: 0, Value: 0, MaxTerritories: 0 }],
        [1, { Level: 1, Cost: 800, Value: 24, MaxTerritories: 0 }],
        [2, { Level: 2, Cost: 1600, Value: 18, MaxTerritories: 0 }],
        [3, { Level: 3, Cost: 3200, Value: 12, MaxTerritories: 0 }],
    ]),
    MaxTerritories: 0,
};

const TOWER_VOLLEY: TerritoryBonus = {
    Id: "tower_volley",
    Name: "Tower Volley",
    Format: "s",
    Sprite: "sprites/385_0.webp",
    UsedResorce: ResourceType.ORE,
    Levels: new Map<number, BonusLevel>([
        [0, { Level: 0, Cost: 0, Value: 0, MaxTerritories: 0 }],
        [1, { Level: 1, Cost: 200, Value: 20, MaxTerritories: 0 }],
        [2, { Level: 2, Cost: 400, Value: 15, MaxTerritories: 0 }],
        [3, { Level: 3, Cost: 800, Value: 10, MaxTerritories: 0 }],
    ]),
    MaxTerritories: 0,
};

const GATHERING_XP: TerritoryBonus = {
    Id: "gather_xp",
    Name: "Gathering Experience",
    Format: "%",
    Sprite: "sprites/carrot.png",
    UsedResorce: ResourceType.WOOD,
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
    Id: "mob_xp",
    Name: "Mob Experience",
    Format: "%",
    Sprite: "sprites/175_0.webp",
    MaxTerritories: 5,
    UsedResorce: ResourceType.FISH,
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
    Id: "mob_damage",
    Name: "Mob Damage",
    Format: "%",
    Sprite: "",
    UsedResorce: ResourceType.CROP,
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
    Id: "pvp_damage",
    Name: "PvP Damage",
    Format: "%",
    Sprite: "",
    UsedResorce: ResourceType.ORE,
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
    Id: "xp_seeking",
    Name: "XP Seeking",
    Format: "/h",
    Sprite: "sprites/348_0.webp",
    UsedResorce: ResourceType.EMERALD,
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
    MaxTerritories: 0,
};

const TOME_SEEKING: TerritoryBonus = {
    Id: "tome_seeking",
    Name: "Tome Seeking",
    Format: "%/h",
    Sprite: "sprites/tome.png",
    UsedResorce: ResourceType.FISH,
    Levels: new Map<number, BonusLevel>([
        [0, { Level: 0, Cost: 0, Value: 0, MaxTerritories: 0 }],
        [1, { Level: 1, Cost: 800, Value: 0.15, MaxTerritories: 0 }],
        [2, { Level: 2, Cost: 4800, Value: 1.2, MaxTerritories: 0 }],
        [3, { Level: 3, Cost: 12800, Value: 2.4, MaxTerritories: 0 }],
    ]),
    MaxTerritories: 0,
};

const EMERALD_SEEKING: TerritoryBonus = {
    Id: "emerald_seeking",
    Name: "Emerald Seeking",
    Format: "%/h",
    Sprite: "sprites/129_0.webp",
    UsedResorce: ResourceType.WOOD,
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
    Id: "larger_resource_storage",
    Name: "Larger Resource Storage",
    Format: "%",
    Sprite: "sprites/bread.png",
    UsedResorce: ResourceType.EMERALD,
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
    Id: "larger_emerald_storage",
    Name: "Larger Emerald Storage",
    Format: "%",
    Sprite: "sprites/emerald_block.png",
    UsedResorce: ResourceType.WOOD,
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
    Id: "efficient_resource",
    Name: "Efficient Resources",
    Format: "%",
    Sprite: "sprites/golden_pickaxe.png",
    UsedResorce: ResourceType.EMERALD,
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
    Id: "efficient_emerald",
    Name: "Efficient Emeralds",
    Format: "%",
    Sprite: "sprites/emerald.png",
    UsedResorce: ResourceType.ORE,
    Levels: new Map<number, BonusLevel>([
        [0, { Level: 0, Cost: 0, Value: 0, MaxTerritories: 0 }],
        [1, { Level: 1, Cost: 2000, Value: 35, MaxTerritories: 0 }],
        [2, { Level: 2, Cost: 8000, Value: 100, MaxTerritories: 0 }],
        [3, { Level: 3, Cost: 32000, Value: 300, MaxTerritories: 0 }],
    ]),
    MaxTerritories: 0,
};

const RESOURCE_RATE: TerritoryBonus = {
    Id: "resource_rate",
    Name: "Resource Rate",
    Format: "s",
    Sprite: "sprites/282_0.webp",
    UsedResorce: ResourceType.EMERALD,
    Levels: new Map<number, BonusLevel>([
        [0, { Level: 0, Cost: 0, Value: 4, MaxTerritories: 0 }],
        [1, { Level: 1, Cost: 6000, Value: 3, MaxTerritories: 0 }],
        [2, { Level: 2, Cost: 18000, Value: 2, MaxTerritories: 0 }],
        [3, { Level: 3, Cost: 32000, Value: 1, MaxTerritories: 0 }],
    ]),
    MaxTerritories: 0,
};

const EMERALD_RATE: TerritoryBonus = {
    Id: "emerald_rate",
    Name: "Emerald Rate",
    Format: "s",
    Sprite: "sprites/liquid_emerald.webp",
    UsedResorce: ResourceType.CROP,
    Levels: new Map<number, BonusLevel>([
        [0, { Level: 0, Cost: 0, Value: 4, MaxTerritories: 0 }],
        [1, { Level: 1, Cost: 2000, Value: 3, MaxTerritories: 0 }],
        [2, { Level: 2, Cost: 8000, Value: 2, MaxTerritories: 0 }],
        [3, { Level: 3, Cost: 32000, Value: 1, MaxTerritories: 0 }],
    ]),
    MaxTerritories: 0,
};

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

