const origin = process.env.PUBLISHER_ADDR || 'http://localhost:8043';
import {
	PublicKey
} from '../../src/proto/cachecash_pb';
import {
	Client
} from '../../src/client';
import { init_browser, Logger } from '../../src/util';
import { NewKey } from '../../src/key';

const logger = new Logger().install();

async function runTransfer(path, cb, done) {
	const clientKey = await NewKey();
	const pubkey = new PublicKey();
	pubkey.setPublicKey(clientKey.public());

	logger.startTimer();
	console.time('fetch');
	const cl = (window.client = new Client(
		origin,
		pubkey,
		clientKey.secret()
	));
	console.log('created client');

	let bundle = await cl.getFirstBundle(path);
	// TODO: yield this info as event
	let totalSize = bundle.bundle.getMetadata().getObjectSize();

	while (true) {
		let bg = await cl.fetchBundle(bundle);
		cb({
			totalSize: totalSize,
			buffers: bg.data,
		});

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

function invokeSaveDialog(blob, filename) {
	const a = document.createElement('a');
	document.body.appendChild(a);
	const blobUrl = window.URL.createObjectURL(blob);
	a.href = blobUrl;
	a.download = filename;
	a.click();
	setTimeout(() => {
		window.URL.revokeObjectURL(blobUrl);
		document.body.removeChild(a);
	}, 0);
}

function humanifySpeed(bytesPerSec) {
	let suffix = 'B/s';

	if (bytesPerSec > 1000) {
		bytesPerSec /= 1000;
		suffix = 'KB/s';
	}

	if (bytesPerSec > 1000) {
		bytesPerSec /= 1000;
		suffix = 'MB/s';
	}

	if (bytesPerSec > 1000) {
		bytesPerSec /= 1000;
		suffix = 'GB/s';
	}

	return Math.round(bytesPerSec) + ' ' + suffix;
}

function download(path) {
	const downloadManager = document.getElementById('download-manager');
	const progressBar = downloadManager.querySelector('progress');
	const label = downloadManager.querySelector('.speed');

	downloadManager.hidden = false;

	let data = null;
	let cursor = 0;
	const startTime = new Date();

	runTransfer(
		path,
		function (event) {
			progressBar.max = event.totalSize;

			if (!data) {
				data = new Uint8Array(event.totalSize);
			}

			event.buffers.map(buf => {
				data.set(buf, cursor);
				cursor += buf.length;
				progressBar.value = cursor;
			});

			const now = new Date();
			const seconds = Math.round((now - startTime) / 1000);
			if (seconds > 0) {
				label.textContent = humanifySpeed(cursor / seconds);
			}
		},
		function () {
			invokeSaveDialog(new Blob([data]), 'ubuntu.iso');
			console.log('done');
			downloadManager.hidden = true;
		}
	);
}

async function setupButton() {
	const path = '/frag_bunny.mp4';
	// const path = '/ubuntu-18.04.3-desktop-amd64.iso';

	document.getElementById('download-button').addEventListener('click', () => {
		download(path);
	});
}

init_browser(setupButton);
