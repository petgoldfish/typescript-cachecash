const origin = process.env.PUBLISHER_ADDR || 'http://localhost:8043';
import {
    PublicKey
} from '../../src/proto/cachecash_pb';
import {
    Client
} from '../../src/client';
import { init_browser } from '../../src/util';
import { NewKey } from '../../src/key';

async function setupDemo() {
    const clientKey = await NewKey();
    var pubkey = new PublicKey();
    pubkey.setPublicKey(clientKey.public());

    console.time('fetch');
    var cl = window.client = new Client(origin, pubkey,
        clientKey.secret());
    console.log('created client');

    var o = await cl.getWholeObject('/file0.bin');
    console.log('fetch complete; shutting down client');

    function toHexString(byteArray) {
        return Array.prototype.map
            .call(byteArray, function (byte) {
                return ('0' + (byte & 0xff).toString(16)).slice(-2);
            })
            .join('');
    }
    console.log(toHexString(o.slice(0, 100)));

    console.log('completed without error');
    console.timeEnd('fetch');
}

init_browser(setupDemo);