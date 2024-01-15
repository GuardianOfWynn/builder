const go = new globalThis.Go();

export function StartEcoEngine() {
	WebAssembly.instantiateStreaming(fetch("/builder/eco-engine.wasm"), go.importObject).then((result) => {
		go.run(result.instance);
	});

	let territories = JSON.stringify()

	globalThis.startEngine()
}

export function WASM_isEcoEngineRunning(): Boolean {
	return globalThis.EcoEngineRunning()
}

export function WASM_getEngineInstance(): any {
	return globalThis.EngineInstance()
}