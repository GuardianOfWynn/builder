import { BaseTerritory } from "./base_territory"
import { ClaimPreset } from "./claim"
import { GuildMap } from "./guild_map"
import { Territory } from "./territory"

export var EngineInstance: Engine | null = null

export class Engine {
    guildMap: GuildMap

    constructor(guildMap: GuildMap) {
        this.guildMap = guildMap;
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

function createEngine(territories: BaseTerritory[], preset: ClaimPreset) {
    let terrs: Territory[] = []
    territories.forEach(x => terrs.push(x.createTerritoryInstance()))

    let guildMap = new GuildMap([], terrs);
    preset.Parse(guildMap)
    EngineInstance = new Engine(guildMap);
}