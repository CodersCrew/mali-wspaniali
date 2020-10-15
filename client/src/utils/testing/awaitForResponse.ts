import { act as actRender } from 'react-dom/test-utils';
export function awaitForResponse(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 0));
}

export async function awaitForRenderResponse(): Promise<void> {
    return await actRender(async () => await awaitForResponse());
}
}
