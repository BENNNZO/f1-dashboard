export default function deepMerge(target: Record<string, unknown> | null, source: Record<string, unknown>) {
    const newTarget = (target === null) ? {} : target
    const output = { ...newTarget };

    if (isObject(newTarget) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in newTarget)) {
                    Object.assign(output, { [key]: source[key] });
                } else {
                    output[key] = deepMerge(newTarget[key] as Record<string, unknown>, source[key] as Record<string, unknown>);
                }
            } else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }

    return output;
}

function isObject(item: unknown) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}