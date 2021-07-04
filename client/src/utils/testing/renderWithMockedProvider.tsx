import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import TestRenderer from 'react-test-renderer';
import { I18nextProvider } from 'react-i18next';

import { translation } from '../../internationalization/i18n';

export function renderWithMock(mocks: ReadonlyArray<MockedResponse>, component: JSX.Element) {
    let renderResult;

    TestRenderer.act(() => {
        renderResult = TestRenderer.create(
            <MockedProvider mocks={mocks} addTypename={false}>
                <I18nextProvider i18n={translation}>{component}</I18nextProvider>
            </MockedProvider>,
        );
    });

    return renderResult;
}
