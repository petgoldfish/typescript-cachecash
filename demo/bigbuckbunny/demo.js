const hostName = process.env.PUBLISHER_HOST || 'localhost';
import {
    PublicKey
} from '../../src/proto/cachecash_pb';
import {
    Client
} from '../../src/client';
import { init_browser } from '../../src/util';
import { NewKey } from '../../src/key';

async function runTransfer(path, cb, done) {
    const clientKey = await NewKey();
    var pubkey = new PublicKey();
    pubkey.setPublicKey(clientKey.public());
    console.time('fetch');
    var cl = (window.client = new Client(
        'http://' + hostName + ':8043',
        pubkey,
        clientKey.secret()
    ));
    console.log('created client');

    let bundle = await cl.getFirstBundle(path);

    while (true) {
        let bg = await cl.fetchBundle(bundle);
        cb(bg.data);

        if (bundle.remainingChunks()) {
            bundle = await cl.getFollowupBundle(bundle);
        } else {
            break;
        }
    }

    console.log('completed without error');
    console.timeEnd('fetch');

    done();
}

async function setupVideo() {
    var video = document.getElementById('player');

    var mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
    var path = '/frag_bunny.mp4';

    if ('MediaSource' in window && MediaSource.isTypeSupported(mimeCodec)) {
        var mediaSource = new MediaSource();
        video.src = URL.createObjectURL(mediaSource);
        mediaSource.addEventListener('sourceopen', sourceOpen);
    } else {
        console.error('Unsupported MIME type or codec: ', mimeCodec);
    }

    function sourceOpen(_) {
        var sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);

        var queue = [];
        var eof = false;
        sourceBuffer.addEventListener(
            'updateend',
            function () {
                if (queue.length) {
                    sourceBuffer.appendBuffer(queue.shift());
                    console.log('removed from queue:', queue.length);
                } else if (eof) {
                    mediaSource.endOfStream();
                }
            },
            false
        );

        runTransfer(
            path,
            function (buffers) {
                buffers.map(buf => {
                    if (!sourceBuffer.updating && !queue.length) {
                        console.log('appending directly');
                        sourceBuffer.appendBuffer(buf);
                    } else {
                        queue.push(buf);
                        console.log('added to queue:', queue.length);
                    }
                });
            },
            function () {
                if (!sourceBuffer.updating && !queue.length) {
                    mediaSource.endOfStream();
                } else {
                    eof = true;
                }
            }
        );
    }
}

init_browser(setupVideo);