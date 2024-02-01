import { v4 as uuidv4 } from 'uuid';
import { BorderStyle, ResourceStorage, RouteStyle, Territory, TransferDirection, Treasury } from './territory'
import { GuildMap } from './guild_map';
import { Guild } from './guild';
import { EngineInstance } from './engine';
import { ResourceType } from './resource';
import { Pathfinder } from './pathfinding/pathfinder';

export class Claim {
  globalTax: number;
  guild: Guild;
  allyTax: number;
  globalStyle: RouteStyle;
  globalBorders: BorderStyle;
  territories: Territory[];

  constructor(guild: Guild) {
    this.territories = [];
    this.globalStyle = RouteStyle.CHEAPEST;
    this.globalBorders = BorderStyle.OPEN;
    this.guild = guild;
  }

  tick(): void {
    for (const v of this.territories) {
      v.tick();
    }
  }

  getTerritory(name: string): Territory | null {
    for (const v of this.territories) {
      if (v.name.toLowerCase() === name.toLowerCase()) {
        return v;
      }
    }
    return null;
  }

  getHQ(): Territory | null {
    for (const t of this.territories) {
      if (t.HQ) {
        return t;
      }
    }
    return null;
  }

  setAsHQ(territory: Territory): void {
    if (territory.HQ) {
      return;
    }
    let hq = this.getHQ()!
    let storedResource = hq.storage
    let costs = hq.getResourceCostsMinute()
    let send = new Map<ResourceType, number>([
      [ResourceType.CROP, 0],
      [ResourceType.WOOD, 0],
      [ResourceType.ORE, 0],
      [ResourceType.FISH, 0],
      [ResourceType.EMERALD, 0]
    ])

    for (let [res, num] of storedResource) {
      send.set(res, (num - costs.get(res)!))
    }

    let pathfinder = new Pathfinder(hq, EngineInstance!.guildMap);
    let [route, tax, composed, possible] = pathfinder.route(territory, hq.routeStyle)

    // FIX ME: When moving HQ the resource is not sent in one time
    hq.passingResource.push({
      id: uuidv4(),
      currentTerritory: hq,
      origin: hq,
      direction: TransferDirection.HQ_TO_TERRITORY,
      storage: send,
      originalStyle: hq.routeStyle,
      originalClaim: this,
      originalRoute: route,
      target: territory,
      transferenceGroup: EngineInstance!.currentTransferenceId
    });

    for (const t of this.territories) {
      t.HQ = false;
    }
    territory.HQ = true;
  }

  askForResources(asking: Territory, res: ResourceStorage): void {
    console.log(asking.name + " pediu recurso")
    const hq = this.getHQ()!;

    let pathfinder = new Pathfinder(hq, EngineInstance!.guildMap);
    let [route, tax, composedTax, possible] = pathfinder.route(asking, hq.routeStyle)

    let send: ResourceStorage = new Map<ResourceType, number>();

    // Send more resource fo cover tax
    for(let [resource, qty] of res) {
      let neededRes = qty / composedTax;
      if(hq.storage.get(resource)! <= 0) {
        continue;
      }
      if(hq.storage.get(resource)! >= neededRes) {
        send.set(resource, neededRes);
        hq.storage.set(resource, hq.storage.get(resource)! - neededRes);
      } else {
        send.set(resource, hq.storage.get(resource)!)
        hq.storage.set(resource, 0)
      }
    }

    hq.passingResource.push({
      id: uuidv4(),
      currentTerritory: hq,
      origin: hq,
      originalClaim: this,
      originalRoute: route,
      originalStyle: this.getHQ()!.routeStyle,
      direction: TransferDirection.HQ_TO_TERRITORY,
      storage: send,
      target: asking,
      transferenceGroup: EngineInstance!.currentTransferenceId + 1
    });
  }
}

export class ClaimPreset {
  name: string;
  hq: string;
  guild: Guild;
  globalStyle: RouteStyle;
  globalBorders: BorderStyle;
  globalTax: number;
  allyTax: number;
  territories: {
    territory: string;
    boosts: {
      bonuses: { [key: string]: number };
      upgrades: { [key: string]: number };
    };
    style: RouteStyle;
    border: BorderStyle;
    treasury: Treasury;
    tax: number;
    allyTax: number;
  }[];
}

export function parseClaimPreset(preset: ClaimPreset, guildMap: GuildMap): Claim {
  const claim = new Claim(preset.guild);
  claim.globalTax = Math.round(preset.globalTax);
  claim.allyTax = Math.round(preset.allyTax);
  claim.globalStyle = preset.globalStyle;
  claim.globalBorders = preset.globalBorders;

  guildMap.claims.push(claim);

  for (const v of preset.territories) {
    const territory = guildMap.getTerritory(v.territory)!;
    territory.reset();
    territory.claim = claim;
    if (v.territory.toLowerCase() === preset.hq.toLowerCase()) {
      territory.HQ = true;
    }
    for (const [k, val] of Object.entries(v.boosts.bonuses)) {
      territory.bonuses[k] = {
        level: val,
        activated: true
      };
    }
    for (const [k, val] of Object.entries(v.boosts.upgrades)) {
      territory.upgrades[k] = {
        level: val,
        activated: true
      };
    }
    territory.borders = v.border;
    territory.treasury = v.treasury;
    territory.tax = v.tax;
    territory.allyTax = v.allyTax;
    guildMap.transferTerritory(territory, claim);
  }

  return claim;
}