import { AesBlockSize, encryptBlock } from './digest';
import { Crypto } from '@peculiar/webcrypto';

const crypto = new Crypto();
export const Sha2Size384 = 48; // sha512.Size384
export const IVSize = AesBlockSize;
export const KeySize = 16;

export class Parameters {
    rounds: number;
    startOffset: number;
    startRange: number;

    constructor(rounds: number, startOffset: number, startRange: number) {
        this.rounds = rounds;
        this.startOffset = startOffset;
        this.startRange = startRange;
    }

    validate() {
        if (this.rounds < 1) {
            throw new Error('puzzle must have at least one round');
        }
    }
}

export class Puzzle {
    goal: Uint8Array;
    secret: Uint8Array;
    offset: number;
    params: Parameters;

    constructor(goal: Uint8Array, secret: Uint8Array, offset: number, params: Parameters) {
        this.goal = goal;
        this.secret = secret;
        this.offset = offset;
        this.params = params;
    }

    // this is called generate in go-cachecash
    static async generate(
        params: Parameters,
        blocks: Uint8Array[],
        innerKeys: Uint8Array[],
        innerIVs: Uint8Array[]
    ): Promise<Puzzle> {
        params.validate();

        if (blocks.length === 0) {
            throw new Error('must have at least one data block');
        }
        if (blocks.length !== innerKeys.length || blocks.length !== innerIVs.length) {
            throw new Error('must have same number of blocks, keys, and IVs');
        }

        if (params.rounds * blocks.length <= 1) {
            throw new Error(
                'must use at least two puzzle iterations; increase number of rounds or caches'
            );
        }

        const blockSize = blocks.map(block => {
            let blockLen = block.length;
            if (blockLen % AesBlockSize !== 0) {
                throw new Error('input block size is not a multiple of cipher block size');
            }
            return blockLen / AesBlockSize;
        });

        const startOffset = Math.floor(Math.random() * blockSize[0]);

        const result = await runPuzzle(
            params.rounds,
            blocks.length,
            startOffset,
            async (i: number, offset: number): Promise<Uint8Array> => {
                const blockLen = blocks[i].length;
                offset = offset % (blockLen / AesBlockSize);
                const plaintext = getCipherBlock(blocks[i], offset);

                return encryptBlock(plaintext, innerKeys[i], innerIVs[i], offset);
            }
        );

        return new Puzzle(result.goal, result.secret, startOffset, params);
    }

    async solve(params: Parameters, blocks: Uint8Array[]): Promise<Solution> {
        params.validate();

        if (blocks.length === 0) {
            throw new Error('must have at least one data block');
        }

        if (this.goal.length !== Sha2Size384) {
            throw new Error('goal value must be a SHA-384 digest; its length is wrong');
        }

        if (params.rounds * blocks.length <= 1) {
            // XXX: Using a single ruond and a single cache is a silly idea, but `runPuzzle` will fail with those inputs.
            throw new Error(
                'must use at least two puzzle iterations; increase number of rounds or caches'
            );
        }

        // Try all possible starting offsets and look for one that produces the result/goal value we're looking for.
        for (let offset = 0; offset < blocks[0].length / AesBlockSize; offset++) {
            let result = await runPuzzle(
                params.rounds,
                blocks.length,
                offset,
                async (blockIdx: number, offset: number): Promise<Uint8Array> => {
                    offset = offset % (blocks[blockIdx].length / AesBlockSize);
                    return blocks[blockIdx].slice(
                        offset * AesBlockSize,
                        (offset + 1) * AesBlockSize
                    );
                }
            );

            if (equalBuffers(this.goal, result.goal)) {
                return new Solution(result.secret, offset);
            }
        }

        throw new Error('no solution found');
    }

    async verify(blocks: Uint8Array[], solution: Solution): Promise<Result> {
        this.params.validate();

        if (blocks.length === 0) {
            throw new Error('must have at least one data block');
        }

        if (this.secret.length !== Sha2Size384) {
            throw new Error('goal value must be a SHA-384 digest; its length is wrong');
        }

        if (this.params.rounds * blocks.length <= 1) {
            // XXX: Using a single ruond and a single cache is a silly idea, but `runPuzzle` will fail with those inputs.
            throw new Error(
                'must use at least two puzzle iterations; increase number of rounds or caches'
            );
        }

        let result = await runPuzzle(
            this.params.rounds,
            blocks.length,
            solution.offset,
            async (blockIdx: number, offset: number): Promise<Uint8Array> => {
                offset = offset % (blocks[blockIdx].length / AesBlockSize);
                return blocks[blockIdx].slice(offset * AesBlockSize, (offset + 1) * AesBlockSize);
            }
        );

        if (equalBuffers(this.goal, result.goal)) {
            return result;
        }

        throw new Error('solution is incorrect');
    }

    iv(): Uint8Array {
        return sliceIVFromSecret(this.secret);
    }

    key(): Uint8Array {
        return sliceKeyFromSecret(this.secret);
    }
}

export function sliceIVFromSecret(secret: Uint8Array): Uint8Array {
    return secret.slice(0, IVSize);
}

export function sliceKeyFromSecret(secret: Uint8Array): Uint8Array {
    return secret.slice(IVSize, IVSize + KeySize);
}

class Result {
    goal: Uint8Array;
    secret: Uint8Array;

    constructor(goal: Uint8Array, secret: Uint8Array) {
        this.goal = goal;
        this.secret = secret;
    }
}

export class Solution {
    secret: Uint8Array;
    offset: number;

    constructor(secret: Uint8Array, offset: number) {
        this.secret = secret;
        this.offset = offset;
    }
}

// XXX: it seems theres is no better way to compare them
export function equalBuffers(a: Uint8Array, b: Uint8Array): boolean {
    if (a.length !== b.length) {
        return false;
    }

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }

    return true;
}

export async function runPuzzle(
    rounds: number,
    blockQty: number,
    offset: number,
    getBlockFn: (i: number, offset: number) => Promise<Uint8Array>
): Promise<Result> {
    let curLoc: Uint8Array = new Uint8Array(new ArrayBuffer(Sha2Size384));
    let prevLoc: Uint8Array = curLoc;

    for (let i = 0; i < rounds * blockQty - 1; i++) {
        const blockIdx = i % blockQty;
        const subblock = await getBlockFn(blockIdx, offset);
        prevLoc = curLoc;

        let data = new Uint8Array(curLoc.length + subblock.length);
        data.set(curLoc);
        data.set(subblock, curLoc.length);

        let digest = await crypto.subtle.digest('SHA-384', data);

        curLoc = new Uint8Array(digest);
        offset = new DataView(digest).getUint32(curLoc.length - 4, true); // For little endian
    }

    return new Result(curLoc, prevLoc);
}

function getCipherBlock(dataBlock: Uint8Array, cipherBlockIdx: number): Uint8Array {
    cipherBlockIdx = cipherBlockIdx % (dataBlock.length / AesBlockSize);
    const cipherBlock = dataBlock.slice(
        cipherBlockIdx * AesBlockSize,
        (cipherBlockIdx + 1) * AesBlockSize
    );
    return cipherBlock;
}
