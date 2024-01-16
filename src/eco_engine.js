import { SKY_CLAIM_PRESET, TERRITORIES } from "./model/ecoengine/ecoengine";
import "../wasm_exec"

onmessage = function(wasmInstance) {
    wasmInstance.exports.startEngine(territories, preset)
}