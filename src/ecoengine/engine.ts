import { BaseTerritory, createTerritoryInstance } from "./base_territory"
import { ClaimPreset, parseClaimPreset } from "./claim"
import { Guild } from "./guild"
import { GuildMap } from "./guild_map"
import { Territory } from "./territory"

export var EngineInstance: Engine | null = null

export class Engine {
    guildMap: GuildMap
    currentTransferenceId: number;

    constructor(guildMap: GuildMap) {
        this.guildMap = guildMap;
        this.currentTransferenceId = 0;
    }

    Start() {
        console.log("Starting EcoEngine...");
        let fn = function () {
            EngineInstance!.guildMap.territories.forEach(terr => {
                terr.tick()
            })
        }
        setInterval(() => {
            EngineInstance!.currentTransferenceId++
        }, 50000)
        const setIntervalAsync = (ms) => {
            fn()
            setTimeout(() => setIntervalAsync(ms), ms);
        };
        setIntervalAsync(1000)
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