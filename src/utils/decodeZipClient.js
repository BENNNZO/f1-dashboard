import pako from 'pako';

export default function decodeZippedBase64(base64String) {
    // Convert Base64 to binary data
    const binaryString = atob(base64String);
    const binaryArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        binaryArray[i] = binaryString.charCodeAt(i);
    }
    
    // Decompress using pako (ensure pako is included in your project)
    const decompressed = pako.inflate(binaryArray);
    
    // Convert Uint8Array to string
    return new TextDecoder("utf-8").decode(decompressed);
}