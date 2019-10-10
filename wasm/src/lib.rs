mod utils;

use sha2::{Digest, Sha384};
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn set_panic_hook() {
    utils::set_panic_hook()
}

// #[wasm_bindgen]
// pub struct
#[wasm_bindgen]
pub struct Solver {
    secret: Vec<u8>, // sha384 output result
    // Copies of the buffers from JS: we could use the js_sys::Uint8Array's
    // directly, but then every get_block is multiple API calls back out of WASM
    // into the JS engine; and we're doing thousands of those per puzzle with
    // current block sizes.
    chunks: Vec<Vec<u8>>,
}

const AESBLOCKSIZE: usize = 16;

use std::convert::TryInto;

impl Solver {
    fn get_block(&self, chunk: usize, offset: usize) -> &[u8] {
        // offset is the *block* index, where a block is 16 bytes;
        // turn it into a byte offset
        // 	offset = offset % uint32(len(chunks[chunkIdx])/aes.BlockSize)
        // 	return chunks[chunkIdx][offset*aes.BlockSize : (offset+1)*aes.BlockSize], nil
        let offset = offset % (self.chunks[chunk].len() / AESBLOCKSIZE);
        &self.chunks[chunk][offset * AESBLOCKSIZE..(offset + 1) * AESBLOCKSIZE]
    }
    // getBlockFn := func(chunkIdx, offset uint32) ([]byte, error) {
    // 	offset = offset % uint32(len(chunks[chunkIdx])/aes.BlockSize)
    // 	return chunks[chunkIdx][offset*aes.BlockSize : (offset+1)*aes.BlockSize], nil
    // }

    pub fn rust_secret(&self) -> &Vec<u8> {
        &self.secret
    }
}

#[wasm_bindgen]
impl Solver {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Solver {
        Solver {
            chunks: Vec::new(),
            secret: vec![0; 48],
        }
    }

    pub fn push_chunk(&mut self, chunk: js_sys::Uint8Array) {
        let mut new_chunk = vec![0; chunk.length() as usize];
        chunk.copy_to(&mut new_chunk);
        self.chunks.push(new_chunk);
    }

    // See https://github.com/rustwasm/wasm-bindgen/issues/1742
    pub fn solve(&mut self, rounds: usize, goal: &[u8]) -> Result<usize, JsValue> {
        if rounds == 0 {
            return Err(js_sys::Error::new("Must have at least 1 round").into());
        }
        if self.chunks.len() == 0 {
            return Err(js_sys::Error::new("Must have at least 1 chunk").into());
        }
        if goal.len() != 48 {
            return Err(js_sys::Error::new("Goal is not a SHA-384 digest: wrong length").into());
        }
        if rounds * self.chunks.len() == 1 {
            return Err(js_sys::Error::new(
                "must use at least two puzzle iterations; increase number of rounds or chunks",
            )
            .into());
        }

        let chunk_qty = self.chunks.len();

        for round_offset in 0..self.chunks[0].len() / AESBLOCKSIZE {
            // 	// Initializing this to all zeroes allows this code to function with two rounds and a single cache.  Obviously, in
            // 	// that situation the puzzle does not do anything anyhow, so having a predictable secret does not hurt us.
            // 	curLoc = make([]byte, sha512.Size384)
            // todo: consider staticvec! with nightly, or a struct allocated vec!
            let mut cur_loc = vec![0; 48];
            let mut offset = round_offset;
            // 	// XXX: Is 'location' the best name for curLoc/prevLoc?
            // 	var curLoc, prevLoc []byte // = hash(startblock, startoffset)

            // 	for i := uint32(0); i < uint32((rounds*chunkQty)-1); i++ {
            for i in 0..rounds * chunk_qty - 1 {
                // 		chunkIdx := i % chunkQty
                let chunk_idx = i % chunk_qty;
                // 		piece, err := getBlockFn(chunkIdx, offset)
                // 		if err != nil {
                // 			return nil, nil, errors.Wrap(err, "failed to get piece")
                // 		}
                // 		// piece := p.chunks[chunkIdx].data[offset*aes.BlockSize : (offset+1)*aes.BlockSize]
                // 		// assert len(piece) == aes.BlockSize
                // 		prevLoc = curLoc
                self.secret.copy_from_slice(&cur_loc);
                let piece = self.get_block(chunk_idx, offset);
                // 		digest := sha512.Sum384(append(curLoc, piece...))
                let mut hasher = Sha384::new();
                hasher.input(&cur_loc);
                hasher.input(piece);
                let digest = hasher.result();
                let digest_slice = digest.as_slice();
                // 		curLoc = digest[:]
                // 		rust: we copy out for clarity, we can probably manage optimised lifetimes of a hasher etc
                // 		eventually once the concept is proven to tune performance
                cur_loc.copy_from_slice(digest_slice);
                // 		offset = binary.LittleEndian.Uint32(curLoc[len(curLoc)-4:])
                // last 4 bytes of curLoc in little endian form?
                offset =
                    u32::from_le_bytes(cur_loc[cur_loc.len() - 4..].try_into().unwrap()) as usize;
            }
            if cur_loc == goal {
                return Ok(round_offset);
            }
        }

        Err(js_sys::Error::new("No solution found (WASM)").into())
    }

    // must copy the value immediate after reading it out - the view is transient
    pub fn secret(&self) -> js_sys::Uint8Array {
        unsafe { js_sys::Uint8Array::view(&self.secret) }
    }
}
