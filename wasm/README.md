# WASM accelerator for cachecash-js

This subdir is a standalone Rust wasm-bindgen project that we may break out in
future, rather than a full hybrid project using wasm-tool/wasm-pack-plugin.

As such the WASM layer can be worked with and tested in isolation.

## Building

* `wasm-pack build` / `wasm-pack build --release`
* `wasm-pack build --profiling`
* `wasm-pack build --dev`

## Testing

* `cargo test` for regular Rust language tests.
* Headless `wasm-pack test --headless --firefox` for tests crossing the bindgen layers.

See `tests/web.rs` for the bindgen tests.
