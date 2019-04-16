import {
    PublicKey,
    TicketL1,
    TicketL2,
    TicketL2Info,
    BlockKey,
    TicketRequest,
    ColocationPuzzleInfo,
    TicketBundleSubdigests,
    TicketBundleRemainder,
    TicketBundle,
    ClientCacheRequest
} from './proto/cachecash_pb';
const sha384 = require('sha.js').sha384;
const aesjs = require('aes-js');

export const AesBlockSize = 16; // aes.BlockSize

// TODO: encryptDataBlock is used to encrypt and decrypt
export async function encryptBlock(
    plaintext: Uint8Array,
    key: Uint8Array,
    iv: Uint8Array,
    ctr: number
): Promise<Uint8Array> {
    if (plaintext.length !== AesBlockSize) {
        throw new Error('cleartext must be exactly one block in length');
    }

    // Duplicate iv so that we don't mutate the array backing the slice we were passed.
    let counter = new Uint8Array(iv.length);
    counter.set(iv);
    incrementIV(counter, ctr);

    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(counter));
    const ciphertext = aesCtr.encrypt(plaintext);

    return ciphertext;
}

export function incrementIV(iv: Uint8Array, counter: number) {
    for (let j = 0; j < counter; j++) {
        for (let i = iv.length - 1; i >= 0; i--) {
            iv[i]++;
            if (iv[i] !== 0) {
                break;
            }
        }
    }
}

// XXX: This function and EncryptBlock, which encrypts a signle *cipher* block, need names that are less likely to cause
// confusion.
// Also decrypts blocks, since we're using AES in the CTR mode.
export async function encryptDataBlock(
    blockIdx: number,
    reqSeqNo: number,
    sessionKey: Uint8Array,
    plaintext: Uint8Array
): Promise<Uint8Array> {
    const counter = await keyedPRF(uint64ToLE(blockIdx), reqSeqNo, sessionKey);

    const aesCtr = new aesjs.ModeOfOperation.ctr(sessionKey, new aesjs.Counter(counter));
    const ciphertext = aesCtr.encrypt(plaintext);

    return ciphertext;
}

export async function keyedPRF(
    prfInput: Uint8Array,
    requestSeqNo: number,
    key: Uint8Array
): Promise<Uint8Array> {
    let data = new Uint8Array(4 + prfInput.length);

    // XXX: Why is it important that we feed requestSeqNo in here?
    data[0] = requestSeqNo & 0xff;
    data[1] = (requestSeqNo & 0xff00) >> 8;
    data[2] = (requestSeqNo & 0xff0000) >> 16;
    data[3] = (requestSeqNo & 0xff000000) >> 24;

    data.set(prfInput, 4);

    let h = new sha384();
    h.update(data);
    let digest = h.digest();

    // We use the first portion of the digest as the IV, and the following part as the plaintext to be encrypted.
    let counter = digest.slice(0, AesBlockSize);
    let plaintext = digest.slice(AesBlockSize, 3 * AesBlockSize);

    const aesCtr = new aesjs.ModeOfOperation.cbc(key, counter);
    const ciphertext = aesCtr.encrypt(plaintext);

    // Our result is the last block of the ciphertext.
    // XXX: Why do we encrypt two blocks if we are only going to use a single block of the ciphertext?
    return new Uint8Array(ciphertext.slice(AesBlockSize, AesBlockSize * 2));
}

function uint32ToLE(num: number): Uint8Array {
    let data = new Uint8Array(4);

    data[0] = num & 0xff;
    data[1] = (num & 0xff00) >> 8;
    data[2] = (num & 0xff0000) >> 16;
    data[3] = (num & 0xff000000) >> 24;

    return data;
}

// TODO: this doesn't work yet, numbers only have 53 bits in javascript
export function uint64ToLE(num: number): Uint8Array {
    let data = new Uint8Array(8);

    data[0] = num & 0xff;
    data[1] = (num & 0xff00) >> 8;
    data[2] = (num & 0xff0000) >> 16;
    data[3] = (num & 0xff000000) >> 24;

    // TODO: this is not correct
    data[4] = 0;
    data[5] = 0;
    data[6] = 0;
    data[7] = 0;

    return data;
}

/*
func(m * TicketBundle) BuildClientCacheRequest(subMsg proto.Message)(* ClientCacheRequest, error) {
    r:= & ClientCacheRequest{
        BundleRemainder: m.Remainder,
            TicketBundleSubdigests: m.GetSubdigests(),
                BundleSig: m.BatchSig,
                    BundleSignerCert: m.BundleSignerCert,
	}

    switch subMsg := subMsg.(type) {
	case (* TicketRequest):
        r.Ticket = & ClientCacheRequest_TicketRequest{ TicketRequest: subMsg }
	case (* TicketL1):
        r.Ticket = & ClientCacheRequest_TicketL1{ TicketL1: subMsg }
	case (* TicketL2Info):
        r.Ticket = & ClientCacheRequest_TicketL2{ TicketL2: subMsg }
	default:
        return nil, errors.New("unexpected submessage type")
    }

    return r, nil
}
*/

export async function buildClientCacheRequest(
    m: TicketBundle,
    subMsg: TicketRequest | TicketL1 | TicketL2Info
): Promise<ClientCacheRequest> {
    let r = new ClientCacheRequest();
    r.setBundleRemainder(m.getRemainder());
    r.setTicketBundleSubdigests(await getSubdigests(m));
    r.setBundleSig(m.getBatchSig());
    r.setBundleSignerCert(m.getBundleSignerCert());

    if (subMsg instanceof TicketRequest) {
        r.setTicketRequest(subMsg);
    } else if (subMsg instanceof TicketL1) {
        r.setTicketL1(subMsg);
    } else if (subMsg instanceof TicketL2Info) {
        r.setTicketL2(subMsg);
    } else {
        // XXX: this line is unreachable due to typescript
        throw new Error('unexpected submessage type');
    }

    return r;
}

export async function getSubdigests(m: TicketBundle): Promise<TicketBundleSubdigests> {
    let r = new TicketBundleSubdigests();
    r.setEncryptedTicketL2Digest(await canonicalEncryptedTicketL2Digest(m));
    r.setRemainderDigest(
        await ticketBundleRemainderCanonicalDigest(m.getRemainder() as TicketBundleRemainder)
    );

    r.setTicketRequestDigestList(
        m.getTicketRequestList().map(subMsg => ticketRequestCanonicalDigest(subMsg))
    );

    r.setTicketL1DigestList(m.getTicketL1List().map(subMsg => ticketL1CanonicalDigest(subMsg)));

    return r;
}

export async function canonicalEncryptedTicketL2Digest(m: TicketBundle): Promise<Uint8Array> {
    let h = new sha384();
    h.update(m.getEncryptedTicketL2_asU8());
    let digest = h.digest();
    return new Uint8Array(digest);
}

export async function ticketBundleSubdigestsCanonicalDigest(
    m: TicketBundleSubdigests
): Promise<Uint8Array> {
    let h = new sha384();
    h.update(await canonicalTicketRequestDigest(m));
    h.update(await canonicalTicketL1Digest(m));
    h.update(m.getEncryptedTicketL2Digest_asU8());
    h.update(m.getRemainderDigest_asU8());
    let digest = h.digest();

    return new Uint8Array(digest);
}

export async function canonicalTicketRequestDigest(m: TicketBundleSubdigests): Promise<Uint8Array> {
    let h = new sha384();
    m.getTicketRequestDigestList_asU8().forEach(d => {
        h.update(d);
    });
    let digest = h.digest();
    return new Uint8Array(digest);
}

export async function canonicalTicketL1Digest(m: TicketBundleSubdigests): Promise<Uint8Array> {
    let h = new sha384();
    m.getTicketL1DigestList_asU8().forEach(d => {
        h.update(d);
    });
    let digest = h.digest();
    return new Uint8Array(digest);
}

/*
func(m * TicketBundleSubdigests) ContainsTicketRequestDigest(d[]byte) bool {
    for _, x := range m.TicketRequestDigest {
        if bytes.Equal(x, d) {
            return true
        }
    }
    return false
}

func(m * TicketBundleSubdigests) ContainsTicketL1Digest(d[]byte) bool {
    for _, x := range m.TicketL1Digest {
        if bytes.Equal(x, d) {
            return true
        }
    }
    return false
}
*/

// XXX: Update this once the message contents are more stable!
export async function ticketBundleRemainderCanonicalDigest(
    m: TicketBundleRemainder
): Promise<Uint8Array> {
    let h = new sha384();
    // _, _ = h.Write(m.PublisherPublicKey.PublicKey)
    // _, _ = h.Write(m.EscrowPublicKey.PublicKey)
    h.update(addPuzzleInfoCanonicalDigest(m.getPuzzleInfo() as ColocationPuzzleInfo));
    let digest = h.digest();
    return new Uint8Array(digest);
}

// TODO: update the hasher directly
export function addPuzzleInfoCanonicalDigest(m: ColocationPuzzleInfo): Uint8Array {
    let data: number[] = [];

    data.push(...m.getGoal_asU8());
    data.push(...uint32ToLE(m.getRounds()));
    data.push(...uint64ToLE(m.getStartOffset()));
    data.push(...uint64ToLE(m.getStartRange()));

    return new Uint8Array(data);
}

export function ticketRequestCanonicalDigest(m: TicketRequest): Uint8Array {
    let h = new sha384();
    h.update(uint64ToLE(m.getBlockIdx()));
    h.update((m.getInnerKey() as BlockKey).getKey_asU8());
    h.update((m.getCachePublicKey() as PublicKey).getPublicKey_asU8());
    let digest = h.digest();
    return new Uint8Array(digest);
}

export function ticketL1CanonicalDigest(m: TicketL1): Uint8Array {
    let h = new sha384();
    h.update(uint64ToLE(m.getTicketNo()));
    h.update((m.getCachePublicKey() as PublicKey).getPublicKey_asU8());
    let digest = h.digest();
    return new Uint8Array(digest);
}

export async function ticketL2CanonicalDigest(m: TicketL2): Promise<Uint8Array> {
    let h = new sha384();
    h.update(m.getNonce_asU8());
    let digest = h.digest();
    return new Uint8Array(digest);
}

export async function encryptedTicketL2Digest(m: TicketL2Info): Promise<Uint8Array> {
    let h = new sha384();
    h.update(m.getEncryptedTicketL2_asU8());
    let digest = h.digest();
    return new Uint8Array(digest);
}
