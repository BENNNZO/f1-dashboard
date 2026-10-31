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

    if (suffix) return slicedString.padEnd(length, suffix)
    if (prefix) return slicedString.padStart(length, prefix)
    return slicedString
}
