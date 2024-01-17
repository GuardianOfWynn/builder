import { SKY_CLAIM_PRESET, TERRITORIES } from "./model/ecoengine/ecoengine";
import "../wasm_exec"

let wasm = undefined;

const go = new Go();

function StartEcoEngine() {
	const go = new Go();
	WebAssembly.instantiateStreaming(fetch("/builder/eco-engine.wasm"), go.importObject).then((res) => {
		let territories = JSON.stringify(TERRITORIES)
		let preset = JSON.stringify(SKY_CLAIM_PRESET)
		wasm = res.instance
		go.run(wasm)
		wasm.exports.startEcoEngineTinyGo(territories, preset)
	});
}

onmessage = function(e) {
    StartEcoEngine()
};