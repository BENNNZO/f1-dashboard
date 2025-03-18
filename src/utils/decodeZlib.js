import zlib from 'zlib';

export default async function decodeZippedBase64(data) {
    const buffer = Buffer.from(data, "base64"); // Decode Base64
    return new Promise((resolve, reject) => {
        zlib.inflateRaw(buffer, (err, result) => { // Decompress zlib
            if (err) reject(err);
            else resolve(result.toString());
        });
    });
}