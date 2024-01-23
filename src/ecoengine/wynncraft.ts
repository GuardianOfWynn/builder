import { BaseTerritory } from "./base_territory";
import { GuildMap } from "./guild_map";
import { Territory } from "./territory";

const TERRITORY_ENDPOINT = "https://api.wynncraft.com/v3/guild/list/territory"

interface TerritoryApiData {
    name: string,
    guild: {
        name: string,
        prefix: string,
    },
    acquired: string
}

export async function importGuildMap(): GuildMap {

    let territories: TerritoryApiData[] = [];
    let guildTerritories: Map<string, TerritoryApiData[]> = new Map();
    let guildNames: Map<string, string> = new Map();

    await fetch(TERRITORY_ENDPOINT)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error while retrieving territories data");
            }
            return response.json();
        })
        .then(data => {
            Object.keys(data).forEach(function(key) {
                territories.push({
                    name: key,
                    guild: {
                        name: data[key].guild.name,
                        prefix: data[key].guild.prefix,
                    },
                    acquired: data[key].acquired
                })
            })
        })
        .catch(error => {
            console.error('Error:', error);
        });

    territories.forEach(territory => {
        guildNames.set(territory.guild.prefix, territory.guild.name);
        if(guildTerritories.has(territory.guild.prefix)) {
            guildTerritories.get(territory.guild.prefix)!.push(territory);
        } else {
            guildTerritories.set(territory.guild.prefix, [territory])
        }
    })
    
}