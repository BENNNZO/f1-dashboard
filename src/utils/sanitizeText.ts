type SanitizeTextOptions = {
    length: number
    fallback?: string
} & ({ suffix?: string; prefix?: never } | { prefix?: string; suffix?: never })

export default function sanitizeText(
    text: string | number | undefined,
    { length, fallback, suffix, prefix }: SanitizeTextOptions,
) {
    if (fallback) {
        if (fallback.trim().length !== length) throw new Error("Fallback's length must match length argument.")
        if (!text || text === "") return fallback
    }

    const string = String(text == null || Number.isNaN(text) ? "" : text).trim()
    const slicedString = string.slice(0, length)
    const lengthOffset = length - slicedString.length

    if (lengthOffset === 0) return slicedString
    if (suffix) return [slicedString, ...Array(lengthOffset).fill(suffix)].join("")
    if (prefix) return [...Array(lengthOffset).fill(prefix), slicedString].join("")
    return slicedString
}
