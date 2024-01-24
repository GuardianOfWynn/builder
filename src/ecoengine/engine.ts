import { BaseTerritory, createTerritoryInstance } from "./base_territory"
import { ClaimPreset, parseClaimPreset } from "./claim"
import { Guild } from "./guild"
import { GuildMap } from "./guild_map"
import { Territory } from "./territory"

export var EngineInstance: Engine | null = null

export class Engine {
    guildMap: GuildMap

    constructor(guildMap: GuildMap) {
        this.guildMap = guildMap;
        for(let t of guildMap.territories) {
            for(let cin of t.connections) {
                let conn = guildMap.getTerritory(cin);
                if(!conn?.connections.includes(t.name)) {
                    console.log("INCOSISTENTE: " + t.name + " e " + cin);
                }
            }
        }
    }

    Start() {
        console.log("Starting EcoEngine...");
        let fn = async function () {
            setInterval(() => {
                EngineInstance!.guildMap.territories.forEach(terr => {
                    terr.tick()
                })
            })
        }
        fn()
    }
}

export function createEngine(territories: BaseTerritory[], preset: ClaimPreset) {
    let terrs: Territory[] = []
    territories.forEach(x => terrs.push(createTerritoryInstance(x)))

    let guildMap = new GuildMap([], terrs);
    parseClaimPreset(preset, guildMap)
    EngineInstance = new Engine(guildMap);
}

export function createEngineFromMap(guildMap: GuildMap) {
    EngineInstance = new Engine(guildMap);
}