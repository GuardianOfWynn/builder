import { BonusLevel, KEY_BONUS_EFFICIENT_EMERALDS, KEY_BONUS_EFFICIENT_RESOURCES, KEY_BONUS_EMERALD_RATE, KEY_BONUS_LARGE_EMERALD_STORAGE, KEY_BONUS_LARGE_RESOURCE_STORAGE, KEY_BONUS_RESOURCE_RATE, LARGER_RESOURCE_STORAGE, TerritoryBonus } from "./bonuses";
import { Claim } from "./claim";
import { Engine, EngineInstance } from "./engine";
import { Pathfinder } from "./pathfinding/pathfinder";
import { ResourceType } from "./resource";
import { v4 as uuidv4 } from 'uuid';
import { TerritoryUpgrade, UPGRADES, UpgradeLevel } from "./upgrades";
import * as bonuses from "./bonuses"
import * as upgrades from "./upgrades"

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
    transferenceGroup: number;
    direction: TransferDirection
    currentTerritory: Territory
    origin: Territory
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
    acquired: Date
    storage: Map<ResourceType, number>
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
    position: {
        startX: number;
        startZ: number;
        endX: number;
        endZ: number;
    };
    connections: string[]

    clearTransferencesOfPreviousGroup() {
        this.passingResource = this.passingResource.filter(x => x.transferenceGroup === EngineInstance!.currentTransferenceId);
    }

    getProducedResourceType(res: ResourceType): number {
        return this.productionMultipliers.get(res)! * (res === ResourceType.EMERALD
            ? this.getProducedEmerald() : this.getProducedResource())
    }

    getTerritoryStartX(): number {
        let west = this.position.startX < this.position.endX
        let x = west ? this.position.startX : this.position.startX - this.getTerritoryWidth();
        return 2560 + x
    }

    getTerritoryStartZ(): number {
        let lower = this.position.startZ > this.position.endZ
        let z = lower ? this.position.startZ : this.position.startZ + this.getTerritoryHeight()
        return -z
    }

    getTerritoryEndZ(): number {
        return this.getTerritoryStartZ() - this.getTerritoryHeight();
    }

    getTerritoryEndX(): number {
        return this.getTerritoryStartX() + this.getTerritoryWidth();
    }

    getTerritoryCenterX(): number {
        return this.getTerritoryStartX() + this.getTerritoryWidth()/2
    }

    getTerritoryCenterZ(): number {
        return (this.getTerritoryStartZ() + this.getTerritoryHeight()/2)
    }


    getTerritoryWidth(): number {
        return Math.abs(Math.abs(this.position.startX) - Math.abs(this.position.endX))
    }

    getTerritoryHeight(): number {
        return Math.abs(Math.abs(this.position.startZ) - Math.abs(this.position.endZ))
    }

    getResourceRate(): number {
        if(!this.bonuses.get(KEY_BONUS_RESOURCE_RATE)!.activated) {
            return bonuses.BONUSES_MAP.get(KEY_BONUS_RESOURCE_RATE)!.Levels.get(0)!.Value;
        }
        return bonuses.BONUSES_MAP.get(KEY_BONUS_RESOURCE_RATE)!.Levels.get(this.bonuses.get(KEY_BONUS_RESOURCE_RATE)!.level)!.Value
    }

    getEmeraldRate(): number {
        if(!this.bonuses.get(KEY_BONUS_EMERALD_RATE)!.activated) {
            return bonuses.BONUSES_MAP.get(KEY_BONUS_EMERALD_RATE)!.Levels.get(0)!.Value;
        }
        return bonuses.BONUSES_MAP.get(KEY_BONUS_EMERALD_RATE)!.Levels.get(this.bonuses.get(KEY_BONUS_EMERALD_RATE)!.level)!.Value
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
        if (this.bonuses.get(KEY_BONUS_EFFICIENT_EMERALDS)!.activated) {
            multiplier += bonuses.BONUSES_MAP.get(KEY_BONUS_EFFICIENT_EMERALDS)!.Levels.get(this.bonuses.get(KEY_BONUS_EFFICIENT_EMERALDS)!.level)!.Value / 100
        }
        return multiplier * BASE_EMERALD_PRODUCTION * (1 + this.getTreasuryBonus())
    }

    getProducedResource(): number {
        let multiplier = 1;
        if (this.bonuses.get(KEY_BONUS_EFFICIENT_RESOURCES)!.activated) {
            multiplier += bonuses.BONUSES_MAP.get(KEY_BONUS_EFFICIENT_RESOURCES)!.Levels.get(this.bonuses.get(KEY_BONUS_EFFICIENT_RESOURCES)!.level)!.Value / 100
        }
        return multiplier * BASE_RESOURCE_PRODUCTION * (1 + this.getTreasuryBonus())
    }

    getEmeraldStorageSize(): number {
        let multiplier = 1;
        if (this.bonuses.get(KEY_BONUS_LARGE_EMERALD_STORAGE)!.activated) {
            multiplier += bonuses.BONUSES_MAP.get(KEY_BONUS_LARGE_EMERALD_STORAGE)!.Levels.get(this.bonuses.get(KEY_BONUS_LARGE_EMERALD_STORAGE)!.level)!.Value / 100
        }
        if (this.HQ) {
            return Math.ceil(multiplier * BASE_EMERALD_STORAGE * HQ_EMERALD_STORAGE_BOOST)
        }
        return multiplier * BASE_EMERALD_STORAGE
    }

    getResourceStorageSize(): number {
        let multiplier = 1;
        if (this.bonuses.get(KEY_BONUS_LARGE_RESOURCE_STORAGE)!.activated) {
            multiplier += bonuses.BONUSES_MAP.get(KEY_BONUS_LARGE_RESOURCE_STORAGE)!.Levels.get(this.bonuses.get(KEY_BONUS_LARGE_RESOURCE_STORAGE)!.level)!.Value / 100
        }
        if (this.HQ) {
            return Math.ceil(multiplier * BASE_RESOURCE_STORAGE * HQ_RESOURCE_STORAGE_BOOST)
        }
        return multiplier * BASE_RESOURCE_STORAGE
    }

    getStoredResource(res: ResourceType): number {
        let sum = this.storage.get(res)!;
        for(let transf of this.passingResource) {
            sum += transf.storage.get(res)!;
        }
        return Math.floor(sum) 
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
        for (let [bonus, status] of this.bonuses) {
            let b: TerritoryBonus = bonuses.BONUSES_MAP.get(bonus)!
            let level: BonusLevel = b.Levels.get(status.level)!
            costs.set(b.UsedResorce, costs.get(b.UsedResorce)! + level.Cost / 60);
        }
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

        for (let conn of this.connections) {
            if (conn === target.name) {
                target.receiveResource(transf);
                return;
            }
        }

        if (this.name === target.name) {
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
        if(transference.origin.name == 'Hive' || transference.target.name == 'Hive') {
            console.log(transference);
        }
        if (this.name === transference.target.name) {
            this.storeResource(transference.storage);
        } else {
            this.passingResource.push(transference);
            transference.currentTerritory = this;
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
            let stored = this.storage.get(resType)!;
            if (stored + qty > storageSize) {
                this.storage.set(resType, storageSize);
                this.resourceOverflow = true;
            } else {
                this.resourceOverflow = false;
                this.storage.set(resType, stored + qty);
            }
        }
    }

    private consume(times: number, cost: number, usedResource: ResourceType): boolean {
        let costPerSecond = (cost / 3600) * times;
        let left = costPerSecond;
        if (this.storage.get(usedResource)! >= costPerSecond) {
            this.storage.set(usedResource, this.storage.get(usedResource)! - cost);
            return true;
        } else {
            this.storage.set(usedResource, 0);
            for (let passing of this.passingResource) {
                for (let [res, qty] of passing.storage) {
                    if (res === usedResource) {
                        if (left - qty <= 0) {
                            left = 0;
                            passing.storage.set(res, 0)
                            return true;
                        } else {
                            passing.storage.set(res, left - qty);
                            left = left - qty;
                        }
                    }
                }
            }
        }
        return false;
    }

    consumeResources(times: number) {
        for (let [upgrade, status] of this.upgrades) {
            let upg: TerritoryUpgrade = UPGRADES.get(upgrade)!
            let lvl: UpgradeLevel = upg.Levels[status.level];
            if (this.consume(times, lvl.Cost, upg.UsedResource)) {
                this.upgrades.get(upgrade)!.activated = true;
            } else {
                this.upgrades.get(upgrade)!.activated = false;
            }
        }

        for (let [bonus, status] of this.bonuses) {
            let b: TerritoryBonus = bonuses.BONUSES_MAP.get(bonus)!
            let lvl: BonusLevel = b.Levels.get(status.level)!;
            if (this.consume(times, lvl.Cost, b.UsedResorce)) {
                this.bonuses.get(bonus)!.activated = true;
            } else {
                this.bonuses.get(bonus)!.activated = false;
            }
        }

    }

    tick() {
        let currentTimeMillis = new Date().getTime()

        if (this.claim !== null) {
            // Produce emerald
            if (currentTimeMillis - this.lastEmeraldProduced >= this.getEmeraldRate() * 1000) {
                let delta = (currentTimeMillis - this.lastEmeraldProduced) / 1000
                this.lastEmeraldProduced = currentTimeMillis;
                this.storage.set(ResourceType.EMERALD, this.storage.get(ResourceType.EMERALD)! + this.getProducedEmerald() * this.productionMultipliers.get(ResourceType.EMERALD)! * delta);
            }

            // Produce resource
            if (currentTimeMillis - this.lastResourceProduced >= this.getResourceRate() * 1000) {
                let delta = (currentTimeMillis - this.lastResourceProduced) / 1000
                this.lastResourceProduced = currentTimeMillis;
                for (let [resType, multiplier] of this.productionMultipliers) {
                    if (resType === ResourceType.EMERALD) {
                        continue
                    }
                    this.storage.set(resType, this.storage.get(resType)! + this.getProducedResource() * multiplier * delta);
                }
            }

            // Consume resources
            if (currentTimeMillis - this.lastConsumedResource >= 1000) {
                let delta = (currentTimeMillis - this.lastConsumedResource) / 1000;
                this.lastConsumedResource = currentTimeMillis
                this.consumeResources(delta);
            }
        }

        // Transfer resource
        if (currentTimeMillis - this.lastResourceTransfer >= 60000) {
            this.lastResourceTransfer = currentTimeMillis
            if (this.claim !== null && !this.HQ) {
                let costMinute = this.getResourceCostsMinute();
                let needRes = false;
                let askFor = new Map<ResourceType, number>([
                    [ResourceType.CROP, 0],
                    [ResourceType.EMERALD, 0],
                    [ResourceType.FISH, 0],
                    [ResourceType.ORE, 0],
                    [ResourceType.WOOD, 0],
                ])
                let transfer = new Map<ResourceType, number>([
                    [ResourceType.CROP, 0],
                    [ResourceType.EMERALD, 0],
                    [ResourceType.FISH, 0],
                    [ResourceType.ORE, 0],
                    [ResourceType.WOOD, 0],
                ])
                for (let [res, cost] of costMinute) {
                    if (this.storage.get(res)! > cost) {
                        transfer.set(res, transfer.get(res)! + this.storage.get(res)! - cost);
                    } else {
                        if (this.productionMultipliers.get(res)! > 0) {
                            let produced = (this.getProducedResource() * this.productionMultipliers.get(res)!);
                            if (produced < cost) {
                                askFor.set(res, askFor.get(res)! + cost - produced);
                                needRes = true;
                            }
                        } else if (cost > 0) {
                            askFor.set(res, askFor.get(res)! + cost);
                            needRes = true;
                        }
                    }
                }

                for (let [res, qty] of this.storage) {
                    this.storage.set(res, qty - transfer.get(res)!)
                }

                let transference: ResourceTransference = {
                    id: uuidv4(),
                    currentTerritory: this,
                    origin: this,
                    target: this.claim.getHQ()!,
                    direction: TransferDirection.TERRITORY_TO_HQ,
                    storage: transfer,
                    transferenceGroup: EngineInstance!.currentTransferenceId
                }
                if (needRes) {
                    this.claim.askForResources(this, askFor);
                }
                this.transferResource(transference);
            }
            this.passingResource.forEach(x => this.transferResource(x))
            this.clearTransferencesOfPreviousGroup();
        }

    }

    reset() {
        this.HQ = false;
        this.claim = null;
        this.treasury = Treasury.VERY_LOW;
        this.routeStyle = RouteStyle.CHEAPEST;
        this.borders = BorderStyle.OPEN;
        this.tax = 0.05;
        this.allyTax = 0.05;
        this.acquired = new Date();
        this.storage = new Map<ResourceType, number>([
            [ResourceType.CROP, 0],
            [ResourceType.ORE, 0],
            [ResourceType.WOOD, 0],
            [ResourceType.FISH, 0],
            [ResourceType.EMERALD, 0]
        ]);
        this.passingResource = [];
        let now = new Date().getTime();
        this.lastResourceProduced = now;
        this.lastEmeraldProduced = now;
        this.lastConsumedResource = now;
        this.lastResourceTransfer = now;
        this.resourceGap = false;
        this.resourceOverflow = false;
        this.bonuses = new Map<string, UpgradeBonusStatus>([
            [bonuses.KEY_BONUS_STRONGER_MINIONS, { activated: false, level: 0 }],
            [bonuses.KEY_BONUS_MULTIHIT, { activated: false, level: 0 }],
            [bonuses.KEY_BONUS_TOWER_AURA, { activated: false, level: 0 }],
            [bonuses.KEY_BONUS_TOWER_VOLLEY, { activated: false, level: 0 }],
            [bonuses.KEY_BONUS_GATHER_XP, { activated: false, level: 0 }],
            [bonuses.KEY_BONUS_MOB_XP, { activated: false, level: 0 }],
            [bonuses.KEY_BONUS_MOB_DAMAGE, { activated: false, level: 0 }],
            [bonuses.KEY_BONUS_PVP_DAMAGE, { activated: false, level: 0 }],
            [bonuses.KEY_BONUS_XP_SEEKING, { activated: false, level: 0 }],
            [bonuses.KEY_BONUS_TOME_SEEKING, { activated: false, level: 0 }],
            [bonuses.KEY_BONUS_EMERALD_SEEKING, { activated: false, level: 0 }],
            [bonuses.KEY_BONUS_LARGE_RESOURCE_STORAGE, { activated: false, level: 0 }],
            [bonuses.KEY_BONUS_LARGE_EMERALD_STORAGE, { activated: false, level: 0 }],
            [bonuses.KEY_BONUS_EFFICIENT_RESOURCES, { activated: false, level: 0 }],
            [bonuses.KEY_BONUS_EFFICIENT_EMERALDS, { activated: false, level: 0 }],
            [bonuses.KEY_BONUS_RESOURCE_RATE, { activated: false, level: 0 }],
            [bonuses.KEY_BONUS_EMERALD_RATE, { activated: false, level: 0 }],
        ]);
        this.upgrades = new Map<string, UpgradeBonusStatus>([
            [upgrades.KEY_UPGRADE_ATTACK_SPEED, { activated: true, level: 0 }],
            [upgrades.KEY_UPGRADE_DAMAGE, { activated: true, level: 0 }],
            [upgrades.KEY_UPGRADE_DEFENSE, { activated: true, level: 0 }],
            [upgrades.KEY_UPGRADE_HEALTH, { activated: true, level: 0 }]
        ]);
    }
}