export function pick(object: Object = {}, keys: string[] = []) {

    const result = {};

    keys.forEach(key => {
        result[key] = object[key];
    })

    return result;
}
