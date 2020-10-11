export async function awaitForResponse() {
    return await new Promise(resolve => setTimeout(resolve, 0));
}
