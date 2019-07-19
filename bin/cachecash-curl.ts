#!/usr/bin/env node
import { Client } from '../src/client';
import { PublicKey } from '../src/proto/cachecash_pb';
import { URL } from 'url';
import { promisify } from 'util';
import * as fs from 'fs';

class Location {
    publisher: string;
    path: string;

    protected constructor(publisher: string, path: string) {
        this.publisher = publisher;
        this.path = path;
    }

    static parse(uri: string): Location {
        let url = new URL(uri);
        return new Location(url.origin, url.pathname);
    }
}

async function run(): Promise<void> {
    let uri = process.argv[2];
    let output = process.argv[3];

    if (!uri) {
        console.log('Usage: npm run cachecash-curl http://localhost:8043/file0.bin output.bin');
        return;
    }

    let location = Location.parse(uri);

    console.log('publisher', location.publisher);
    console.log('url', location.path);
    console.log('output', output);

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

    let pubkey2 = new PublicKey();
    pubkey2.setPublicKey(pubkey);

    let cl = new Client(location.publisher, pubkey2, privkey);
    console.log('created client');

    let o = await cl.getWholeObject(location.path);
    console.log('fetch complete; shutting down client');

    if (output) {
        const fs_writeFile = promisify(fs.writeFile)
        await fs_writeFile(output, o);
    }

    console.log('completed without error');
}
run().catch(error => console.error('Error: ', error))
