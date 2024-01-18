import { Claim } from "./claim"
import { Territory } from "./territory"

export class GuildMap {
	claims: Claim[]
	territories: Territory[]

    constructor(claims: Claim[], territories: Territory[]) {
        this.claims = claims;
        this.territories = territories;
    }

    transferTerritory(terr: Territory, claim: Claim) {
        if (terr.claim != null) {
            let currentClaim = terr.claim
            let terrIndex = currentClaim.territories.findIndex(x => x.name == terr.name)
            if (terrIndex != -1) {
                currentClaim.territories.splice(terrIndex, 1)
            }
        }
        claim.territories.push(terr)
        terr.claim = claim
    }

    getTerritory(name: string): Territory | undefined {
        return this.territories.filter(x => x.name == name)[0]
    }
}
