import React, { FC } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useAssessmentManager } from '../useAssessmentManager';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { CREATE_ASSESSMENT } from '../../../operations/mutations/Assessment/createAssessment';
import { awaitForHookResponse } from '../../../utils/testing/awaitForResponse';
import { translationOf } from '../../../utils/testing/isTranslationOf';
import { KINDERGARTENS } from '../../../operations/queries/Kindergartens/getKindergartens';
import { Kindergarten } from '../../../graphql/types';
import { formatDate } from '../../../utils/formatDate';

const TWO_MONTHS = 60 * 24 * 60 * 60 * 1000;

const startDate = new Date();
const endDate = new Date(startDate.getTime() + TWO_MONTHS);

const formatedStartDate = formatDate(startDate);
const formatedEndDate = formatDate(endDate);

describe('useAddTest', () => {
    let onSubmit: jest.Mock;

    describe('when basic information changes', () => {
        beforeEach(() => {
            onSubmit = jest.fn();
        });

        describe('with valid data', () => {
            it('changes the state', async () => {
                const { result } = renderHook(() => useAssessmentManager(undefined, onSubmit), {
                    wrapper: renderPage(mocks),
                });

                act(() => {
                    result.current.updateAssessment({
                        title: 'my-test',
                        startDate: formatedStartDate,
                        endDate: formatedEndDate,
                    });
                });

                expect(onSubmit).not.toHaveBeenCalled();

                await act(async () => {
                    result.current.submit();
                });

                await awaitForHookResponse();
                await awaitForHookResponse();

                expect(onSubmit).toHaveBeenCalledWith({
                    assessment: {
                        title: 'my-test',
                        startDate: formatedStartDate,
                        endDate: formatedEndDate,
                        kindergartenIds: [],
                        isOutdated: false,
                        isDeleted: false,
                    },
                    message: 'A new assesment has been created',
                });
            });
        });

        describe('with invalid data', () => {
            it('changes the state', async () => {
                const { result } = renderHook(() => useAssessmentManager(undefined, onSubmit), {
                    wrapper: renderPage(mocks),
                });

                act(() => {
                    result.current.updateAssessment({
                        title: 'my',
                        startDate: formatedStartDate,
                        endDate: formatedEndDate,
                        kindergartenIds: [],
                        isOutdated: false,
                    });
                });

                expect(onSubmit).not.toHaveBeenCalled();

                await act(async () => {
                    result.current.submit();
                });

                await awaitForHookResponse();

                expect(onSubmit).toHaveBeenCalledWith(
                    jasmine.objectContaining({ errors: translationOf('add-test-view.errors.name-too-short') }),
                );
            });
        });
    });

    describe('kindergarten list', () => {
        beforeEach(() => {
            onSubmit = jest.fn();
        });

        describe('when there is no kindergartens', () => {
            beforeEach(() => {
                onSubmit = jest.fn();
            });

            let kindergartens: Array<{ kindergarten: Kindergarten; selected: boolean }>;

            it('returns empty list', async () => {
                const { result } = renderHook(() => useAssessmentManager(undefined, onSubmit), {
                    wrapper: renderPage(mocks),
                });

                await awaitForHookResponse();

                await act(async () => {
                    kindergartens = result.current.kindergartens;
                });

                expect(kindergartens).toEqual([]);
            });
        });

        describe('when there are kindergartens', () => {
            let kindergartens: Array<{ kindergarten: Kindergarten; selected: boolean }>;

            it('returns list', async () => {
                const { result } = renderHook(() => useAssessmentManager(undefined, onSubmit), {
                    wrapper: renderPage(mockedKindergartens),
                });

                await awaitForHookResponse();

                await act(async () => {
                    kindergartens = result.current.kindergartens;
                });

                expect(kindergartens).toEqual([
                    {
                        kindergarten: {
                            _id: 'my-id-1',
                            name: 'my-kindergarten',
                            number: 1,
                            address: 'unique-address',
                            city: 'my-city',
                        },
                        selected: false,
                    },
                    {
                        kindergarten: {
                            _id: 'my-id-2',
                            name: 'happy-meal',
                            number: 2,
                            address: 'my-street',
                            city: 'my-city',
                        },
                        selected: false,
                    },
                ]);
            });
        });

        describe('when kindergarten is selected', () => {
            let kindergartens: Array<{ kindergarten: Kindergarten; selected: boolean }>;

            it('returns list', async () => {
                const { result } = renderHook(() => useAssessmentManager(undefined, onSubmit), {
                    wrapper: renderPage(mockedKindergartens),
                });

                await awaitForHookResponse();

                await act(async () => {
                    kindergartens = result.current.kindergartens;
                });

                expect(kindergartens).toEqual([
                    {
                        kindergarten: {
                            _id: 'my-id-1',
                            name: 'my-kindergarten',
                            number: 1,
                            address: 'unique-address',
                            city: 'my-city',
                        },
                        selected: false,
                    },
                    {
                        kindergarten: {
                            _id: 'my-id-2',
                            name: 'happy-meal',
                            number: 2,
                            address: 'my-street',
                            city: 'my-city',
                        },
                        selected: false,
                    },
                ]);

                await act(async () => {
                    result.current.updateAssessment({ kindergartenIds: ['my-id-2'] });
                });

                await awaitForHookResponse();

                kindergartens = result.current.kindergartens;

                expect(kindergartens).toEqual([
                    {
                        kindergarten: {
                            _id: 'my-id-1',
                            name: 'my-kindergarten',
                            number: 1,
                            address: 'unique-address',
                            city: 'my-city',
                        },
                        selected: false,
                    },
                    {
                        kindergarten: {
                            _id: 'my-id-2',
                            name: 'happy-meal',
                            number: 2,
                            address: 'my-street',
                            city: 'my-city',
                        },
                        selected: true,
                    },
                ]);
            });
        });

        describe('when kindergarten is selected twice', () => {
            let kindergartens: Array<{ kindergarten: Kindergarten; selected: boolean }>;

            it('returns list', async () => {
                const { result } = renderHook(() => useAssessmentManager(undefined, onSubmit), {
                    wrapper: renderPage(mockedKindergartens),
                });

                await act(async () => {
                    await awaitForHookResponse();

                    kindergartens = result.current.kindergartens;
                });

                expect(kindergartens).toEqual([
                    {
                        kindergarten: {
                            _id: 'my-id-1',
                            name: 'my-kindergarten',
                            number: 1,
                            address: 'unique-address',
                            city: 'my-city',
                        },
                        selected: false,
                    },
                    {
                        kindergarten: {
                            _id: 'my-id-2',
                            name: 'happy-meal',
                            number: 2,
                            address: 'my-street',
                            city: 'my-city',
                        },
                        selected: false,
                    },
                ]);

                await act(async () => {
                    result.current.updateAssessment({ kindergartenIds: ['my-id-2'] });

                    await awaitForHookResponse();

                    result.current.updateAssessment({ kindergartenIds: ['my-id-2'] });

                    await awaitForHookResponse();

                    kindergartens = result.current.kindergartens;
                });

                expect(kindergartens).toEqual([
                    {
                        kindergarten: {
                            _id: 'my-id-1',
                            name: 'my-kindergarten',
                            number: 1,
                            address: 'unique-address',
                            city: 'my-city',
                        },
                        selected: false,
                    },
                    {
                        kindergarten: {
                            _id: 'my-id-2',
                            name: 'happy-meal',
                            number: 2,
                            address: 'my-street',
                            city: 'my-city',
                        },
                        selected: true,
                    },
                ]);
            });
        });
    });
});

const renderPage = (mocks: MockedResponse[]): FC => ({ children }) => {
    return (
        <MockedProvider mocks={mocks} addTypename={false}>
            <div>{children}</div>
        </MockedProvider>
    );
};

const mocks = [
    {
        request: {
            query: CREATE_ASSESSMENT,
            variables: {
                title: 'my-test',
                startDate: formatedStartDate,
                endDate: formatedEndDate,
                kindergartenIds: [],
            },
        },
        result: () => {
            return {
                data: {
                    createAssessment: { status: true },
                },
            };
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
