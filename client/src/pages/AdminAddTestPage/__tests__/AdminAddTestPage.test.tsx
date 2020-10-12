import React from 'react';
import { render, screen, fireEvent, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MockedProvider } from '@apollo/client/testing';
import { I18nextProvider } from 'react-i18next';
import { act } from 'react-dom/test-utils';
import { AdminAddTestPage } from '../AdminAddTestPage';
import * as OpenSnackbar from '../../../components/Snackbar/openSnackbar';
import { CREATE_NEW_TEST } from '../../../operations/mutations/Test/createNewTest';
import { awaitForResponse } from '../../../utils/testing/awaitForResponse';
import { translations } from '../../../internationalization/i18n';
import { translationOf } from '../../../utils/testing/isTranslationOf';
import { KINDERGARTENS } from '../../../operations/queries/Kindergartens/getKindergartens';

describe('AdminAddTestPage', () => {
    let page: RenderResult;
    let openSnackbar: jasmine.Spy;

    describe('basic test information', () => {
        beforeEach(() => {
            page = renderPage();
            openSnackbar = spyOn(OpenSnackbar, 'openSnackbar');
        });

        it('renders test name input', async () => {
            const { container } = page;

            const input = container.querySelector('#test-name')!;
            const inputLabel = container.querySelector('#test-name-label');

            expect(input).toBeDefined();
            expect(inputLabel).toBeDefined();
        });
    });

    describe('when executed', () => {
        describe('with valid data', () => {
            beforeEach(() => {
                page = renderPage();
                openSnackbar = spyOn(OpenSnackbar, 'openSnackbar');
            });

            it('renders confirmation', async () => {
                const { container } = page;

                const input = container.querySelector('#test-name')!;
                const button = container.querySelector('#create-button')!;

                act(() => {
                    fireEvent.change(input, { target: { value: 'new-test' } });
                });

                await act(async () => {
                    fireEvent.click(button);

                    await awaitForResponse();
                    await awaitForResponse();
                });

                expect(openSnackbar).toHaveBeenCalledWith({ text: translationOf('add-test-view.assessment-created') });
            });
        });

        describe('with invalid data', () => {
            beforeEach(() => {
                page = renderPage();
                openSnackbar = spyOn(OpenSnackbar, 'openSnackbar');
            });

            it('renders error infromation', async () => {
                const { container } = page;

                const input = container.querySelector('#test-name')!;
                const button = container.querySelector('#create-button')!;

                act(() => {
                    fireEvent.change(input, { target: { value: 'nope' } });
                });

                await act(async () => {
                    fireEvent.click(button);

                    await awaitForResponse();
                    await awaitForResponse();
                });

                expect(openSnackbar).toHaveBeenCalledWith({
                    text: translationOf('add-test-view.errors.name-too-short'),
                    severity: 'error',
                });
            });
        });
    });
});

function renderPage() {
    return render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <I18nextProvider i18n={translations}>
                <AdminAddTestPage />
            </I18nextProvider>
        </MockedProvider>,
    );
}

const mocks = [
    {
        request: {
            query: CREATE_NEW_TEST,
            variables: {
                title: 'new-test',
            },
        },
        result: {
            data: {
                createAssessment: { status: true },
            },
        },
    },
    {
        request: {
            query: KINDERGARTENS,
        },
        result: {
            data: {
                kindergartens: [],
            },
        },
    },
];
