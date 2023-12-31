import { CraftedAttackSpeed, NumberRange } from "./util";

export interface DamageBounds {
    low: NumberRange;
    high: NumberRange;
}

export function calculateMaterialMultiplier(material1Quantity: number, material2Quantity: number, material1Tier: number, material2Tier: number): number {
    let tierToMult = [0,1,1.25,1.4];
    return (tierToMult[material1Tier]*material1Quantity + tierToMult[material2Tier]*material2Quantity) / (material1Quantity + material2Quantity);
}

export function calculateDamage(baseLower: number, baseUpper: number, matMultipler: number, attackSpeed: CraftedAttackSpeed): DamageBounds  {

    // thanks hppeng!
    // https://github.com/hppeng-wynn/hppeng-wynn.github.io/blob/dev/js/craft.js#L204

    baseLower = Math.floor(baseLower * matMultipler);
    baseUpper = Math.floor(baseUpper * matMultipler);

    let ratio = 2.05;
    switch(attackSpeed) {
        case CraftedAttackSpeed.SLOW:
            ratio = ratio / 1.5;
            break;
        case CraftedAttackSpeed.NORMAL:
            ratio = 1;
            break;
        case CraftedAttackSpeed.FAST:
            ratio = ratio / 2.5;
            break;
        default: break;
    }

    let low = Math.floor(ratio*baseLower);
    let high = Math.floor(ratio*baseUpper);
    
    return {
        low: NumberRange.of(Math.floor(low * 0.9), Math.floor(low * 1.1)),
        high: NumberRange.of(Math.floor(high * 0.9), Math.floor(high * 1.1))
    }

}