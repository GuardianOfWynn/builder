import { RangeableIdentification } from "./identification";

export default class Ingredient {
    name: string;
    id: string;
    skills: string[];
    tier: number;
    level: number; 
    sprite: string;
    isPowder: boolean;
    powderTier: number;
    requirements: Requirements;
    modifiers: Modifiers;
    effectivenessModifiers: EffectivenessModifiers;
    identifications: RangeableIdentification[];
}

export class Requirements {
    dexterity: number;
    defence: number;
    strength: number;
    intelligence: number;
    agility: number;
}

export class Modifiers {
  duration: number;
  durability: number;
  charges: number;
}

export class EffectivenessModifiers {
  under: number;
  above: number;
  touching: number;
  notTouching: number;
  left: number;
  right: number;
}
