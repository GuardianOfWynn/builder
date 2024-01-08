export class Identification {
    static readonly identifications = new Map<String, Identification>();

    static readonly THIRD_SPELL_COST_RAW = new Identification("raw3rdSpellCost", "Third Spell Cost", true);
    static readonly MAIN_ATTACK_DAMAGE = new Identification("mainAttackDamage", "Main Attack Damage", false);
    static readonly SPELL_DAMAGE = new Identification("spellDamage", "Spell Damage", false);
    static readonly THUNDER_DEFENCE = new Identification("thunderDefence", "Thunder Defence", false);
    static readonly WALK_SPEED = new Identification("walkSpeed", "Walk Speed", false);
    static readonly SPELL_DAMAGE_RAW = new Identification("rawSpellDamage", "Spell Damage", true)
    static readonly MANA_REGEN = new Identification("manaRegen", "Mana Regen", true);
    static readonly HEALTH_RAW = new Identification("rawHealth", "Health", true);
    static readonly MAIN_ATTACK_DAMAGE_RAW = new Identification("rawMainAttackDamage", "Main Attack Damage", true);
    static readonly LIFE_STEAL = new Identification("lifeSteal", "Life Steal", true);
    static readonly FIRE_DAMAGE = new Identification("fireDamage", "Fire Damage", false);
    static readonly WATER_DEFENCE = new Identification("waterDefence", "Water Defence", false);
    static readonly REFLECTION = new Identification("reflection", "Reflection", false);
    static readonly XP_BONUS = new Identification("xpBonus", "XP Bonus", false);
    static readonly LOOT_BONUS = new Identification("lootBonus", "Loot Bonus", false);
    static readonly SECOND_SPELL_COST = new Identification("2ndSpellCost", "Second Spell Cost", false);
    static readonly AIR_DAMAGE = new Identification("airDamage", "Air Damage", false);
    static readonly FIRE_DEFENCE = new Identification("fireDefence", "Fire Defence", false);
    static readonly THORNS = new Identification("thorns", "Thorns", false);
    static readonly STEALING = new Identification("stealing", "Stealing", false);
    static readonly EARTH_DAMAGE = new Identification("earthDamage", "Earth Damage", false);
    static readonly WATER_DAMAGE = new Identification("waterDamage", "Water Damage", false);
    static readonly POISON = new Identification("poison", "Poison", true);
    static readonly THUNDER_DAMAGE = new Identification("thunderDamage", "Thunder Damage", false);
    static readonly HEALTH_REGEN_RAW = new Identification("healthRegenRaw", "Health Regen", true);
    static readonly AIR_DEFENCE = new Identification("airDefence", "Air Defence", false);
    static readonly FIRST_SPELL_COST_RAW = new Identification("raw1stSpellCost", "First Spell Cost", true);
    static readonly HEALTH_REGEN = new Identification("healthRegen", "Health Regen", false);
    static readonly EARTH_DEFENCE = new Identification("earthDefence", "Earth Defence", false);
    static readonly SPRINT_REGEN = new Identification("sprintRegen", "Sprint Regen", false);
    static readonly EXPLODING = new Identification("exploding", "Exploding", false);
    static readonly MANA_STEAL = new Identification("manaSteal", "Mana Steal", true);
    static readonly SOUL_POINT_REGEN = new Identification("soulPointRegen", "Soul Point Regen", false);
    static readonly THIRD_SPELL_COST = new Identification("3rdSpellCost", "Third Spell Cost", false);
    static readonly FIRST_SPELL_COST = new Identification("1stSpellCost", "First Spell Cost", false);
    static readonly ATTACK_SPEED_RAW = new Identification("rawAttackSpeed", "Attack Speed", true);
    static readonly AIR_SPELL_DAMAGE = new Identification("airSpellDamage", "Air Spell Damage", false);
    static readonly HEALING_EFFICIENCY = new Identification("healingEfficiency", "Healing Efficiency", false);
    static readonly FOURTH_SPELL_COST_RAW = new Identification("raw4thSpellCost", "Fourth Spell Cost", true);
    static readonly SPRINT = new Identification("sprint", "Sprint", false);
    static readonly JUMP_HEIGHT = new Identification("jumpHeight", "Jump Height", true);
    static readonly SECOND_SPELL_COST_RAW = new Identification("raw2ndSpellCost", "Second Spell Cost", true);
    static readonly FOURTH_SPELL_COST = new Identification("4thSpellCost", "Fourth Spell Cost", false);
    static readonly EARTH_SPELL_DAMAGE = new Identification("earthSpellDamage", "Earth Spell Damage", false);
    static readonly EARTH_SPELL_DAMAGE_RAW = new Identification("rawEarthSpellDamage", "Earth Spell Damage", true);
    static readonly FIRE_MAIN_ATTACK_DAMAGE_RAW = new Identification("rawFireMainAttackDamage", "Fire Main Attack Damage", true);
    static readonly ELEMENTAL_DEFENCE = new Identification("elementalDefence", "Elemental Defence", false);
    static readonly AIR_MAIN_ATTACK_DAMAGE = new Identification("airMainAttackDamage", "Air Main Attack Damage", false);
    static readonly ELEMENTAL_MAIN_ATTACK_DAMAGE_RAW = new Identification("rawElementalMainAttackDamage", "Elemental Main Attack Damage", true);
    static readonly THUNDER_SPELL_DAMAGE_RAW = new Identification("rawThunderSpellDamage", "Thunder Spell Damage", true);
    static readonly ELEMENTAL_SPELL_DAMAGE_RAW = new Identification("rawElementalSpellDamage", "Elemental Spell Damage", true);
    static readonly THUNDER_SPELL_DAMAGE = new Identification("thunderSpellDamage", "Thunder Spell Damage", false);
    static readonly THUNDER_MAIN_ATTACK_DAMAGE = new Identification("thunderMainAttackDamage", "Thunder Main Attack Damage", false);
    static readonly THUNDER_MAIN_ATTACK_DAMAGE_RAW = new Identification("rawThunderMainAttackDamage", "Thunder Main Attack Damage", true);
    static readonly FIRE_SPELL_DAMAGE = new Identification("fireSpellDamage", "Fire Spell Damage", false);;
    static readonly KNOCKBACK = new Identification("knockback", "Knockback", false);
    static readonly WEAKEN_ENEMY = new Identification("weakenEnemy", "Weaken Enemy", false);
    static readonly THUNDER_DAMAGE_RAW = new Identification("rawThunderDamage", "Thunder Damage", true);
    static readonly WATER_DAMAGE_RAW = new Identification("rawWaterDamage", "Water Damage", true);
    static readonly AIR_SPELL_DAMAGE_RAW = new Identification("rawAirSpellDamage", "Air Spell Damage", true);
    static readonly ELEMENTAL_SPELL_DAMAGE = new Identification("elementalSpellDamage", "Elemental Spell Damage", false);
    static readonly NEUTRAL_SPELL_DAMAGE_RAW = new Identification("rawNeutralSpellDamage", "Neutral Spell Damage", true);
    static readonly AIR_MAIN_ATTACK_DAMAGE_RAW = new Identification("rawAirMainAttackDamage", "Air Main Attack Damage", true);
    static readonly EARTH_MAIN_ATTACK_DAMAGE = new Identification("earthMainAttackDamage", "Earth Main Attack Damage", false);
    static readonly SLOW_ENEMY = new Identification("slowEnemy", "Slow Enemy", false);
    static readonly WATER_SPELL_DAMAGE = new Identification("waterSpellDamage", "Water Spell Damage", false);
    static readonly WATER_SPELL_DAMAGE_RAW = new Identification("rawWaterSpellDamage", "Water Spell Damage", true);
    static readonly ELEMENTAL_DAMAGE = new Identification("elementalDamage", "Elemental Damage", false);
    static readonly ELEMENTAL_DAMAGE_RAW = new Identification("rawElementalDamage", "Elemental Damage", true);
    static readonly INTELLIGENCE_POINTS = new Identification("rawIntelligence", "Intelligence", true);
    static readonly DEXTERITY_POINTS = new Identification("rawDexterity", "Dexterity", true);
    static readonly AGILITY_POINTS = new Identification("rawAgility", "Agility", true);
    static readonly STRENGTH_POINTS = new Identification("rawStrength", "Strength", true);
    static readonly DEFENCE_POINTS = new Identification("rawDefence", "Defence", true);
    static readonly EARTH_DAMAGE_RAW = new Identification("rawEarthDamage", "Earth Damage", true);
    static readonly LEVELED_LOOT_BONUS = new Identification("leveledLootBonus", "Loot Bonus", false);
    static readonly DAMAGE_FROM_MOBS = new Identification("damageFromMobs", "Damage from mobs", false);
    static readonly LEVELED_XP_BONUS = new Identification("leveledXpBonus", "XP Bonus", false);
    static readonly AIR_DAMAGE_RAW = new Identification("rawAirDamage", "Air Damage", true);
    static readonly LOOT_QUALITY = new Identification("lootQuality", "Loot Quality", false);
    static readonly NEUTRAL_DAMAGE_RAW = new Identification("rawNeutralDamage", "Neutral Damage", true);
    static readonly FIRE_DAMAGE_RAW = new Identification("rawFireDamage", "Fire Damage", true);
    static readonly GATHER_XP_BONUS = new Identification("gatherXpBonus", "Gather XP Bonus", false);
    static readonly GATHER_SPEED = new Identification("gatherSpeed", "Gather Speed", false);
    static readonly FIRE_SPELL_DAMAGE_RAW = new Identification("rawFireSpellDamage", "Fire Spell Damage", true);
    static readonly ELEMENTAL_DEFENSE = new Identification("elementalDefense", "Bonus Elemental Defense", false);
    static readonly WATER_MAIN_ATTACK_DAMAGE_RAW = new Identification("rawWaterMainAttackDamage", "Water Main Attack Damage", true);

    private raw: boolean;
    private translatedName: String;
    private id: String;

    private constructor(id: string, translated: string, raw: boolean) {
        this.id = id;
        this.translatedName = translated;
        this.raw = raw;
        Identification.identifications.set(id, this);
    }

    getId() {
        return this.id;
    }

    getTranslatedName() {
        return this.translatedName;
    }

    isRaw() {
        return this.raw;
    }
}

export class RangeableIdentification {
    id: string;
    raw?: number;
    minimum: number;
    maximum: number;
}

export class FixedIdentification {
    identification: Identification
    value: number;
}