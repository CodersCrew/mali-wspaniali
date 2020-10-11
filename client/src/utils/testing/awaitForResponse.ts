export function awaitForResponse(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 0));
}
