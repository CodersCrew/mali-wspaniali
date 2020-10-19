import React, { FC } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useAddTest } from '../useAddTest';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { CREATE_NEW_TEST } from '../../../operations/mutations/Test/createNewTest';
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
                const { result } = renderHook(() => useAddTest(onSubmit), { wrapper: renderPage(mocks) });

                act(() => {
                    result.current.setTestInformation({
                        testName: 'my-test',
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

                expect(onSubmit).toHaveBeenCalledWith(
                    jasmine.objectContaining({
                        testInformation: {
                            testName: 'my-test',
                            startDate: formatedStartDate,
                            endDate: formatedEndDate,
                        },
                    }),
                );
            });
        });

        describe('with invalid data', () => {
            it('changes the state', async () => {
                const { result } = renderHook(() => useAddTest(onSubmit), { wrapper: renderPage(mocks) });

                act(() => {
                    result.current.setTestInformation({
                        testName: 'my',
                        startDate: formatedStartDate,
                        endDate: formatedEndDate,
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

            let kindergartens: Kindergarten[];

            it('returns empty list', async () => {
                const { result } = renderHook(() => useAddTest(onSubmit), { wrapper: renderPage(mocks) });

                await awaitForHookResponse();

                await act(async () => {
                    kindergartens = result.current.kindergartens;
                });

                expect(kindergartens).toEqual([]);
            });
        });

        describe('when there are kindergartens', () => {
            let kindergartens: Kindergarten[];

            it('returns list', async () => {
                const { result } = renderHook(() => useAddTest(onSubmit), {
                    wrapper: renderPage(mockedKindergartens),
                });

                await awaitForHookResponse();

                await act(async () => {
                    kindergartens = result.current.kindergartens;
                });

                expect(kindergartens).toEqual([
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
                ]);
            });
        });

        describe('when kindergarten is selected', () => {
            let kindergartens: Kindergarten[];

            it('returns list', async () => {
                const { result } = renderHook(() => useAddTest(onSubmit), {
                    wrapper: renderPage(mockedKindergartens),
                });

                await awaitForHookResponse();

                await act(async () => {
                    kindergartens = result.current.kindergartens;
                });

                expect(kindergartens).toEqual([
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
                ]);

                await act(async () => {
                    result.current.selectKindergarten(['my-id-2']);
                });

                await awaitForHookResponse();

                kindergartens = result.current.kindergartens;

                expect(kindergartens).toEqual([
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
                ]);
            });
        });

        describe('when kindergarten is selected twice', () => {
            let kindergartens: Kindergarten[];

            it('returns list', async () => {
                const { result } = renderHook(() => useAddTest(onSubmit), {
                    wrapper: renderPage(mockedKindergartens),
                });

                await act(async () => {
                    await awaitForHookResponse();

                    kindergartens = result.current.kindergartens;
                });

                expect(kindergartens).toEqual([
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
                ]);

                await act(async () => {
                    result.current.selectKindergarten(['my-id-2']);

                    await awaitForHookResponse();

                    result.current.selectKindergarten(['my-id-2']);

                    await awaitForHookResponse();

                    kindergartens = result.current.kindergartens;
                });

                expect(kindergartens).toEqual([
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
            query: CREATE_NEW_TEST,
            variables: {
                title: 'my-test',
                startDate: formatedStartDate,
                endDate: formatedEndDate,
                kindergartens: [],
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
