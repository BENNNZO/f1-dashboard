import pako from 'pako';

export default function decodeZippedBase64(data) {
    // Decode Base64 to a binary string and convert it to a Uint8Array
    const binaryString = atob(data);
    const len = binaryString.length;
    const buffer = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
        buffer[i] = binaryString.charCodeAt(i);
    }

    // Decompress synchronously using pako's inflateRaw
    const decompressed = pako.inflateRaw(buffer);

    // Convert the decompressed Uint8Array to a string
    const decodedString = new TextDecoder().decode(decompressed);

    return decodedString;
}