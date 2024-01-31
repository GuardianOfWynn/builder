import { BaseTerritory, createTerritoryInstance } from "./base_territory"
import { ClaimPreset, parseClaimPreset } from "./claim"
import { Guild } from "./guild"
import { GuildMap } from "./guild_map"
import { Territory } from "./territory"

export var EngineInstance: Engine | null = null

export class Engine {
    guildMap: GuildMap
    currentTransferenceId: number;
    lastResourceTransference: number;

    constructor(guildMap: GuildMap) {
        this.guildMap = guildMap;
        this.currentTransferenceId = 0;
        this.lastResourceTransference = new Date().getTime();
    }

    Start() {
        console.log("Starting EcoEngine...");
        const setIntervalAsync = (ms) => {
            EngineInstance!.guildMap.territories.forEach(terr => {
                terr.tick()
            })
            setTimeout(() => setIntervalAsync(ms), ms);
        };
        setInterval(() => {
            EngineInstance!.currentTransferenceId++
            let currentTimeMillis = new Date().getTime();
            EngineInstance!.guildMap.territories.forEach(terr => {
                terr.startResourceTransfer()
            })
            EngineInstance!.lastResourceTransference = currentTimeMillis;
        }, 60000)
        setIntervalAsync(10000)
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