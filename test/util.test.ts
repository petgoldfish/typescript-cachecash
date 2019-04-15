import * as util from '../src/util';

describe('util test', () => {
    it('incrementIV increments correctly', () => {
        let ctr = new Uint8Array(16);
        util.incrementIV(ctr, 123);
        expect(ctr).toEqual(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 123]));
    });

    it('incrementIV carry over', () => {
        let ctr = new Uint8Array(16);
        util.incrementIV(ctr, 12345);
        expect(ctr).toEqual(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 57]));
    });

    // keep this function in sync with go-cachecash
    it('encrypt block', async () => {
        let plaintext = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
        let key = new Uint8Array([16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
        let iv = new Uint8Array([8, 7, 6, 5, 4, 3, 2, 1, 16, 15, 14, 13, 12, 11, 10, 9]);

        let ciphertext = await util.encryptBlock(plaintext, key, iv, 23);
        expect(ciphertext).toEqual(
            new Uint8Array([7, 231, 85, 127, 217, 165, 18, 114, 59, 80, 215, 36, 96, 107, 189, 87])
        );
    });

    it('throws on incorrect blocksize', async () => {
        let plaintext = new Uint8Array([1, 2, 3, 4]);
        let key = new Uint8Array([16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
        let iv = new Uint8Array([8, 7, 6, 5, 4, 3, 2, 1, 16, 15, 14, 13, 12, 11, 10, 9]);

        // assert error in async function
        let error;
        try {
            await util.encryptBlock(plaintext, key, iv, 23);
        } catch (e) {
            error = e;
        }
        expect(error).toEqual(new Error('cleartext must be exactly one block in length'));
    });

    it('keyedPRF', async () => {
        let blockIdx = 34;
        let seqNo = 9;
        let key = new Uint8Array([
            0x52,
            0x39,
            0xcd,
            0xd3,
            0x4e,
            0xd4,
            0x30,
            0xf9,
            0x6b,
            0xe3,
            0x59,
            0x2b,
            0xe7,
            0x39,
            0x4a,
            0x09
        ]);

        let iv = await util.keyedPRF(util.uint64ToLE(blockIdx), seqNo, key);
        expect(iv).toEqual(
            new Uint8Array([
                0x28,
                0xd6,
                0x76,
                0x87,
                0x78,
                0xc0,
                0x25,
                0x59,
                0x1a,
                0xd7,
                0xa8,
                0x8f,
                0xe8,
                0x91,
                0x24,
                0x16
            ])
        );
    });

    it('Uint64ToLE', () => {
        let blockIdx = 34;
        let x = util.uint64ToLE(blockIdx);
        expect(x).toEqual(new Uint8Array([0x22, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0]));
    });
});
