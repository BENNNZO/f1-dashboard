export default function deepMerge(target: unknown, source: unknown): unknown {
    if (!isObject(source)) return source

    if (Array.isArray(target)) {
        const output = [...target]

        for (const [key, value] of Object.entries(source)) {
            output[Number(key)] = deepMerge(output[Number(key)], value)
        }

        return output
    }

    const deleted = Array.isArray(source._deleted) ? source._deleted : []
    const output: Record<string, unknown> = {}

    for (const [key, value] of Object.entries(isObject(target) ? target : {})) {
        if (!deleted.includes(key)) output[key] = value
    }

    for (const [key, value] of Object.entries(source)) {
        if (key !== "_deleted") output[key] = deepMerge(output[key], value)
    }

    return output
}

function isObject(item: unknown): item is Record<string, unknown> {
    return typeof item === "object" && item !== null && !Array.isArray(item)
}
