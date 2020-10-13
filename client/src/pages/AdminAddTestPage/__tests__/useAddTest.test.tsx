import React, { FC } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useAddTest } from '../useAddTest';
import { MockedProvider } from '@apollo/client/testing';
import { CREATE_NEW_TEST } from '../../../operations/mutations/Test/createNewTest';
import { awaitForResponse } from '../../../utils/testing/awaitForResponse';
import { translationOf } from '../../../utils/testing/isTranslationOf';
import { KINDERGARTENS } from '../../../operations/queries/Kindergartens/getKindergartens';

describe('useAddTest', () => {
    let onSubmit: jest.Mock;

    describe('when basic information changes', () => {
        beforeEach(() => {
            onSubmit = jest.fn();
        });

        describe('with valid data', () => {
            it('changes the state', async () => {
                const { result } = renderHook(() => useAddTest(onSubmit), { wrapper: renderPage });

                act(() => {
                    result.current.setTestInformation({ testName: 'my-test' });
                });

                expect(onSubmit).not.toHaveBeenCalled();

                await act(async () => {
                    result.current.submit();

                    await awaitForResponse();
                    await awaitForResponse();
                });

                expect(onSubmit).toHaveBeenCalledWith(
                    jasmine.objectContaining({ testInformation: { testName: 'my-test' } }),
                );
            });
        });

        describe('with invalid data', () => {
            it('changes the state', async () => {
                const { result } = renderHook(() => useAddTest(onSubmit), { wrapper: renderPage });

                act(() => {
                    result.current.setTestInformation({ testName: 'my' });
                });

                expect(onSubmit).not.toHaveBeenCalled();

                await act(async () => {
                    result.current.submit();

                    await awaitForResponse();
                });

                expect(onSubmit).toHaveBeenCalledWith(
                    jasmine.objectContaining({ errors: translationOf('add-test-view.errors.name-too-short') }),
                );
            });
        });
    });
});

const renderPage: FC = ({ children }) => {
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
