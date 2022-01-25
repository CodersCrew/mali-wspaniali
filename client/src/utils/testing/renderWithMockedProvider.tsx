import { Suspense } from 'react';
import { act, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { StylesProvider } from '@material-ui/core';

import { translation } from '@app/internationalization/i18n';
import createGenerateClassName from '@app/classNameGenerator';
import { ThemeProvider } from '@app/theme';
import { ApolloProvider } from '@apollo/client';
import { client } from '@app/apollo_client';

export function renderWithMock(component: JSX.Element) {
    const generateClassName = createGenerateClassName();

    return act(async () => {
        render(
            <ApolloProvider client={client}>
                <I18nextProvider i18n={translation}>
                    <StylesProvider generateClassName={generateClassName}>
                        <ThemeProvider>
                            <Suspense fallback={null}>
                                <Router>{component}</Router>
                            </Suspense>
                        </ThemeProvider>
                    </StylesProvider>
                </I18nextProvider>
            </ApolloProvider>,
        );
    });
}
