import * as util from '../src/digest';
import {
    TicketL2,
    TicketL2Info,
    TicketBundle,
    TicketRequest,
    ClientCacheRequest,
    TicketBundleRemainder,
    ColocationPuzzleInfo,
    TicketBundleSubdigests,
    BatchSignature,
    TicketL1
} from '../src';

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
        const blockIdx = 34;
        const seqNo = 9;
        const key = new Uint8Array([
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

        const iv = await util.keyedPRF(util.uint64ToLE(blockIdx), seqNo, key);
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
        const blockIdx = 34;
        const x = util.uint64ToLE(blockIdx);
        expect(x).toEqual(new Uint8Array([0x22, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0]));
    });

    it('encryptDataBlock', async () => {
        const blockIdx = 34;
        const seqNo = 9;
        const key = new Uint8Array([
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
        const plaintext = new Uint8Array([
            0x01,
            0x02,
            0x03,
            0x04,
            0x05,
            0x06,
            0x07,
            0x08,
            0x09,
            0x0a,
            0x0b,
            0x0c,
            0x0d,
            0x0e,
            0x0f,
            0x10
        ]);

        const cipher = await util.encryptDataBlock(blockIdx, seqNo, key, plaintext);
        expect(cipher).toEqual(
            new Uint8Array([147, 173, 195, 133, 47, 251, 1, 68, 142, 164, 72, 71, 183, 78, 52, 82])
        );
    });

    it('ticketL2CanonicalDigest', async () => {
        const l2 = new TicketL2();
        l2.setNonce(new Uint8Array([1, 2, 3, 4, 5, 6, 7]));

        let digest = await util.ticketL2CanonicalDigest(l2);
        expect(digest).toEqual(
            new Uint8Array([
                0,
                226,
                79,
                12,
                164,
                211,
                139,
                156,
                81,
                125,
                141,
                192,
                238,
                69,
                224,
                218,
                59,
                65,
                19,
                240,
                26,
                56,
                214,
                104,
                218,
                210,
                226,
                21,
                235,
                68,
                155,
                188,
                126,
                29,
                68,
                190,
                165,
                46,
                203,
                31,
                103,
                201,
                193,
                32,
                128,
                46,
                12,
                143
            ])
        );
    });

    it('encryptedTicketL2Digest', async () => {
        const l2 = new TicketL2Info();
        l2.setEncryptedTicketL2(new Uint8Array([1, 2, 3, 4, 5, 6, 7]));

        let digest = await util.encryptedTicketL2Digest(l2);
        expect(digest).toEqual(
            new Uint8Array([
                0,
                226,
                79,
                12,
                164,
                211,
                139,
                156,
                81,
                125,
                141,
                192,
                238,
                69,
                224,
                218,
                59,
                65,
                19,
                240,
                26,
                56,
                214,
                104,
                218,
                210,
                226,
                21,
                235,
                68,
                155,
                188,
                126,
                29,
                68,
                190,
                165,
                46,
                203,
                31,
                103,
                201,
                193,
                32,
                128,
                46,
                12,
                143
            ])
        );
    });

    it('buildClientCacheRequest with TicketRequest', async () => {
        let puzzle = new ColocationPuzzleInfo();
        puzzle.setGoal(new Uint8Array([1, 2, 3]));
        puzzle.setRounds(1);
        puzzle.setStartOffset(2);
        puzzle.setStartRange(3);

        let remainder = new TicketBundleRemainder();
        remainder.setPuzzleInfo(puzzle);

        let bundle = new TicketBundle();
        bundle.setEncryptedTicketL2(new Uint8Array([4, 5, 6]));
        bundle.setRemainder(remainder);

        let submsg = new TicketRequest();

        let r = await util.buildClientCacheRequest(bundle, submsg);

        let expected = new ClientCacheRequest();
        expected.setBundleRemainder(remainder);
        let tbs = new TicketBundleSubdigests();
        tbs.setEncryptedTicketL2Digest(
            new Uint8Array([
                81,
                227,
                154,
                129,
                193,
                241,
                97,
                250,
                122,
                54,
                68,
                70,
                230,
                136,
                68,
                152,
                96,
                126,
                34,
                30,
                11,
                23,
                40,
                252,
                23,
                28,
                8,
                128,
                55,
                251,
                201,
                15,
                72,
                138,
                128,
                3,
                74,
                170,
                62,
                132,
                84,
                84,
                195,
                9,
                241,
                185,
                71,
                93
            ])
        );
        tbs.setRemainderDigest(
            new Uint8Array([
                214,
                209,
                180,
                151,
                6,
                116,
                100,
                47,
                207,
                153,
                234,
                176,
                73,
                92,
                115,
                0,
                111,
                101,
                156,
                20,
                243,
                47,
                89,
                67,
                155,
                2,
                109,
                234,
                11,
                100,
                158,
                205,
                168,
                229,
                127,
                158,
                94,
                104,
                46,
                10,
                117,
                100,
                230,
                186,
                222,
                117,
                105,
                247
            ])
        );
        expected.setTicketBundleSubdigests(tbs);

        let tr = new TicketRequest();
        expected.setTicketRequest(tr);

        expect(r).toEqual(expected);
    });

    it('buildClientCacheRequest with TicketL1', async () => {
        let puzzle = new ColocationPuzzleInfo();
        puzzle.setGoal(new Uint8Array([1, 2, 3]));
        puzzle.setRounds(1);
        puzzle.setStartOffset(2);
        puzzle.setStartRange(3);

        let remainder = new TicketBundleRemainder();
        remainder.setPuzzleInfo(puzzle);

        let bundle = new TicketBundle();
        bundle.setEncryptedTicketL2(new Uint8Array([4, 5, 6]));
        bundle.setRemainder(remainder);

        let submsg = new TicketL1();

        let r = await util.buildClientCacheRequest(bundle, submsg);

        let expected = new ClientCacheRequest();
        expected.setBundleRemainder(remainder);
        let tbs = new TicketBundleSubdigests();
        tbs.setEncryptedTicketL2Digest(
            new Uint8Array([
                81,
                227,
                154,
                129,
                193,
                241,
                97,
                250,
                122,
                54,
                68,
                70,
                230,
                136,
                68,
                152,
                96,
                126,
                34,
                30,
                11,
                23,
                40,
                252,
                23,
                28,
                8,
                128,
                55,
                251,
                201,
                15,
                72,
                138,
                128,
                3,
                74,
                170,
                62,
                132,
                84,
                84,
                195,
                9,
                241,
                185,
                71,
                93
            ])
        );
        tbs.setRemainderDigest(
            new Uint8Array([
                214,
                209,
                180,
                151,
                6,
                116,
                100,
                47,
                207,
                153,
                234,
                176,
                73,
                92,
                115,
                0,
                111,
                101,
                156,
                20,
                243,
                47,
                89,
                67,
                155,
                2,
                109,
                234,
                11,
                100,
                158,
                205,
                168,
                229,
                127,
                158,
                94,
                104,
                46,
                10,
                117,
                100,
                230,
                186,
                222,
                117,
                105,
                247
            ])
        );
        expected.setTicketBundleSubdigests(tbs);

        let l1 = new TicketL1();
        expected.setTicketL1(l1);

        expect(r).toEqual(expected);
    });
    it('buildClientCacheRequest with TicketL2Info', async () => {
        let puzzle = new ColocationPuzzleInfo();
        puzzle.setGoal(new Uint8Array([1, 2, 3]));
        puzzle.setRounds(1);
        puzzle.setStartOffset(2);
        puzzle.setStartRange(3);

        let remainder = new TicketBundleRemainder();
        remainder.setPuzzleInfo(puzzle);

        let bundle = new TicketBundle();
        bundle.setEncryptedTicketL2(new Uint8Array([4, 5, 6]));
        bundle.setRemainder(remainder);

        let submsg = new TicketL2Info();

        let r = await util.buildClientCacheRequest(bundle, submsg);

        let expected = new ClientCacheRequest();
        expected.setBundleRemainder(remainder);

        let tbs = new TicketBundleSubdigests();
        tbs.setEncryptedTicketL2Digest(
            new Uint8Array([
                81,
                227,
                154,
                129,
                193,
                241,
                97,
                250,
                122,
                54,
                68,
                70,
                230,
                136,
                68,
                152,
                96,
                126,
                34,
                30,
                11,
                23,
                40,
                252,
                23,
                28,
                8,
                128,
                55,
                251,
                201,
                15,
                72,
                138,
                128,
                3,
                74,
                170,
                62,
                132,
                84,
                84,
                195,
                9,
                241,
                185,
                71,
                93
            ])
        );
        tbs.setRemainderDigest(
            new Uint8Array([
                214,
                209,
                180,
                151,
                6,
                116,
                100,
                47,
                207,
                153,
                234,
                176,
                73,
                92,
                115,
                0,
                111,
                101,
                156,
                20,
                243,
                47,
                89,
                67,
                155,
                2,
                109,
                234,
                11,
                100,
                158,
                205,
                168,
                229,
                127,
                158,
                94,
                104,
                46,
                10,
                117,
                100,
                230,
                186,
                222,
                117,
                105,
                247
            ])
        );
        expected.setTicketBundleSubdigests(tbs);

        let l2 = new TicketL2Info();
        expected.setTicketL2(l2);

        expect(r).toEqual(expected);
    });
});
