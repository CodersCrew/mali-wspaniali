export function getChunks<T>(elements: T[], size: number): T[][] {
    return new Array(Math.ceil(elements.length / size))
        .fill(null)
        .map(() => elements.splice(0, size));
}
