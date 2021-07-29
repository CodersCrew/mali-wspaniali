export function addOrDeleteFromArray(values: string[], newValue: string) {
    if (values.includes(newValue)) {
        return values.filter((v) => v !== newValue);
    }

    return [...values, newValue];
}
