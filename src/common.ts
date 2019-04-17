import { TicketL2 } from './proto/cachecash_pb';
import { Puzzle, sliceIVFromSecret, sliceKeyFromSecret } from './puzzle';
const aesjs = require('aes-js');

export function encryptTicketL2(p: Puzzle, t: TicketL2): Uint8Array {
    const plaintext = t.serializeBinary();

    const aesCtr = new aesjs.ModeOfOperation.ctr(p.key(), new aesjs.Counter(p.iv()));
    const ciphertext = aesCtr.encrypt(plaintext);

    return ciphertext;
}

export function decryptTicketL2(secret: Uint8Array, ciphertext: Uint8Array): TicketL2 {
    const iv = sliceIVFromSecret(secret);
    const key = sliceKeyFromSecret(secret);

    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(iv));
    const plaintext = aesCtr.decrypt(ciphertext);

    const msg = TicketL2.deserializeBinary(plaintext);
    return msg;
}
