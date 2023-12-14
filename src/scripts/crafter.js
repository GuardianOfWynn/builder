const isWeapon = (craftType) => ["Spear", "Relik", "Wand", "Bow", "Dagger"].includes(craftType);
const isArmour = (craftType) => ["Helmet", "Chestplate", "Leggings", "Boots"].includes(craftType);
const isAccessory = (craftType) => ["Ring", "Bracelet", "Necklace"].includes(craftType);
const isConsumable = (craftType) => ["Potion", "Food", "Scroll"].includes(craftType);

const touching = (x1, x2, y1, y2) => x1 === x2 || (y1 === y2 && (x1 === (x2 - 1) || x1 === (x2 + 1)));
const under = (x1, x2, y1, y2) => y1 === y2 && x1 < x2;
const above = (x1, x2, y1, y2) => y1 === y2 && x1 > x2;
const left = (x1, x2, y1, y2) => x1 === x2 && y2 < y1;
const right = (x1, x2, y1, y2) => x1 === x2 && y2 > y1;

export function getEffectiveness(ingredients) {
    let effectiveness = [[100,100], [100,100], [100,100]];
    for (let x1 = 0; x1 < 3; x1++) {
        for (let y1 = 0; y1 < 2; y1++) {

          let currentElement = ingredients[x1][y1];

          if (currentElement === undefined || currentElement === null || currentElement.ingredientPositionModifiers === undefined) {
            continue;
          }

          for (let x2 = 0; x2 < 3; x2++) {
            for (let y2 = 0; y2 < 2; y2++) {
              if (x1 == x2 && y1 == y2) continue;
              if (!touching(x1, x2, y1, y2)) {
                effectiveness[x2][y2] += currentElement.ingredientPositionModifiers.notTouching;
              }
              if (touching(x1, x2, y1, y2)) {
                effectiveness[x2][y2] += currentElement.ingredientPositionModifiers.touching;
              }
              if (under(x1, x2, y1, y2)) {
                effectiveness[x2][y2] += currentElement.ingredientPositionModifiers.under;
              }
              if (above(x1, x2, y1, y2)) {
                effectiveness[x2][y2] += currentElement.ingredientPositionModifiers.above;
              }
              if (left(x1, x2, y1, y2)) {
                effectiveness[x2][y2] += currentElement.ingredientPositionModifiers.left;
              }
              if (right(x1, x2, y1, y2)) {
                effectiveness[x2][y2] += currentElement.ingredientPositionModifiers.right;
              }
            }
          }

        }
    }
    return effectiveness;
}

export function getBaseDurationOrDurability(craftType, materials, levelRange) {
    let index = getLevelRangeIndex(materials, levelRange);
    return (!isConsumable(craftType) 
        ? materials.possibleBaseDurabilityBounds[index]
        : materials.possibleBaseDurationBounds[index])
}

export function getBaseDamage(craftType, materials, levelRange, attackSpeed) {
    let index = getLevelRangeIndex(materials, levelRange);
    return (isWeapon(craftType) ?
        (attackSpeed === "Fast" ? materials.possibleBaseFastDamageBounds[index] :
          (attackSpeed === "Normal" ? materialspossibleBaseNormalDamageBounds[index]
            : materials.possibleBaseSlowDamageBounds[index])) 
        : [[0,0],[0,0]]);
}

export function getBaseCharges(craftType, materials) {
    return isConsumable(craftType) ? materials.charges : 0;
}

export function getBaseHealth(craftType, materials, levelRange, noIngredients) {
    let index = getLevelRangeIndex(materials, levelRange);
    return (isConsumable(craftType)
        ? (noIngredients ? materials.possibleBaseHPRBounds[index] : [0,0]) 
        : (isArmour(craftType) ? materials.possibleBaseHPBounds[index] : [0,0]))
}

export function getLevelRangeIndex(materials, levelRange) {
    return materials.possibleBounds.indexOf(levelRange);
}