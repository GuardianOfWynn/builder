import { v4 as uuidv4 } from 'uuid';
import { BorderStyle, ResourceStorage, RouteStyle, Territory, TransferDirection, Treasury } from './territory'
import { GuildMap } from './guild_map';
import { Guild } from './guild';

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

  setAsHQ(territory: Territory): void {
    for (const t of this.territories) {
      t.HQ = false;
    }
    territory.HQ = true;
  }

  getHQ(): Territory | null {
    for (const t of this.territories) {
      if (t.HQ) {
        return t;
      }
    }
    return null;
  }

  askForResources(asking: Territory, res: ResourceStorage): void {
    const hq = this.getHQ();
    if (hq) {
      hq.passingResource.push({
        id: uuidv4(),
        currentTerritory: hq,
        origin: hq,
        direction: TransferDirection.HQ_TO_TERRITORY,
        storage: res,
        target: asking,
      });
    }
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