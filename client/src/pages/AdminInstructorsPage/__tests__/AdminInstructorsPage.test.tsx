import React from 'react';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedResponse } from '@apollo/client/testing';
import { AdminInstructorsPage } from '../AdminInstructorsPage';
import { awaitForRenderResponse } from '../../../utils/testing/awaitForResponse';
import { translationOf } from '../../../utils/testing/isTranslationOf';
import { INSTRUCTORS } from '../../../operations/queries/Users/getUsersByRole';
import { GET_ALL_ASSESSMENTS } from '../../../operations/queries/Assessment/getAllAssessments';
import { renderWithMock } from '../../../utils/testing/renderWithMockedProvider';

const populatedMockedResponse: MockedResponse[] = [
    {
        request: {
            query: INSTRUCTORS,
        },
        result: {
            data: {
                users: [
                    {
                        _id: '1',
                        mail: 'test-instructor1@gmail.com',
                        date: '2000-01-01',
                        role: 'instructor',
                    },
                    {
                        _id: '2',
                        mail: 'test-instructor2@gmail.com',
                        date: '2000-01-01',
                        role: 'instructor',
                    },
                ],
            },
        },
    },
    {
        request: {
            query: GET_ALL_ASSESSMENTS,
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
                        firstMeasurementStartDate: '2000-01-01',
                        firstMeasurementEndDate: '2000-01-31',
                        lastMeasurementStartDate: '2000-01-01',
                        lastMeasurementEndDate: '2000-01-31',
                        status: 'active',
                        firstMeasurementStatus: 'active',
                        lastMeasurementStatus: 'active',
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
                    {
                        _id: '2',
                        isOutdated: false,
                        isDeleted: false,
                        title: 'test-assessment2',
                        startDate: '2000-01-01',
                        endDate: '2000-01-31',
                        firstMeasurementStartDate: '2000-01-01',
                        firstMeasurementEndDate: '2000-01-31',
                        lastMeasurementStartDate: '2000-01-01',
                        lastMeasurementEndDate: '2000-01-31',
                        status: 'active',
                        firstMeasurementStatus: 'active',
                        lastMeasurementStatus: 'active',
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
                            {
                                kindergarten: {
                                    _id: '2',
                                    name: 'test-kindergarten2',
                                    number: 2,
                                },
                                instructor: null,
                            },
                        ],
                    },
                ],
            },
        },
    },
];

const renderPage = (mocks: MockedResponse[]) => renderWithMock(mocks, <AdminInstructorsPage />);

describe('AdminInstructorsPage', () => {
    beforeEach(async () => {
        renderPage(populatedMockedResponse);
        await awaitForRenderResponse();
    });

    it('renders the table with all instructors', () => {
        const instructorRows = screen.getAllByTestId('instructor-item');

        expect(instructorRows).toHaveLength(2);
    });

    describe('toolbar', () => {
        it('renders assessmentsSelect with proper options', () => {
            const assessmentsSelect = screen.getByLabelText(
                translationOf('admin-instructors-page.table-toolbar.select-test'),
            );

            expect(assessmentsSelect).toBeInTheDocument();

            userEvent.click(assessmentsSelect);

            const assessmentsSelectOptions = screen.getAllByRole('option');

            expect(assessmentsSelectOptions[0]).toHaveTextContent('test-assessment1');
            expect(assessmentsSelectOptions[1]).toHaveTextContent('test-assessment2');
        });

        it('renders instructorsSelect with proper options', () => {
            const instructorsSelect = screen.getByLabelText(
                translationOf('admin-instructors-page.table-toolbar.instructor-search'),
            );

            expect(instructorsSelect).toBeInTheDocument();

            userEvent.click(instructorsSelect);

            const instructorsSelectOptions = screen.getAllByRole('option');

            expect(instructorsSelectOptions[0]).toHaveTextContent('test-instructor1@gmail.com');
            expect(instructorsSelectOptions[1]).toHaveTextContent('test-instructor2@gmail.com');
        });

        it('renders unassigned kindergartens text with proper count', () => {
            const unassignedKindergartensText = screen.getByTestId('unassigned-kindergartens');

            expect(unassignedKindergartensText).toHaveTextContent(
                `${translationOf('admin-instructors-page.table-toolbar.unassigned-kindergartens')}: 0`,
            );

            const assessmentsSelect = screen.getByLabelText(
                translationOf('admin-instructors-page.table-toolbar.select-test'),
            );

            userEvent.click(assessmentsSelect);
            const assessmentsSelectOptions = screen.getAllByRole('option');
            userEvent.click(assessmentsSelectOptions[1]);

            expect(unassignedKindergartensText).toHaveTextContent(
                `${translationOf('admin-instructors-page.table-toolbar.unassigned-kindergartens')}: 1`,
            );
        });
    });

    describe('info button', () => {
        it('opens info snackbar with proper text', () => {
            const infoButton = screen.getByLabelText('info');
            userEvent.click(infoButton);

            const infoSnackbar = screen.getByRole('alert');
            expect(infoSnackbar).toHaveTextContent(translationOf('admin-instructors-page.snackbars.info'));
        });
    });

    describe('instructors table row', () => {
        let instructorRows: HTMLElement[] = [];

        beforeEach(() => {
            instructorRows = screen.getAllByTestId('instructor-item');
        });

        it('renders proper email address within e-mail column', () => {
            expect(within(instructorRows[0]).getByTestId('instructor-mail')).toHaveTextContent(
                'test-instructor1@gmail.com',
            );
        });

        it('renders assign instructor button on hover', () => {
            expect(screen.queryByLabelText('assign instructor')).not.toBeInTheDocument();

            userEvent.hover(instructorRows[0]);

            expect(screen.queryByLabelText('assign instructor')).toBeInTheDocument();
        });
    });
});
