import { act, render } from '@testing-library/react';

import { MainWrapper } from '@app/MainWrapper';

export function renderWithMock(component: JSX.Element) {
    return act(async () => {
        render(<MainWrapper>{component}</MainWrapper>);
    });
}
