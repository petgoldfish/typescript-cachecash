import { WASM, WASMImport } from './wasm';
import { Keypair } from 'cachecash-wasm';

export async function NewKey(): Promise<Keypair> {
    let wasm = (WASM === null) ? await WASMImport : WASM;
    let kp = new wasm.Keypair();
    return kp;
}