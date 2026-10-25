import type { F1Message } from "./f1/connection"

export let currentData: Record<string, unknown> = {}

function updateDataStore(data: Record<string, unknown>) {
    currentData = deepMerge(currentData, data)
}

export function storeF1Message(message: F1Message) {
    if (message.type === "init") {
        currentData = message.data as Record<string, unknown>
    } else {
        updateDataStore({ [message.type]: message.data })
    }
}
// This function was made by AI lol way too in-depth for my brain atm.
function deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
    const output = { ...target }

    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach((key) => {
            if (isObject(source[key])) {
                if (key in target) {
                    output[key] = deepMerge(
                        target[key] as Record<string, unknown>,
                        source[key] as Record<string, unknown>,
                    )
                } else {
                    Object.assign(output, { [key]: source[key] })
                }
            } else {
                Object.assign(output, { [key]: source[key] })
            }
        })
    }

    return output
}

function isObject(item: unknown) {
    return item && typeof item === "object" && !Array.isArray(item)
}
