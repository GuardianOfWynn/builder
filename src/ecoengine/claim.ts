import { v4 as uuidv4 } from 'uuid';
import { ResourceStorage, Territory, TransferDirection } from './territory'
import { GuildMap } from './guild_map';

type RouteStyle = any; // Replace with actual RouteStyle type definition
type BorderStyle = any; // Replace with actual BorderStyle type definition
type Treasury = any; // Replace with actual Treasury type definition
type Storage = any; // Replace with actual Storage type definition
type ResourceTransference = any; // Replace with actual ResourceTransference type definition
const HQ_TO_TERRITORY = 'HQ_TO_TERRITORY'; // Replace with actual constant if needed

export class Claim {
  globalTax: number;
  allyTax: number;
  globalStyle: RouteStyle;
  globalBorders: BorderStyle;
  territories: Territory[];

  constructor() {
    this.territories = [];
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
        direction: TransferDirection.HQ_TO_TERRITORY,
        storage: res,
        target: asking,
      });
    }
  }
}

export class ClaimPreset {
  Name: string;
  HQ: string;
  GlobalStyle: RouteStyle;
  GlobalBorders: BorderStyle;
  GlobalTax: number;
  AllyTax: number;
  Territories: {
    Territory: string;
    Boosts: {
      Bonuses: { [key: string]: number };
      Upgrades: { [key: string]: number };
    };
    Style: RouteStyle;
    Border: BorderStyle;
    Treasury: Treasury;
    Tax: number;
    AllyTax: number;
  }[];

  Parse(guildMap: GuildMap): Claim {
    const claim = new Claim();
    claim.globalTax = Math.round(this.GlobalTax);
    claim.allyTax = Math.round(this.AllyTax);
    claim.globalStyle = this.GlobalStyle;
    claim.globalBorders = this.GlobalBorders;

    guildMap.claims.push(claim);

    for (const v of this.Territories) {
      const territory = guildMap.getTerritory(v.Territory)!;
      territory.Reset();
      territory.claim = claim;
      if (v.Territory.toLowerCase() === this.HQ.toLowerCase()) {
        territory.HQ = true;
      }
      for (const [k, val] of Object.entries(v.Boosts.Bonuses)) {
        territory.bonuses[k] = {
          level: val,
          activated: true
        };
      }
      for (const [k, val] of Object.entries(v.Boosts.Upgrades)) {
        territory.upgrades[k] = {
          level: val,
          activated: true
        };
      }
      territory.borders = v.Border;
      territory.treasury = v.Treasury;
      territory.tax = v.Tax;
      territory.allyTax = v.AllyTax;
      guildMap.transferTerritory(territory, claim);
    }

    return claim;
  }
}
