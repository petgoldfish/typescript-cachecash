use wasm_bindgen::prelude::*;

extern crate ed25519_dalek;
extern crate rand;

use rand::rngs::OsRng;
use sha2::Sha512;

#[wasm_bindgen]
pub struct Keypair {
    keypair: ed25519_dalek::Keypair,
}

#[wasm_bindgen]
impl Keypair {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Keypair {
        let mut csprng: OsRng = OsRng::new().unwrap();
        let keypair: ed25519_dalek::Keypair =
            ed25519_dalek::Keypair::generate::<Sha512, _>(&mut csprng);
        Keypair { keypair }
    }

    pub fn public(&self) -> Vec<u8> {
        self.keypair.public.as_bytes().to_vec()
    }

    pub fn secret(&self) -> Vec<u8> {
        self.keypair.secret.as_bytes().to_vec()
    }
}
