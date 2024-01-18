import { BONUSES, BonusLevel, KEY_BONUS_EFFICIENT_EMERALDS, KEY_BONUS_EFFICIENT_RESOURCES, KEY_BONUS_EMERALD_RATE, KEY_BONUS_LARGE_EMERALD_STORAGE, KEY_BONUS_LARGE_RESOURCE_STORAGE, KEY_BONUS_RESOURCE_RATE, LARGER_RESOURCE_STORAGE, TerritoryBonus } from "./bonuses";
import { Claim } from "./claim";
import { Engine, EngineInstance } from "./engine";
import { Pathfinder } from "./pathfinding/pathfinder";
import { ResourceType } from "./resource";
import { v4 as uuidv4 } from 'uuid';
import { TerritoryUpgrade, UPGRADES, UpgradeLevel } from "./upgrades";

export enum RouteStyle {
    CHEAPEST = "cheapest",
    FASTEST = "fastest"
}

export enum BorderStyle {
    CLOSED = "closed",
    OPEN = "open"
}

export enum Treasury {
    VERY_LOW = "very_low",
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    VERY_HIGH = "very_high"
}

export enum TransferDirection {
    HQ_TO_TERRITORY = "hq_to_territory",
    TERRITORY_TO_HQ = "territory_to_hq"
}

export class UpgradeBonusStatus {
    level: number
    activated: boolean
}

export type ResourceStorage = Map<ResourceType, number>

export type ResourceTransference = {
    id: string
    direction: TransferDirection
    storage: ResourceStorage
    target: Territory
}

const BASE_RESOURCE_PRODUCTION = 1;
const BASE_EMERALD_PRODUCTION = 2.5;
const BASE_RESOURCE_STORAGE = 300;
const BASE_EMERALD_STORAGE = 3000;
const BASE_HQ_DAMAGE = 10000;
const BASE_TERRITORY_DAMAGE = 10000;
const HQ_RESOURCE_STORAGE_BOOST = 5;
const HQ_EMERALD_STORAGE_BOOST = 1.666666;


export class Territory {
    HQ: boolean
    name: string
    claim: Claim | null
    treasury: Treasury
    routeStyle: RouteStyle
    borders: BorderStyle
    tax: number
    allyTax: number
    storage: ResourceStorage
    productionMultipliers: Map<ResourceType, number>
    passingResource: ResourceTransference[]
    lastResourceProduced: number
    lastEmeraldProduced: number
    lastConsumedResource: number
    lastResourceTransfer: number
    resourceOverflow: boolean
    resourceGap: boolean
    bonuses: Map<string, UpgradeBonusStatus>
    upgrades: Map<string, UpgradeBonusStatus>
    connections: string[]

    getResourceRate(): number {
        return BONUSES[KEY_BONUS_EMERALD_RATE].Levels[this.bonuses[KEY_BONUS_RESOURCE_RATE]].Value
    }

    getEmeraldRate(): number {
        return BONUSES[KEY_BONUS_EMERALD_RATE].Levels[this.bonuses[KEY_BONUS_EMERALD_RATE]].Value
    }

    getTreasuryBonus(): number {
        let pathfinder = new Pathfinder(this, EngineInstance!.guildMap)
        let treasuryBonus = 0.0
        if (this.claim != null) {
            let distance = pathfinder.getDistance(this.claim.getHQ()!)
            let baseBonus = (1 - Math.max(0, distance - 2) * 0.15)
            switch (this.treasury) {
                case Treasury.VERY_LOW:
                    treasuryBonus = 0
                    break
                case Treasury.LOW:
                    treasuryBonus = baseBonus
                    break
                case Treasury.MEDIUM:
                    treasuryBonus = baseBonus * 2
                    break
                case Treasury.HIGH:
                    treasuryBonus = baseBonus * 2.5
                    break
                case Treasury.VERY_HIGH:
                    treasuryBonus = baseBonus * 3
                    break
            }
        }
        return treasuryBonus
    }

    getProducedEmerald(): number {
        let multiplier = 1
        if (this.bonuses[KEY_BONUS_EFFICIENT_EMERALDS].activated) {
            multiplier += BONUSES[KEY_BONUS_EFFICIENT_EMERALDS].Levels[this.bonuses[KEY_BONUS_EFFICIENT_EMERALDS]].Value / 100
        }
        return multiplier * BASE_EMERALD_PRODUCTION * (1 + this.getTreasuryBonus())
    }

    getProducedResource(): number {
        let multiplier = 1;
        if (this.bonuses[KEY_BONUS_EFFICIENT_RESOURCES].activated) {
            multiplier += BONUSES[KEY_BONUS_EFFICIENT_RESOURCES].Levels[this.bonuses[KEY_BONUS_EFFICIENT_RESOURCES]].Value / 100
        }
        return multiplier * BASE_RESOURCE_PRODUCTION * (1 + this.getTreasuryBonus())
    }

    getEmeraldStorageSize(): number {
        let multiplier = 1;
        if (this.bonuses[KEY_BONUS_LARGE_EMERALD_STORAGE].activated) {
            multiplier += BONUSES[KEY_BONUS_LARGE_EMERALD_STORAGE].Levels[this.bonuses[KEY_BONUS_LARGE_EMERALD_STORAGE]].Value / 100
        }
        if (this.HQ) {
            return Math.ceil(multiplier * BASE_EMERALD_STORAGE * HQ_EMERALD_STORAGE_BOOST)
        }
        return multiplier * BASE_EMERALD_STORAGE
    }

    getResourceStorageSize(): number {
        let multiplier = 1;
        if (this.bonuses[KEY_BONUS_LARGE_RESOURCE_STORAGE].activated) {
            multiplier += BONUSES[KEY_BONUS_LARGE_RESOURCE_STORAGE].Levels[this.bonuses[KEY_BONUS_LARGE_RESOURCE_STORAGE]].Value / 100
        }
        if (this.HQ) {
            return Math.ceil(multiplier * BASE_RESOURCE_STORAGE * HQ_RESOURCE_STORAGE_BOOST)
        }
        return multiplier * BASE_RESOURCE_STORAGE
    }

    findExternals(): Territory[] {
        // OPTIMIZE THIS SHIT
        let pathfinder = new Pathfinder(this, EngineInstance!.guildMap);
        let externals: Territory[] = [];
        EngineInstance?.guildMap.territories.forEach(x => {
            if (pathfinder.getDistance(x) <= 3) {
                externals.push(x)
            }
        })
        return externals
    }

    // GetResourceCost: Retrieves the resource costs per second for territory
    getResourceCostsMinute(): ResourceStorage {
        let costs = new Map<ResourceType, number>([
            [ResourceType.CROP, 0],
            [ResourceType.ORE, 0],
            [ResourceType.WOOD, 0],
            [ResourceType.FISH, 0],
            [ResourceType.EMERALD, 0]
        ]);
        this.bonuses.entries.apply((x, y) => {
            let bonus: TerritoryBonus = BONUSES[x]
            let level: BonusLevel = bonus.Levels[y]
            costs[bonus.UsedResorce] = costs[bonus.UsedResorce] + level.Cost / 60;
        })
        return costs
    }

    transferResource(transf: ResourceTransference) {
        let target = transf.target;
        if (transf.direction == TransferDirection.TERRITORY_TO_HQ) {
            if (this.claim != null) {
                // If territory is member of a claim, reroute it to HQ
                target = this.claim.getHQ()!;
                transf.target = target;
            }
        }

        for (let conn in this.connections) {
            if (conn == target.name) {
                target.receiveResource(transf);
                return;
            }
        }

        if (this.name == target.name) {
            this.receiveResource(transf);
            return;
        }

        let pathfinder = new Pathfinder(this, EngineInstance!.guildMap);
        let route = pathfinder.route(target!, this.routeStyle)
        if (route.length > 0) {
            route[0].receiveResource(transf)
        }
    }

    receiveResource(transference: ResourceTransference) {
        if (this.name == transference.target.name) {
            this.storeResource(transference.storage);
        } else {
            this.passingResource.push(transference);
        }
    }

    storeResource(resources: ResourceStorage) {
        let storageSize = 0;
        for (let [resType, qty] of resources) {
            if (resType == ResourceType.EMERALD) {
                storageSize = this.getEmeraldStorageSize();
            } else {
                storageSize = this.getResourceStorageSize();
            }
            let stored = this.storage[resType];
            if (stored + qty > storageSize) {
                this.storage[resType] = storageSize;
                this.resourceOverflow = true;
            } else {
                this.resourceOverflow = false;
                this.storage[resType] = stored + qty;
            }
        }
    }

    consumeResources() {
        let consume = function (cost: number, usedResource: ResourceType): boolean {
            let costPerSecond = cost / 3600;
            if (this.storage[usedResource] >= costPerSecond) {
                this.storage[usedResource] = this.storage[usedResource] - cost;
                return true;
            }
            return false;
        }

        for (let [upgrade, status] of this.upgrades) {
            let upg: TerritoryUpgrade = UPGRADES[upgrade]
            let lvl: UpgradeLevel = upg.Levels[status.level];
            if (consume(lvl.Cost, upg.UsedResource)) {
                status.activated = false;
            } else {
                status.activated = true;
            }
        }

        for (let [bonus, status] of this.bonuses) {
            let b: TerritoryBonus = BONUSES[bonus]
            let lvl: BonusLevel = b.Levels[status.level];
            if (consume(lvl.Cost, b.UsedResorce)) {
                status.activated = false;
            } else {
                status.activated = true;
            }
        }

    }

    tick() {
        let currentTimeMillis = new Date().getTime()
        if (this.claim !== null) {
            // Produce emerald
            if (currentTimeMillis - this.lastEmeraldProduced >= this.getEmeraldRate() * 1000) {
                this.lastEmeraldProduced = currentTimeMillis;
                this.storage[ResourceType.EMERALD] = this.storage[ResourceType.EMERALD] + this.getProducedEmerald() * this.productionMultipliers[ResourceType.EMERALD];
            }

            // Produce resource
            if (currentTimeMillis - this.lastResourceProduced >= this.getResourceRate() * 1000) {
                this.lastResourceProduced = currentTimeMillis;
                for (let [resType, multiplier] of this.productionMultipliers) {
                    this.storage[resType] = this.storage[resType] + this.getProducedResource() * multiplier;
                }
            }

            // Consume resources
            if (currentTimeMillis - this.lastConsumedResource >= 1000) {
                this.lastConsumedResource = currentTimeMillis
                this.consumeResources();
            }

            // Ask for resource
            if(currentTimeMillis - this.lastResourceTransfer >= 60000) {
                let costsMinutes = this.getResourceCostsMinute();
                this.claim.askForResources(this, costsMinutes);
            }
        }

        // Transfer resource
        if (currentTimeMillis - this.lastResourceTransfer >= 60000) {
            this.lastResourceTransfer = currentTimeMillis
            if (this.claim !== null && !this.HQ) {
                let askFor = new Map<ResourceType, number>([
                    [ResourceType.CROP, 0],
                    [ResourceType.EMERALD, 0],
                    [ResourceType.FISH, 0],
                    [ResourceType.ORE, 0],
                    [ResourceType.WOOD, 0],
                ])
                let ignore = true;
                
                let costMinute = this.getResourceCostsMinute();
                for (let [prod, multi] of this.productionMultipliers) {
                    if(multi > 0) {
                        let offset = costMinute[prod] - (prod == ResourceType.EMERALD ? 
                            this.getProducedResource() : this.getProducedResource())
                        if(offset < 0) {
                            askFor[prod] = askFor[prod] - offset
                            ignore = false;
                        } 
                    }
                }

                let transference: ResourceTransference = {
                    id: uuidv4(),
                    target: this.claim.getHQ()!,
                    direction: TransferDirection.TERRITORY_TO_HQ,
                    storage: askFor
                }
                this.transferResource(transference);
                this.storage
            }
            this.passingResource.forEach(x => this.transferResource(x))
            this.passingResource = []
            if (this.HQ) {
                console.log(JSON.stringify(this.storage))
            }
        }

    }
}