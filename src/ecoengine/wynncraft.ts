import { BaseTerritory, createTerritoryInstance } from "./base_territory";
import { Claim } from "./claim";
import { Guild } from "./guild";
import { GuildMap } from "./guild_map";
import { BorderStyle, RouteStyle, Territory } from "./territory";
import { TERRITORIES } from "../model/ecoengine/ecoengine"
import { EngineInstance, createEngineFromMap } from "./engine";

const TERRITORY_ENDPOINT = "https://athena.wynntils.com/cache/get/territoryList"

interface TerritoryApiData {
    name: string,
    guild: {
        name: string,
        prefix: string,
        color: string
    },
    acquired: string
}

export async function importGuildMap(): Promise<GuildMap>{

    let territories: TerritoryApiData[] = [];
    let guildTerritories: Map<string, TerritoryApiData[]> = new Map();
    let guildNames: Map<string, string> = new Map();
    let guildColors: Map<string, string> = new Map();

    await fetch(TERRITORY_ENDPOINT, {
        method: "GET"
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error while retrieving territories data");
            }
            return response.json();
        })
        .then(data => {
            Object.keys(data.territories).forEach(function(key) {
                territories.push({
                    name: key,
                    guild: {
                        name: data.territories[key].guild,
                        prefix: data.territories[key].guildPrefix,
                        color: data.territories[key].guildColor
                    },
                    acquired: data.territories[key].acquired
                })
            })
        })
        .catch(error => {
            console.error('Error:', error);
        });

    territories.forEach(territory => {
        guildColors.set(territory.guild.prefix, territory.guild.color);
        guildNames.set(territory.guild.prefix, territory.guild.name);
        if(guildTerritories.has(territory.guild.prefix)) {
            guildTerritories.get(territory.guild.prefix)!.push(territory);
        } else {
            guildTerritories.set(territory.guild.prefix, [territory])
        }
    })
    let allTerritories: Territory[] = [];
    let claims: Claim[] = [];
    for (let [g, terrs] of guildTerritories) {
        let guild: Guild = {
            allies: [],
            color: guildColors.get(g)!,
            name: guildNames.get(g)!,
            tag: g
        }
        let claim = new Claim(guild);
        let territories: Territory[] = [];
        terrs.forEach(te => {
            let baseTerr = TERRITORIES.filter(x => x.territory === te.name)[0];
            let terr = createTerritoryInstance(baseTerr)
            terr.claim = claim;
            territories.push(terr);
            allTerritories.push(terr);
        });
        claim.territories = territories;
        claim.territories[0].HQ = true;
        claims.push(claim);
    }

    return new GuildMap(claims, allTerritories)
}
    