import React from 'react';
import { MockedResponse } from '@apollo/client/testing';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithMock } from '../../../utils/testing/renderWithMockedProvider';
import { TestResultsPage } from '../TestResultsPage';
import { awaitForRenderResponse } from '../../../utils/testing/awaitForResponse';
import { KINDERGARTENS } from '../../../operations/queries/Kindergartens/getKindergartens';
import { translationOf } from '../../../utils/testing/isTranslationOf';

describe('TestResultsPage', () => {
    describe('when there is no kindergartens', () => {
        beforeEach(async () => {
            renderPage(emptyKindergartenList);

            await awaitForRenderResponse();
        });

        it('returns no result notification', () => {
            expect(screen.getByTestId('no-results')).toHaveTextContent(translationOf('no-results'));
        });
    });

    describe('when there is at least one kindergarten', () => {
        beforeEach(async () => {
            renderPage(populatedKindergartenList);

            await awaitForRenderResponse();
        });

        it('returns kindergarten list', () => {
            expect(screen.queryAllByTestId('kindergarten-item').length).toEqual(1);
            expect(
                within(screen.queryAllByTestId('kindergarten-item')[0]).getByTestId('kindergarten-number'),
            ).toHaveTextContent(`${translationOf('test-results.kindergarten-prefix')} 1`);

            expect(
                within(screen.queryAllByTestId('kindergarten-item')[0]).getByTestId('kindergarten-name'),
            ).toHaveTextContent('my-name');

            expect(
                within(screen.queryAllByTestId('kindergarten-item')[0]).getByTestId('kindergarten-localization'),
            ).toHaveTextContent('my-address, my-city');
        });

        describe('once kindergarten item is clicked', () => {
            let editButton: HTMLElement;

            beforeEach(() => {
                editButton = within(screen.queryAllByTestId('kindergarten-item')[0])
                    .getByTestId('kindergarten-edit')
                    .querySelector('button')!;
            });

            it('opens edit kindergarten dialog', () => {
                expect(screen.queryByTestId('kindergarten-add-or-edit')).not.toBeInTheDocument();

                userEvent.click(editButton);

                expect(screen.queryByTestId('kindergarten-add-or-edit')).toBeInTheDocument();

                expect(
                    within(screen.queryByTestId('kindergarten-add-or-edit')!).getByTestId('modal-name'),
                ).toHaveTextContent(translationOf('edit-kindergarten-modal.title'));
            });

            it('opens edit dialog based on the specific kindergarten', () => {
                expect(screen.queryByTestId('kindergarten-add-or-edit')).not.toBeInTheDocument();

                userEvent.click(editButton);

                expect(screen.queryByTestId('kindergarten-add-or-edit')).toBeInTheDocument();

                expect(
                    within(screen.queryByTestId('kindergarten-add-or-edit')!).getByLabelText(
                        translationOf('test-results.kindergarten-number'),
                    ),
                ).toHaveAttribute('value', '1');
            });
        });
    });
});

function renderPage(mocks: MockedResponse[] = []) {
    return renderWithMock(mocks, <TestResultsPage />);
}

const emptyKindergartenList = [
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

const populatedKindergartenList = [
    {
        request: {
            query: KINDERGARTENS,
        },
        result: {
            data: {
                kindergartens: [
                    {
                        _id: 'my-id',
                        address: 'my-address',
                        city: 'my-city',
                        name: 'my-name',
                        number: 1,
                    },
                ],
            },
        },
    },
];
