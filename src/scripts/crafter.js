const isWeapon = (craftType) => ["Spear", "Relik", "Wand", "Bow", "Dagger"].includes(craftType);
const isArmour = (craftType) => ["Helmet", "Chestplate", "Leggings", "Boots"].includes(craftType);
const isAccessory = (craftType) => ["Ring", "Bracelet", "Necklace"].includes(craftType);
const isConsumable = (craftType) => ["Potion", "Food", "Scroll"].includes(craftType);

function assemble() {

}

function getBaseDurationOrDurability(craftType, materials, levelRange) {
    let index = getLevelRangeIndex(materials, levelRange);
    return (!isConsumable(craftType) 
        ? materials.possibleBaseDurabilityBounds[index]
        : materials.possibleBaseDurationBounds[index])
        .map(x => x*materialTierMultiplier);
}

function getBaseCharges(craftType, materials) {
    return isConsumable(craftType) ? materials.charges : 0;
}

function getBaseHealth(craftType, materials, levelRange, noIngredients) {
    (isConsumable(craftType)
        ? (noIngredients
          ? selectedCraftType.value.possibleBaseHPRBounds[index] 
          : [0,0]) 
        : (!isWeapon 
          ? selectedCraftType.value.possibleBaseHPBounds[index] 
          : [0,0]))
}

function getLevelRangeIndex(materials, levelRange) {
    return materials.possibleBounds.indexOf(levelRange);
}