import "../wasm_exec"

let wasm = undefined;

self.onmessage = function(e) {
	console.log("aaaa")
    StartEcoEngine()
};

async function StartEcoEngine() {
	const go = new Go();
	WebAssembly.instantiateStreaming(fetch("/builder/eco-engine.wasm"), go.importObject).then((res) => {
		fetch('/builder/territories.json').then((response) => response.json()).then(territories => {
			fetch('/builder/presets/sky.json').then((response) => response.json()).then(preset => {
				wasm = res.instance
				go.run(wasm)
				wasm.exports.startEngineTinyGo(JSON.stringify(territories), JSON.stringify(preset))
			})
		})
	});
}
