import { SKY_CLAIM_PRESET, TERRITORIES } from "../model/ecoengine/ecoengine";
import "../../wasm_exec"

const go = new Go();
const globalThis = window;
export function StartEcoEngine() {
	WebAssembly.instantiateStreaming(fetch("/builder/eco-engine.wasm"), go.importObject).then((result) => {
		go.run(result.instance);
		let territories = JSON.stringify(TERRITORIES)
		let preset = JSON.stringify(SKY_CLAIM_PRESET)

		globalThis.startEngine(territories, preset)
	});
}

export function WASM_isEcoEngineRunning() {
	return EcoEngineRunning()
}

export function WASM_getEngineInstance() {
	return EngineInstance()
}