

export function convertToTitleCase(str: string) {
    // Use regular expression to split the string at each capital letter boundary
    // and join the resulting array with spaces
    return str.replace(/([A-Z])/g, ' $1').replace(/^./, str.charAt(0).toUpperCase());
}


export function convertObjectToArray(obj: any): [string, string][] {
    const result: [string, string][] = [];
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            result.push([convertToTitleCase(key), obj[key]]);
        }
    }
    return result;
}
