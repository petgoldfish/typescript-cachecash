import { Crypto } from '@peculiar/webcrypto';

const crypto = new Crypto();

export const AesBlockSize = 16; // aes.BlockSize

export async function encryptBlock(
    plaintext: Uint8Array,
    key: Uint8Array,
    iv: Uint8Array,
    ctr: number
): Promise<Uint8Array> {
    if (plaintext.length !== AesBlockSize) {
        throw new Error('cleartext must be exactly one block in length');
    }

    let cryptoKey = await crypto.subtle.importKey('raw', key, 'AES-CTR', true, [
        'encrypt',
        'decrypt'
    ]);

    // Duplicate iv so that we don't mutate the array backing the slice we were passed.
    let counter = new Uint8Array(iv.length);
    counter.set(iv);
    incrementIV(counter, ctr);

    let ciphertext = await crypto.subtle.encrypt(
        {
            name: 'AES-CTR',
            counter,
            length: 128
        },
        cryptoKey,
        plaintext
    );

    return new Uint8Array(ciphertext);
}

export function incrementIV(iv: Uint8Array, counter: number) {
    for (let j = 0; j < counter; j++) {
        for (let i = iv.length - 1; i >= 0; i--) {
            iv[i]++;
            if (iv[i] !== 0) {
                break;
            }
        }
    }
}
