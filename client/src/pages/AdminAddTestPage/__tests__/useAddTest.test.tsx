import React, { FC } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { useAssessmentManager } from '../useAssessmentManager';
import { CREATE_ASSESSMENT } from '../../../operations/mutations/Assessment/createAssessment';
import { awaitForHookResponse } from '../../../utils/testing/awaitForResponse';
import { translationOf } from '../../../utils/testing/isTranslationOf';
import { KINDERGARTENS } from '../../../operations/queries/Kindergartens/getKindergartens';
import { Kindergarten } from '../../../graphql/types';
import { GET_ALL_ASSESSMENTS } from '../../../operations/queries/Assessment/getAllAssessments';

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
                        firstMeasurementEndDate: '2021-7-3',
                        firstMeasurementStartDate: '2021-6-1',
                        firstMeasurementStatus: 'active',
                        lastMeasurementEndDate: '2021-7-3',
                        lastMeasurementStartDate: '2021-6-1',
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
                        status: 'active',
                        firstMeasurementEndDate: '2021-7-3',
                        firstMeasurementStartDate: '2021-6-1',
                        firstMeasurementStatus: 'active',
                        lastMeasurementEndDate: '2021-7-3',
                        lastMeasurementStartDate: '2021-6-1',
                        lastMeasurementStatus: 'active',
                        kindergartenIds: [],
                        isOutdated: false,
                        isDeleted: false,
                    },
                    message: 'A new test has been created',
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
                        startDate: '2021-6-1',
                        endDate: '2021-7-3',
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
                    expect.objectContaining({ errors: translationOf('add-test-view.errors.name-too-short') }),
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

const renderPage =
    (mocks: MockedResponse[]): FC =>
        ({ children }) => {
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
                assessment: {
                    title: 'my-test',
                    firstMeasurementStartDate: '2021-6-1',
                    firstMeasurementEndDate: '2021-7-3',
                    lastMeasurementStartDate: '2021-6-1',
                    lastMeasurementEndDate: '2021-7-3',
                    status: 'active',
                    firstMeasurementStatus: 'active',
                    lastMeasurementStatus: 'active',
                    kindergartenIds: [],
                },
            },
        },
        result: {
            data: {
                createAssessment: {
                    _id: '1',
                    isOutdated: false,
                    isDeleted: false,
                    title: 'my-test',
                    firstMeasurementStartDate: '2021-6-1',
                    firstMeasurementEndDate: '2021-7-3',
                    lastMeasurementStartDate: '2021-6-1',
                    lastMeasurementEndDate: '2021-7-3',
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
                        firstMeasurementEndDate: '2021-7-3',
                        firstMeasurementStartDate: '2021-6-1',
                        lastMeasurementEndDate: '2021-7-3',
                        lastMeasurementStartDate: '2021-6-1',
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
                ],
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
                        startDate: '2021-6-1',
                        endDate: '2021-7-3',
                        firstMeasurementEndDate: '2021-7-3',
                        firstMeasurementStartDate: '2021-6-1',
                        lastMeasurementEndDate: '2021-7-3',
                        lastMeasurementStartDate: '2021-6-1',
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
                ],
            },
        },
    },
];
