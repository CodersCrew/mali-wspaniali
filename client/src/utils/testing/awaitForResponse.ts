import { act as actRender } from 'react-dom/test-utils';
import { act as actHook } from '@testing-library/react-hooks';

export function awaitForResponse(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 0));
}

export async function awaitForRenderResponse(): Promise<void> {
    return await actRender(async () => await awaitForResponse());
}

export async function awaitForHookResponse(): Promise<void> {
    return await actHook(async () => await awaitForResponse());
}
