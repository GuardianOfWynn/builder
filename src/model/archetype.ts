import { WynnClass } from "../scripts/util";

export enum Archetype {
    ACOLYTE = "bloodmagik",
    SUMMONER = "summoner",
    RITUALIST = "ritualist",
    RIFTWALKER = "blitz",
    LIGHT_BENDER = "priest",
    ARCANIST = "arcane",
    BATTLE_MONK = "monk",
    FALLEN = "berserker",
    PALADIN = "tank",
    TRAPPER = "trapper",
    SHARPSHOOTER = "sniper",
    BOLTSLINGER = "boltslinger",
    SHADESTEPPER = "shadestepper",
    TRICKSTER = "trickster",
    ACROBAT = "acrobat"
}

export const CLASS_ARCHETYPES = new Map<WynnClass, Archetype[]>([
    [WynnClass.ARCHER, [Archetype.BOLTSLINGER, Archetype.TRAPPER, Archetype.SHARPSHOOTER]],
    [WynnClass.ASSASSIN, [Archetype.TRICKSTER, Archetype.SHADESTEPPER, Archetype.ACROBAT]],
    [WynnClass.MAGE, [Archetype.RIFTWALKER, Archetype.ARCANIST, Archetype.LIGHT_BENDER]],
    [WynnClass.SHAMAN, [Archetype.SUMMONER, Archetype.ACOLYTE, Archetype.RITUALIST]],
    [WynnClass.WARRIOR, [Archetype.PALADIN, Archetype.BATTLE_MONK, Archetype.FALLEN]],
]);

export const ARCHETYPE_DATA = new Map<Archetype, ArchetypeData>([
    [Archetype.ACOLYTE, {
        color: 'mc-red',
        id: 'bloodmagik',
        name: 'Acolyte'
    }],
    [Archetype.SUMMONER, {
        color: 'mc-green',
        id: 'summoner',
        name: 'Summoner'
    }],
    [Archetype.RITUALIST, {
        color: 'mc-aqua',
        id: 'ritualist',
        name: 'Ritualist'
    }],
    [Archetype.SHADESTEPPER, {
        color: 'mc-red',
        id: 'shadestepper',
        name: 'Shadestepper'
    }],
    [Archetype.ACROBAT, {
        color: 'mc-white',
        id: 'acrobat',
        name: 'Acrobat'
    }],
    [Archetype.TRICKSTER, {
        color: 'mc-light-purple',
        id: 'trickster',
        name: 'Trickster'
    }],
    [Archetype.PALADIN, {
        color: 'mc-aqua',
        id: 'tank',
        name: 'Paladin'
    }],
    [Archetype.BATTLE_MONK, {
        color: 'mc-yellow',
        id: 'monk',
        name: 'Battle Monk'
    }],
    [Archetype.FALLEN, {
        color: 'mc-red',
        id: 'berserker',
        name: 'Fallen'
    }],
    [Archetype.BOLTSLINGER, {
        color: 'mc-yellow',
        id: 'boltslinger',
        name: 'Boltslinger'
    }],
    [Archetype.TRAPPER, {
        color: 'mc-green',
        id: 'trapper',
        name: 'Trapper'
    }],
    [Archetype.SHARPSHOOTER, {
        color: 'mc-light-purple',
        id: 'sniper',
        name: 'Sharpshooter'
    }],
    [Archetype.RIFTWALKER, {
        color: 'mc-aqua',
        id: 'blitz',
        name: 'Riftwalker'
    }],
    [Archetype.LIGHT_BENDER, {
        color: 'mc-white',
        id: 'priest',
        name: 'Light Bender'
    }],
    [Archetype.ARCANIST, {
        color: 'mc-dark-purple',
        id: 'arcane',
        name: 'Arcanist'
    }],
])

export class ArchetypeData {
    id: string;
    name: string;
    color: string;
}