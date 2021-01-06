import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { MockedResponse } from '@apollo/client/testing';

import { AdminManageSingleAssessmentPage } from '../AdminManageSingleAssessmentPage';
import * as OpenSnackbar from '../../../components/Snackbar/openSnackbar';
import { CREATE_ASSESSMENT } from '../../../operations/mutations/Assessment/createAssessment';
import { awaitForRenderResponse } from '../../../utils/testing/awaitForResponse';
import { translationOf } from '../../../utils/testing/isTranslationOf';
import { KINDERGARTENS } from '../../../operations/queries/Kindergartens/getKindergartens';
import { formatDate } from '../../../utils/formatDate';
import { renderWithMock } from '../../../utils/testing/renderWithMockedProvider';
import { GET_ALL_ASSESSMENTS } from '../../../operations/queries/Assessment/getAllAssessments';

const TWO_MONTHS = 60 * 24 * 60 * 60 * 1000;

const startDate = new Date();
const endDate = new Date(startDate.getTime() + TWO_MONTHS);

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useParams: () => ({}),
    useHistory: () => ({
        push: () => {},
        location: {
            pathname: '/add',
        },
    }),
}));

describe('AdminAddTestPage', () => {
    let openSnackbar: jasmine.Spy;

    describe('basic test information', () => {
        beforeEach(async () => {
            renderPage(mocks);

            await awaitForRenderResponse();

            openSnackbar = spyOn(OpenSnackbar, 'openSnackbar');
        });

        it('renders test name input', async () => {
            const input = screen.getByTestId('test-name')!;

            expect(input).toBeInTheDocument();
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

                rows.forEach((row) => {
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

                        expect(rows[0]).toHaveTextContent(
                            translationOf('add-test-view.kindergartens.kindergarten-name'),
                        );
                        expect(rows[1]).toHaveTextContent('1/my-kindergarten');
                        expect(rows[2]).toHaveTextContent('2/happy-meal');
                    });
                });

                describe('not found phrase', () => {
                    it('renders empty list', () => {
                        changeSeachFieldInput('wrong-name');

                        const rows = screen.queryAllByRole('row');

                        expect(rows).toHaveLength(1);
                        expect(rows[0]).toHaveTextContent(
                            translationOf('add-test-view.kindergartens.kindergarten-name'),
                        );
                    });
                });
            });

            describe('and one clicked on the item', () => {
                let rows: HTMLElement[];

                it('selects the item', async () => {
                    rows = screen.queryAllByRole('row');

                    rows.forEach((row) => {
                        const checkbox = row.querySelector('.MuiCheckbox-root');

                        expect(checkbox).not.toHaveClass('Mui-checked');
                    });

                    fireEvent.click(rows[1]);

                    await awaitForRenderResponse();

                    rows = screen.queryAllByRole('row');

                    expect(rows[0].querySelector('.MuiCheckbox-root')).not.toHaveClass('Mui-checked');
                    expect(rows[1].querySelector('.MuiCheckbox-root')).toHaveClass('Mui-checked');
                    expect(rows[2].querySelector('.MuiCheckbox-root')).not.toHaveClass('Mui-checked');
                });
            });

            describe('and one clicked on the item twice', () => {
                let rows: HTMLElement[];

                it('deselects the item', async () => {
                    rows = screen.queryAllByRole('row');

                    rows.forEach((row) => {
                        const checkbox = row.querySelector('.MuiCheckbox-root');

                        expect(checkbox).not.toHaveClass('Mui-checked');
                    });

                    fireEvent.click(rows[1]);
                    fireEvent.click(rows[1]);

                    await awaitForRenderResponse();

                    rows = screen.queryAllByRole('row');

                    expect(rows[0].querySelector('.MuiCheckbox-root')).not.toHaveClass('Mui-checked');
                    expect(rows[1].querySelector('.MuiCheckbox-root')).not.toHaveClass('Mui-checked');
                    expect(rows[2].querySelector('.MuiCheckbox-root')).not.toHaveClass('Mui-checked');
                });
            });

            describe('when "select all"', () => {
                let rows: HTMLElement[];

                describe('is clicked', () => {
                    it('renders all checked items', async () => {
                        rows = screen.queryAllByRole('row');

                        rows.forEach((row) => {
                            const checkbox = row.querySelector('.MuiCheckbox-root');

                            expect(checkbox).not.toHaveClass('Mui-checked');
                        });

                        selectAllClick();

                        await awaitForRenderResponse();

                        rows.forEach((row) => {
                            const checkbox = row.querySelector('.MuiCheckbox-root');

                            expect(checkbox).toHaveClass('Mui-checked');
                        });
                    });
                });

                describe('is clicked twice', () => {
                    it('renders all unchecked items', async () => {
                        rows = screen.queryAllByRole('row');

                        rows.forEach((row) => {
                            const checkbox = row.querySelector('.MuiCheckbox-root');

                            expect(checkbox).not.toHaveClass('Mui-checked');
                        });

                        selectAllClick();
                        selectAllClick();

                        await awaitForRenderResponse();

                        rows.forEach((row) => {
                            const checkbox = row.querySelector('.MuiCheckbox-root');

                            expect(checkbox).not.toHaveClass('Mui-checked');
                        });
                    });
                });
            });
        });
    });

    describe('when executed', () => {
        describe('with valid data', () => {
            beforeEach(async () => {
                renderPage(mocks);

                await awaitForRenderResponse();

                openSnackbar = spyOn(OpenSnackbar, 'openSnackbar');

                openSnackbar.and.returnValue(Promise.resolve({ close: true }));
            });

            it('renders confirmation', async () => {
                changeTestNameInput('new-test');

                await awaitForRenderResponse();

                createTestButtonClick();

                await awaitForRenderResponse();
                await awaitForRenderResponse();

                expect(openSnackbar).toHaveBeenCalledWith({ text: translationOf('add-test-view.assessment-created') });
            });
        });

        describe('with invalid data', () => {
            beforeEach(async () => {
                renderPage(mocks);

                await awaitForRenderResponse();

                openSnackbar = spyOn(OpenSnackbar, 'openSnackbar');
            });

            it('disables submit button', async () => {
                changeTestNameInput('nope');

                await awaitForRenderResponse();

                const submitButton = getSubmitButton();
                const submitTooltip = screen.getByRole('tooltip');

                createTestButtonClick();

                await awaitForRenderResponse();
                await awaitForRenderResponse();

                expect(openSnackbar).toHaveBeenCalledTimes(0);
                expect(submitButton).toHaveClass('Mui-disabled');
                expect(submitTooltip).toHaveAttribute('title', translationOf('add-test-view.errors.name-too-short'));
            });
        });
    });
});

function renderPage(mocks: MockedResponse[]) {
    return renderWithMock(mocks, <AdminManageSingleAssessmentPage />);
}

const mocks = [
    {
        request: {
            query: CREATE_ASSESSMENT,
            variables: {
                assessment: {
                    title: 'new-test',
                    startDate: formatDate(startDate),
                    endDate: formatDate(endDate),
                    firstMeasurementStartDate: formatDate(startDate),
                    firstMeasurementEndDate: formatDate(endDate),
                    lastMeasurementStartDate: formatDate(startDate),
                    lastMeasurementEndDate: formatDate(endDate),
                    kindergartenIds: [],
                },
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
            query: GET_ALL_ASSESSMENTS,
            variables: {},
        },
        result: {
            data: {
                assessments: [
                    {
                        _id: '1',
                        isOutdated: false,
                        isDeleted: false,
                        title: 'test-assessment1',
                        startDate: '2000-01-01',
                        endDate: '2000-01-31',
                        status: 'active',
                        kindergartens: [
                            {
                                kindergarten: {
                                    _id: '1',
                                    name: 'test-kindergarten1',
                                    number: 1,
                                },
                                instructor: {
                                    _id: '1',
                                    mail: 'test-instructor1@gmail.com',
                                },
                            },
                        ],
                    },
                ],
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
    {
        request: {
            query: GET_ALL_ASSESSMENTS,
            variables: {},
        },
        result: {
            data: {
                assessments: [
                    {
                        _id: '1',
                        isOutdated: false,
                        isDeleted: false,
                        title: 'test-assessment1',
                        startDate: '2000-01-01',
                        endDate: '2000-01-31',
                        status: 'active',
                        kindergartens: [
                            {
                                kindergarten: {
                                    _id: '1',
                                    name: 'test-kindergarten1',
                                    number: 1,
                                },
                                instructor: {
                                    _id: '1',
                                    mail: 'test-instructor1@gmail.com',
                                },
                            },
                        ],
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

function selectAllClick() {
    const selectAll = screen.getByTestId('select-all');

    userEvent.click(selectAll);
}

function getSubmitButton() {
    const button = screen.getByTestId('create-button')!;

    return button;
}
