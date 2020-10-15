import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { I18nextProvider } from 'react-i18next';
import { AdminAddTestPage } from '../AdminAddTestPage';
import * as OpenSnackbar from '../../../components/Snackbar/openSnackbar';
import { CREATE_NEW_TEST } from '../../../operations/mutations/Test/createNewTest';
import { awaitForRenderResponse } from '../../../utils/testing/awaitForResponse';
import { translations } from '../../../internationalization/i18n';
import { translationOf } from '../../../utils/testing/isTranslationOf';
import { KINDERGARTENS } from '../../../operations/queries/Kindergartens/getKindergartens';

describe('AdminAddTestPage', () => {
    let openSnackbar: jasmine.Spy;

    describe('basic test information', () => {
        beforeEach(() => {
            renderPage(mocks);
            openSnackbar = spyOn(OpenSnackbar, 'openSnackbar');
        });

        it('renders test name input', async () => {
            const input = screen.getByTestId('test-name')!;

            expect(input).toBeInTheDocument()
        });
    });

    describe('kindergarten list', () => {
        describe('when list is loaded', () => {
            beforeEach(async () => {
                renderPage(mockedKindergartens);

                await awaitForRenderResponse();
            });

            it('renders unchecked list', async () => {
                const rows = screen.queryAllByRole('row');

                expect(rows).toHaveLength(3);

                rows.forEach(row => {
                    const checkbox = row.querySelector('.MuiCheckbox-root');
    
                    expect(checkbox).not.toHaveClass('Mui-checked');
                });

                expect(rows[0]).toHaveTextContent(translationOf('add-test-view.kindergartens.kindergarten-name'));
                expect(rows[1]).toHaveTextContent('1/my-kindergarten');
                expect(rows[2]).toHaveTextContent('2/happy-meal');
            });

            describe('and one filtered with valid phrase', () => {
                it('renders partial list', async () => {
                    changeSeachFieldInput('meal');


                    const rows = screen.queryAllByRole('row');

                    expect(rows).toHaveLength(2);

                    expect(rows[0]).toHaveTextContent(translationOf('add-test-view.kindergartens.kindergarten-name'));
                    expect(rows[1]).toHaveTextContent('2/happy-meal');
                });
            });

            describe('and one filtered with', () => {
                describe('too short phrase', () => {
                    it('renders all kindergartens', async () => {
                        changeSeachFieldInput('mea');
    
                        const rows = screen.queryAllByRole('row');
    
                        expect(rows).toHaveLength(3);
    
                        expect(rows[0]).toHaveTextContent(translationOf('add-test-view.kindergartens.kindergarten-name'));
                        expect(rows[1]).toHaveTextContent('1/my-kindergarten');
                        expect(rows[2]).toHaveTextContent('2/happy-meal');
                    });
                });

                describe('not found phrase', () => {
                    it('renders empty list', () => {
                        changeSeachFieldInput('wrong-name');
    
                        const rows = screen.queryAllByRole('row');
    
                        expect(rows).toHaveLength(1);
                        expect(rows[0]).toHaveTextContent(translationOf('add-test-view.kindergartens.kindergarten-name'));
    
                    });
                });
            });

            describe('and one clicked on the item', () => {
                let rows: HTMLElement[];

                it('selects the item', async () => {
                    rows = screen.queryAllByRole('row');

                    rows.forEach(row => {
                        const checkbox = row.querySelector('.MuiCheckbox-root');
    
                        expect(checkbox).not.toHaveClass('Mui-checked');
                    });

                    fireEvent.click(rows[1])

                    rows = screen.queryAllByRole('row');

                    expect(rows[0].querySelector('.MuiCheckbox-root')).not.toHaveClass('Mui-checked')
                    expect(rows[1].querySelector('.MuiCheckbox-root')).toHaveClass('Mui-checked')
                    expect(rows[2].querySelector('.MuiCheckbox-root')).not.toHaveClass('Mui-checked')
                });
            });

            describe('and one clicked on the item twice', () => {
                let rows: HTMLElement[];

                it('deselects the item', async () => {
                    rows = screen.queryAllByRole('row');

                    rows.forEach(row => {
                        const checkbox = row.querySelector('.MuiCheckbox-root');
    
                        expect(checkbox).not.toHaveClass('Mui-checked');
                    });

                    fireEvent.click(rows[1])
                    fireEvent.click(rows[1])

                    rows = screen.queryAllByRole('row');

                    expect(rows[0].querySelector('.MuiCheckbox-root')).not.toHaveClass('Mui-checked')
                    expect(rows[1].querySelector('.MuiCheckbox-root')).not.toHaveClass('Mui-checked')
                    expect(rows[2].querySelector('.MuiCheckbox-root')).not.toHaveClass('Mui-checked')
                });
            });
        });
    });

    describe('when executed', () => {
        describe('with valid data', () => {
            beforeEach(async () => {
                renderPage(mocks);

                await awaitForRenderResponse()

                openSnackbar = spyOn(OpenSnackbar, 'openSnackbar');
            });

            it('renders confirmation', async () => {
                changeTestNameInput('new-test')

                createTestButtonClick()
                
                await awaitForRenderResponse()
                await awaitForRenderResponse()

                expect(openSnackbar).toHaveBeenCalledWith({ text: translationOf('add-test-view.assessment-created') });
            });
        });

        describe('with invalid data', () => {
            beforeEach(async () => {
                renderPage(mocks);

                await awaitForRenderResponse()

                openSnackbar = spyOn(OpenSnackbar, 'openSnackbar');
            });

            it('renders error infromation', async () => {
                changeTestNameInput('nope')

                createTestButtonClick();

                await awaitForRenderResponse();
                await awaitForRenderResponse();

                expect(openSnackbar).toHaveBeenCalledWith({
                    text: translationOf('add-test-view.errors.name-too-short'),
                    severity: 'error',
                });
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

function createTestButtonClick() {
    const button = screen.getByTestId('create-button')!;

    fireEvent.click(button);
}

function changeTestNameInput(value: string) {
    const input = screen.getByTestId('test-name').querySelector('input')!;

    fireEvent.change(input, { target: { value } });

}

function changeSeachFieldInput(value: string) {
    const searchField = screen.queryByTestId('search-field')?.querySelector('input')!;


    fireEvent.change(searchField, { target: { value } });

}
