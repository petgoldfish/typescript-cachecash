export let WASM: typeof import("cachecash-wasm") | null = null;

// This is required for the library bundles; the browser bundles use a bootstrap
// thunk in the browser code, but webpack (and differently parcel) also want an
// async thunk in the import path for libraries for some reason we haven't
// tracked down. https://github.com/rustwasm/rust-webpack-template/issues/43#issuecomment-540803148
async function importWASM(): Promise<typeof import("cachecash-wasm")> {
    const mod = await import("cachecash-wasm");
    return mod;
}
export const WASMImport = importWASM();
