export default interface Ingredient {
    name: string;
    skills: string[];
    tier: number;
    level: number;
    sprite: string;
    requirements: Requirements;
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
  durationModifier: number;
  durabilityModifier: number;
  chargesModifier: number;
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
  id: string,
  minimum: number;
  maximum: number;
}