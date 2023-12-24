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
    identifications: Identification[];
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

export class Identification {
  id: string;
  name: string;
  minimum: number;
  maximum: number;
}