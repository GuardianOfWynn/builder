export default interface Ingredient {
    name: string; //ok
    skills: string[]; //ok
    tier: number; //ok
    level: number; //ok
    sprite: string;
    requirements: Requirements; //ok
    modifiers: Modifiers;
    effectivenessModifiers: EffectivenessModifiers;
    identifications: Identification[];
}

export interface Requirements {
    dexterity: number;
    defence: number;
    strength: number;
    intelligence: number;
    agility: number;
}

export interface Modifiers {
  duration: number;
  durability: number;
  charges: number;
}

export interface EffectivenessModifiers {
  under: number;
  above: number;
  touching: number;
  notTouching: number;
  left: number;
  right: number;
}

export interface Identification {
  id: string;
  name: string;
  minimum: number;
  maximum: number;
}