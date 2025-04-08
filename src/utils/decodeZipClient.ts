import { inflateRaw } from "pako";

export default async function decodeZippedBase64(data: any) {
    const buffer = Uint8Array.from(atob(data), c => c.charCodeAt(0));
    const result = inflateRaw(buffer);
    return new TextDecoder().decode(result);
}