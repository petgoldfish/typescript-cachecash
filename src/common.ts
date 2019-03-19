import { TicketL2 } from './proto/cachecash_pb';
import { Puzzle, sliceIVFromSecret, sliceKeyFromSecret } from './puzzle';

export async function encryptTicketL2(p: Puzzle, t: TicketL2): Promise<Uint8Array> {
    let plaintext = t.serializeBinary();

    let cryptoKey = await crypto.subtle.importKey('raw', p.key(), 'AES-CTR', true, [
        'encrypt',
        'decrypt'
    ]);

    let ciphertext = await crypto.subtle.encrypt(
        {
            name: 'AES-CTR',
            counter: p.iv,
            length: 128
        },
        cryptoKey,
        plaintext
    );

    return new Uint8Array(ciphertext);
}

export async function decryptTicketL2(
    secret: Uint8Array,
    ciphertext: Uint8Array
): Promise<TicketL2> {
    let iv = sliceIVFromSecret(secret);
    let key = sliceKeyFromSecret(secret);

    let cryptoKey = await crypto.subtle.importKey('raw', key, 'AES-CTR', true, [
        'encrypt',
        'decrypt'
    ]);

    let plaintext = await crypto.subtle.decrypt(
        {
            name: 'AES-CTR',
            counter: iv,
            length: 128
        },
        cryptoKey,
        ciphertext
    );

    let msg = TicketL2.deserializeBinary(new Uint8Array(plaintext));
    return msg;
}
