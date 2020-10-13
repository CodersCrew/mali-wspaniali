import React from 'react';
import { render, screen, fireEvent, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
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
            page = renderPage(mocks);
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

    describe('kindergarten list', () => {
        describe('when list is loaded', () => {
            beforeEach(async () => {
                await act(async () => {
                    page = renderPage(mockedKindergartens);

                    await awaitForResponse();
                });
            });

            it('renders unchecked list', async () => {
                const rows = screen.queryAllByRole('row');

                expect(rows).toHaveLength(3);

                rows.forEach(row => {
                    const checkbox = row.querySelector('input[type=checkbox]');

                    expect(checkbox).not.toHaveAttribute('checked');
                });

                expect(rows[0]).toHaveTextContent(translationOf('add-test-view.kindergartens.kindergarten-name'));
                expect(rows[1]).toHaveTextContent('1/my-kindergarten');
                expect(rows[2]).toHaveTextContent('2/happy-meal');
            });

            describe('and one filtered with valid phrase', () => {
                it('renders partial list', async () => {
                    const searchField = screen.queryByTestId('search-field')?.querySelector('input')!;

                    act(() => {
                        fireEvent.change(searchField, { target: { value: 'meal' } });
                    });

                    const rows = screen.queryAllByRole('row');

                    expect(rows).toHaveLength(2);

                    expect(rows[0]).toHaveTextContent(translationOf('add-test-view.kindergartens.kindergarten-name'));
                    expect(rows[1]).toHaveTextContent('2/happy-meal');
                });
            });

            describe('and one filtered with', () => {
                describe('too short phrase', () => {
                    it('renders all kindergartens', async () => {
                        const searchField = screen.queryByTestId('search-field')?.querySelector('input')!;

                        act(() => {
                            fireEvent.change(searchField, { target: { value: 'mea' } });
                        });
    
                        const rows = screen.queryAllByRole('row');
    
                        expect(rows).toHaveLength(3);
    
                        expect(rows[0]).toHaveTextContent(translationOf('add-test-view.kindergartens.kindergarten-name'));
                        expect(rows[1]).toHaveTextContent('1/my-kindergarten');
                        expect(rows[2]).toHaveTextContent('2/happy-meal');
                    });
                });

                describe('not found phrase', () => {
                    it('renders empty list', () => {
                        const searchField = screen.queryByTestId('search-field')?.querySelector('input')!;

                        act(() => {
                            fireEvent.change(searchField, { target: { value: 'wrong-name' } });
                        });
    
                        const rows = screen.queryAllByRole('row');
    
                        expect(rows).toHaveLength(1);
                        expect(rows[0]).toHaveTextContent(translationOf('add-test-view.kindergartens.kindergarten-name'));
    
                    });
                });
            });
        });
    });

    describe('when executed', () => {
        describe('with valid data', () => {
            beforeEach(() => {
                page = renderPage(mocks);
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
                page = renderPage(mocks);
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

            describe('when no kindergarten is selected', () => {
                it('renders error information', () => {});
            });
        });
    });
});

function renderPage(mocks: MockedResponse[]) {
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

const mockedKindergartens = [
    {
        request: {
            query: KINDERGARTENS,
        },
        result: {
            data: {
                kindergartens: [
                    {
                        _id: 'my-id-1',
                        name: 'my-kindergarten',
                        number: 1,
                        address: 'unique-address',
                        city: 'my-city',
                    },
                    {
                        _id: 'my-id-2',
                        name: 'happy-meal',
                        number: 2,
                        address: 'my-street',
                        city: 'my-city',
                    },
                ],
            },
        },
    },
];
