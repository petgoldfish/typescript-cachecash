import { TicketL2 } from './proto/cachecash_pb';
import { Puzzle, sliceIVFromSecret, sliceKeyFromSecret } from './puzzle';
const aesjs = require('aes-js');

export async function encryptTicketL2(p: Puzzle, t: TicketL2): Promise<Uint8Array> {
    const plaintext = t.serializeBinary();

    const aesCtr = new aesjs.ModeOfOperation.ctr(p.key(), new aesjs.Counter(p.iv()));
    const ciphertext = aesCtr.encrypt(plaintext);

    return ciphertext;
}

export async function decryptTicketL2(
    secret: Uint8Array,
    ciphertext: Uint8Array
): Promise<TicketL2> {
    const iv = sliceIVFromSecret(secret);
    const key = sliceKeyFromSecret(secret);

    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(iv));
    const plaintext = aesCtr.decrypt(ciphertext);

    const msg = TicketL2.deserializeBinary(plaintext);
    return msg;
}
