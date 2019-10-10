import {
    Parameters,
    Puzzle,
    Solution,
    Sha2Size384,
    IVSize,
    KeySize,
    runPuzzle,
    equalBuffers
} from '../src/puzzle';
import { AesBlockSize } from '../src/digest';
const aesjs = require('aes-js');
const randomBytes = require('randombytes');

const BlockQty = 8;
const BlockSize = AesBlockSize * 1024;

function randBytes(n: number): Uint8Array {
    const bytes = randomBytes(n);
    return new Uint8Array([...bytes]);
}

function setupSuite(chunkSizeModifier?: number) {
    let plaintextBlocks: Uint8Array[] = [];
    let ciphertextBlocks: Uint8Array[] = [];
    let innerKeys: Uint8Array[] = [];
    let innerIVs: Uint8Array[] = [];
    let params = new Parameters(2, 0, 0);

    if (!chunkSizeModifier) {
        chunkSizeModifier = 1;
    }

    for (let i = 0; i < BlockQty; i++) {
        let k = randBytes(16);
        innerKeys.push(k);

        let iv = randBytes(AesBlockSize);
        innerIVs.push(iv);

        // TODO: The blocks need not all be the same size.
        let b = randBytes(Math.floor(BlockSize * chunkSizeModifier));
        plaintextBlocks.push(b);

        // encrypt block
        const aesCtr = new aesjs.ModeOfOperation.ctr(k, new aesjs.Counter(iv));
        const cb = aesCtr.encrypt(b);

        ciphertextBlocks.push(cb);
    }

    async function generateAndSolve(rangeBegin: number, rangeEnd: number) {
        let puzzle = Puzzle.generate(
            params,
            plaintextBlocks.slice(rangeBegin, rangeEnd),
            innerKeys.slice(rangeBegin, rangeEnd),
            innerIVs.slice(rangeBegin, rangeEnd)
        );

        expect(puzzle.secret.length).toBe(Sha2Size384);
        expect(puzzle.goal.length).toBe(Sha2Size384);

        let solution = await puzzle.solve(params, ciphertextBlocks.slice(rangeBegin, rangeEnd));

        // It's only actually important that the secret be the same on both sides, but it would be very odd if multiple
        // offsets led to correct solutions to the puzzle.
        expect(solution.offset).toEqual(puzzle.offset);
        expect(solution.secret).toEqual(puzzle.secret);
    }

    return {
        generateAndSolve,

        plaintextBlocks,
        ciphertextBlocks,
        innerKeys,
        innerIVs,
        params
    };
}

describe('Colocation puzzle solver', () => {
    it('generate and solve', () => {
        let suite = setupSuite();
        return suite.generateAndSolve(0, 4);
    });

    it('generate and solve with offset', () => {
        let suite = setupSuite();
        return suite.generateAndSolve(4, 8);
    });

    it('generate and solve single block', () => {
        let suite = setupSuite();
        return suite.generateAndSolve(0, 1);
    });

    it('generate and solve unusual chunk size', () => {
        let suite = setupSuite(0.9);
        return suite.generateAndSolve(0, 4);
    });

    it('challenge and verify', () => {
        let suite = setupSuite();

        let puzzle = Puzzle.generate(
            suite.params,
            suite.plaintextBlocks,
            suite.innerKeys,
            suite.innerIVs
        );

        let solution = new Solution(puzzle.goal, puzzle.offset);
        // this throws an exception if it fails
        puzzle.verify(suite.ciphertextBlocks, solution);
    });

    // keep this function in sync with go-cachecash
    it('runs puzzle correctly', () => {
        let suite = setupSuite();

        let blocks = [
            new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]),
            new Uint8Array([16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]),
            new Uint8Array([32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47]),
            new Uint8Array([48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63])
        ];

        let rounds = 2;
        let offset = 2;

        let result = runPuzzle(
            rounds,
            blocks.length,
            offset,
            (blockIdx: number, offset: number): Uint8Array => {
                offset = offset % (blocks[blockIdx].length / AesBlockSize);
                return blocks[blockIdx].slice(offset * AesBlockSize, (offset + 1) * AesBlockSize);
            }
        );

        let expectedGoal = new Uint8Array(
            [0x11, 0x88, 0x53, 0xf9, 0x6d, 0xc6, 0x70, 0xe9]
                .concat([0xd6, 0x6a, 0xab, 0xee, 0xf3, 0x4a, 0xed, 0x53])
                .concat([0x5d, 0x2, 0xd2, 0xa9, 0x2b, 0xf0, 0xe0, 0x80])
                .concat([0x9e, 0xc9, 0xb3, 0x12, 0xcd, 0xa0, 0x83, 0xfc])
                .concat([0x5a, 0x5c, 0x94, 0x7c, 0xef, 0xba, 0xd7, 0x68])
                .concat([0xe2, 0x3f, 0x64, 0xef, 0xd8, 0x8, 0x87, 0x20])
        );
        let expectedSecret = new Uint8Array(
            [0x58, 0x72, 0x17, 0xdd, 0x1e, 0xfd, 0x61, 0x12]
                .concat([0xb2, 0xb5, 0xb6, 0x41, 0xd2, 0x7a, 0xa5, 0xfd])
                .concat([0x47, 0x2f, 0x27, 0xb6, 0x8f, 0x19, 0x4b, 0x8c])
                .concat([0x2f, 0x9, 0x2, 0x9e, 0xdb, 0x63, 0xca, 0x5f])
                .concat([0x2b, 0xf4, 0xd0, 0x91, 0x6b, 0xbc, 0x26, 0xa2])
                .concat([0x92, 0x92, 0xe3, 0x11, 0xae, 0x5a, 0xb5, 0x18])
        );

        expect(result.goal).toEqual(expectedGoal);
        expect(result.secret).toEqual(expectedSecret);
    });

    // keep this function in sync with go-cachecash
    it('solution verify', () => {
        let suite = setupSuite();

        let blocks = [
            new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]),
            new Uint8Array([16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]),
            new Uint8Array([32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47]),
            new Uint8Array([48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63])
        ];

        let goal = new Uint8Array(
            [0x11, 0x88, 0x53, 0xf9, 0x6d, 0xc6, 0x70, 0xe9]
                .concat([0xd6, 0x6a, 0xab, 0xee, 0xf3, 0x4a, 0xed, 0x53])
                .concat([0x5d, 0x2, 0xd2, 0xa9, 0x2b, 0xf0, 0xe0, 0x80])
                .concat([0x9e, 0xc9, 0xb3, 0x12, 0xcd, 0xa0, 0x83, 0xfc])
                .concat([0x5a, 0x5c, 0x94, 0x7c, 0xef, 0xba, 0xd7, 0x68])
                .concat([0xe2, 0x3f, 0x64, 0xef, 0xd8, 0x8, 0x87, 0x20])
        );
        let secret = new Uint8Array(
            [0x58, 0x72, 0x17, 0xdd, 0x1e, 0xfd, 0x61, 0x12]
                .concat([0xb2, 0xb5, 0xb6, 0x41, 0xd2, 0x7a, 0xa5, 0xfd])
                .concat([0x47, 0x2f, 0x27, 0xb6, 0x8f, 0x19, 0x4b, 0x8c])
                .concat([0x2f, 0x9, 0x2, 0x9e, 0xdb, 0x63, 0xca, 0x5f])
                .concat([0x2b, 0xf4, 0xd0, 0x91, 0x6b, 0xbc, 0x26, 0xa2])
                .concat([0x92, 0x92, 0xe3, 0x11, 0xae, 0x5a, 0xb5, 0x18])
        );
        let offset = 2;

        let puzzle = new Puzzle(goal, secret, offset, suite.params);
        let solution = new Solution(goal, offset);
        let result = puzzle.verify(blocks, solution);
        expect(result.secret).toEqual(secret);
    });

    it('test key and iv from secret', () => {
        let suite = setupSuite();
        let puzzle = Puzzle.generate(
            suite.params,
            suite.plaintextBlocks,
            suite.innerKeys,
            suite.innerIVs
        );

        let key = puzzle.key();
        let iv = puzzle.iv();

        expect(key.length).toBe(KeySize);
        expect(iv.length).toBe(IVSize);
    });

    it('throws on invalid params', () => {
        let params = new Parameters(0, 0, 0);
        expect(() => params.validate()).toThrow(new Error('puzzle must have at least one round'));
    });

    it('throws on invalid generate', () => {
        let params = new Parameters(1, 0, 0);

        expect(() => {
            Puzzle.generate(params, [], [], []);
        }).toThrow(new Error('must have at least one data block'));

        expect(() => {
            Puzzle.generate(params, [new Uint8Array([1])], [], []);
        }).toThrow(new Error('must have same number of blocks, keys, and IVs'));

        expect(() => {
            Puzzle.generate(
                params,
                [new Uint8Array([1])],
                [new Uint8Array([1])],
                [new Uint8Array([1])]
            );
        }).toThrow(
            new Error(
                'must use at least two puzzle iterations; increase number of rounds or caches'
            )
        );
    });

    it('throws on invalid solution', () => {
        let suite = setupSuite();

        let blocks = [
            new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]),
            new Uint8Array([16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]),
            new Uint8Array([32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47]),
            new Uint8Array([48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63])
        ];

        let goal = new Uint8Array(
            [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]
                .concat([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff])
                .concat([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff])
                .concat([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff])
                .concat([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff])
                .concat([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff])
        );
        let secret = new Uint8Array(
            [0x58, 0x72, 0x17, 0xdd, 0x1e, 0xfd, 0x61, 0x12]
                .concat([0xb2, 0xb5, 0xb6, 0x41, 0xd2, 0x7a, 0xa5, 0xfd])
                .concat([0x47, 0x2f, 0x27, 0xb6, 0x8f, 0x19, 0x4b, 0x8c])
                .concat([0x2f, 0x9, 0x2, 0x9e, 0xdb, 0x63, 0xca, 0x5f])
                .concat([0x2b, 0xf4, 0xd0, 0x91, 0x6b, 0xbc, 0x26, 0xa2])
                .concat([0x92, 0x92, 0xe3, 0x11, 0xae, 0x5a, 0xb5, 0x18])
        );
        let offset = 2;

        let puzzle = new Puzzle(goal, secret, offset, suite.params);
        let solution = new Solution(goal, offset);

        expect(() => {
            puzzle.verify(blocks, solution);
        }).toThrow(new Error('solution is incorrect'));
    });

    it('throws on invalid solution paramers', () => {
        let suite = setupSuite();

        let blocks = [new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])];

        let goal = new Uint8Array(
            [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]
                .concat([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff])
                .concat([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff])
                .concat([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff])
                .concat([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff])
                .concat([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff])
        );
        let secret = new Uint8Array(
            [0x58, 0x72, 0x17, 0xdd, 0x1e, 0xfd, 0x61, 0x12]
                .concat([0xb2, 0xb5, 0xb6, 0x41, 0xd2, 0x7a, 0xa5, 0xfd])
                .concat([0x47, 0x2f, 0x27, 0xb6, 0x8f, 0x19, 0x4b, 0x8c])
                .concat([0x2f, 0x9, 0x2, 0x9e, 0xdb, 0x63, 0xca, 0x5f])
                .concat([0x2b, 0xf4, 0xd0, 0x91, 0x6b, 0xbc, 0x26, 0xa2])
                .concat([0x92, 0x92, 0xe3, 0x11, 0xae, 0x5a, 0xb5, 0x18])
        );
        let offset = 2;

        let params;
        params = new Parameters(1, 0, 0);

        let puzzle: Puzzle;
        puzzle = new Puzzle(goal, secret, offset, params);
        let solution = new Solution(goal, offset);

        expect(() => puzzle.verify([], solution)).toThrow(
            new Error('must have at least one data block')
        );

        expect(() =>
            puzzle.verify(
                [new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])],
                solution
            )
        ).toThrow(
            new Error(
                'must use at least two puzzle iterations; increase number of rounds or caches'
            )
        );

        puzzle = new Puzzle(goal, new Uint8Array([1, 2, 3]), offset, params);
        expect(() => puzzle.verify(blocks, solution)).toThrow(
            new Error('goal value must be a SHA-384 digest; its length is wrong')
        );
    });

    it('returns false on differently sized buffer compare', () => {
        let equal = equalBuffers(new Uint8Array([1]), new Uint8Array([1, 2]));
        expect(equal).toBe(false);
    });

    it('throws if no solution found', async () => {
        let suite = setupSuite();

        let puzzle = Puzzle.generate(
            suite.params,
            suite.plaintextBlocks,
            suite.innerKeys,
            suite.innerIVs
        );

        await expect(puzzle.solve(suite.params, [])).rejects.toEqual(
            new Error('Must have at least 1 chunk')
        );

        puzzle.goal = new Uint8Array(Array(48).fill(0xff));
        await expect(puzzle.solve(suite.params, suite.ciphertextBlocks)).rejects.toEqual(
            new Error('No solution found (WASM)')
        );

        puzzle.params.rounds = 1;
        await expect(puzzle.solve(suite.params, suite.ciphertextBlocks.slice(0, 1))).rejects.toEqual(
            new Error(
                'must use at least two puzzle iterations; increase number of rounds or chunks'
            )
        );

        puzzle.goal = new Uint8Array([1, 2, 3]);
        await expect(puzzle.solve(suite.params, suite.ciphertextBlocks)).rejects.toEqual(
            new Error('Goal is not a SHA-384 digest: wrong length')
        );
    });
});
