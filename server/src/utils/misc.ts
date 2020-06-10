export function isString(value: any): value is string {
    return typeof value === 'string';
}

export function isEmail(value: any): value is string {
    if (!(isString(value))) {
        return false;
    }

    return value.includes('@');
}
