import { Client } from '../src/client';
import { PublicKey } from '../src/proto/cachecash_pb';

describe('Integration tests', () => {
    it('asdf', async () => {
        const pubkey = new Uint8Array([
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            30,
            31
        ]);
        const privkey = new Uint8Array([
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            30,
            31,
            32,
            33,
            34,
            35,
            36,
            37,
            38,
            39,
            40,
            41,
            42,
            43,
            44,
            45,
            46,
            47,
            48,
            49,
            50,
            51,
            52,
            53,
            54,
            55,
            56,
            57,
            58,
            59,
            60,
            61,
            62,
            63
        ]);

        jest.setTimeout(30000);

        let pubkey2 = new PublicKey();
        pubkey2.setPublicKey(pubkey);

        let cl = new Client('http://localhost:8043', pubkey2, privkey);
        console.log('created client');

        let o = await cl.getWholeObject('/file0.bin');
        console.log('fetch complete; shutting down client');

        function toHexString(byteArray: Uint8Array | ArrayBuffer) {
            return Array.prototype.map
                .call(byteArray, function(byte: number) {
                    return ('0' + (byte & 0xff).toString(16)).slice(-2);
                })
                .join('');
        }
        console.log(toHexString(o.slice(0, 100)));

        console.log('completed without error');
    });
});
