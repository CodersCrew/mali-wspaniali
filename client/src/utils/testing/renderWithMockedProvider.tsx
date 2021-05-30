import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';

import { translation } from '../../internationalization/i18n';

export function renderWithMock(mocks: ReadonlyArray<MockedResponse>, component: JSX.Element) {
    return render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <I18nextProvider i18n={translation}>{component}</I18nextProvider>
        </MockedProvider>,
    );
}
