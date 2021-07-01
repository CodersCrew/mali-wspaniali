import { act as actHook } from '@testing-library/react-hooks';
import TestRenderer from 'react-test-renderer';

export function awaitForResponse(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 0));
}

export function awaitForRenderResponse(): Promise<void> {
    return TestRenderer.act(() => awaitForResponse());
}

export function awaitForHookResponse(): Promise<void> {
    return actHook(() => awaitForResponse());
}
