export default function deepMerge(target: any, source: any) {
    const newTarget = (target === null) ? {} : target
    const output = { ...newTarget };

    if (isObject(newTarget) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in newTarget)) {
                    Object.assign(output, { [key]: source[key] });
                } else {
                    output[key] = deepMerge(newTarget[key], source[key]);
                }
            } else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }

    return output;
}

function isObject(item: any) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}