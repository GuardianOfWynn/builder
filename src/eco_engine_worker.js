import { SKY_CLAIM_PRESET, TERRITORIES } from "./model/ecoengine/ecoengine";
import "../wasm_exec"

let wasmInstance = undefined;
const go = new Go();
WebAssembly.instantiateStreaming(fetch("/builder/eco-engine.wasm"), go.importObject).then((result) => {
	let territories = JSON.stringify(TERRITORIES)
	let preset = JSON.stringify(SKY_CLAIM_PRESET)
	wasmInstance = (result.instance);
	console.log(wasmInstance.exports)
});

function StartEcoEngine() {
	const go = new Go();
	WebAssembly.instantiateStreaming(fetch("/builder/eco-engine.wasm"), go.importObject).then((result) => {
		go.run(result.instance);
		let territories = JSON.stringify(TERRITORIES)
		let preset = JSON.stringify(SKY_CLAIM_PRESET)
		startEngine(territories, preset)
	});
}

self.onmessage = function(e) {
    
};