const hostName = process.env.PUBLISHER_HOST || 'localhost';
import {
    PublicKey
} from '../../src/proto/cachecash_pb';
import {
    Client
} from '../../src/client';

async function runTransfer(path, cb, done) {
    var pubkey = new PublicKey();
    pubkey.setPublicKey(
        new Uint8Array([
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
        ])
    );
    var privkey = new Uint8Array([
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

    console.time('fetch');
    var cl = (window.client = new Client(
        'http://' + hostName + ':8043',
        pubkey,
        privkey
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
            function() {
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
            function(buffers) {
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
            function() {
                if (!sourceBuffer.updating && !queue.length) {
                    mediaSource.endOfStream();
                } else {
                    eof = true;
                }
            }
        );
    }
}

document.addEventListener('DOMContentLoaded', setupVideo);

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // Raced with DOMContentLoaded; just do it directly
    setupVideo();
}
