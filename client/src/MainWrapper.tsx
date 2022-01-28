import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { Quill } from 'react-quill';

import './internationalization/i18n';
import ImageResize from 'quill-image-resize-module-react';

import { client } from './apollo_client';
import { CssBaseline, StylesProvider } from '@material-ui/core';
import { Suspense } from 'react';
import { ThemeProvider } from '@app/theme';
import createGenerateClassName from './classNameGenerator';

Quill.register('modules/imageResize', ImageResize);

const generateClassName = createGenerateClassName();

export function MainWrapper({ children }: { children: React.ReactNode }) {
    return (
        <ApolloProvider client={client}>
            <StylesProvider generateClassName={generateClassName}>
                <ThemeProvider>
                    <CssBaseline />
                    <Suspense fallback={null}>
                        <Router>{children}</Router>
                    </Suspense>
                </ThemeProvider>
            </StylesProvider>
        </ApolloProvider>
    );
}
