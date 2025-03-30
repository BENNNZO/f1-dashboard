export let currentData = {

}

export function updateDataStore(data: any) {
    currentData = deepMerge(currentData, data)
    console.log("\n\nDATA:")
    console.log(data)
    // console.log("\n\nMERGED:")
    // console.log(currentData)
}
// This function was made by AI lol way to indepth for my brain atm.
function deepMerge(target: any, source: any) {
    const output = { ...target };

    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target)) {
                    Object.assign(output, { [key]: source[key] });
                } else {
                    output[key] = deepMerge(target[key], source[key]);
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