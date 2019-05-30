const cachecash = require('../../browser/browser'); // '../dist/index' for NodeJS

document.addEventListener("DOMContentLoaded", async () => {
    var pubkey = new Uint8Array([
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
    ]);
    var privkey = new Uint8Array([
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63
    ]);

    var pubkey2 = new cachecash.PublicKey();
    pubkey2.setPublicKey(pubkey);

    console.time('fetch');
    var cl = window.client = new cachecash.Client('http://localhost:8043', pubkey2, privkey);
    console.log('created client');

    var o = await cl.getWholeObject('/file0.bin');
    console.log('fetch complete; shutting down client');

    function toHexString(byteArray) {
        return Array.prototype.map
            .call(byteArray, function(byte) {
                return ('0' + (byte & 0xff).toString(16)).slice(-2);
            })
            .join('');
    }
    console.log(toHexString(o.slice(0, 100)));

    console.log('completed without error');
    console.timeEnd('fetch');
});
