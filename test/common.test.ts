import { encryptTicketL2, decryptTicketL2, Puzzle, TicketL2, Parameters } from '../src';

describe('util test', () => {
    let secret = new Uint8Array([
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

    it('encryptTicketL2', async () => {
        let puzzle = new Puzzle(new Uint8Array([]), secret, 1, new Parameters(2, 0, 0));
        let l2 = new TicketL2();
        l2.setNonce('hello world');

        let cipher = await encryptTicketL2(puzzle, l2);

        expect(cipher).toEqual(new Uint8Array([142, 83, 80, 152, 21, 143, 240, 36, 150]));
    });

    it('decryptTicketL2', async () => {
        let l2 = await decryptTicketL2(
            secret,
            new Uint8Array([142, 83, 80, 152, 21, 143, 240, 36, 150])
        );

        let expected = new TicketL2();
        expected.setNonce(new Uint8Array([133, 233, 101, 163, 10, 43, 149]));

        expect(l2).toEqual(expected);
    });
});
