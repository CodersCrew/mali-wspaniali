import React from 'react';
import { render, screen } from '@testing-library/react';

import { ChildProfileResults, getGroupedTest } from '../ChildProfileResults';
import { TestResult, Child } from '../../../../graphql/types';

describe('ChildProfileResults', () => {
    let results: TestResult[];

    describe("when child doesn't have results", () => {
        let child: Child;

        beforeEach(() => {
            const firstTest = getEmptyTest('my-first-test', null);

            results = [firstTest];

            child = {
                _id: 'some-child',
                birthYear: 2015,
                firstname: 'john',
                lastname: 'smith',
                kindergarten: { name: 'happy-kindergarten', number: 5 },
                results: [],
            };
        });

        it('renders empty results', () => {
            render(<ChildProfileResults child={child} onNoResultClick={() => true} />);

            const emptyResults = screen.queryByTestId('no-test-assigned');
            const groupedResults = screen.queryByTestId('grouped-tests');

            expect(emptyResults).not.toBeNull();
            expect(groupedResults).toBeNull();
        });
    });

    describe('getGroupedTest', () => {
        describe('when single test is created', () => {
            beforeEach(() => {
                const firstTest = getEmptyTest('my-first-test', null);

                results = [firstTest];
            });

            it('returns grouped test', () => {
                const groupedResult = getGroupedTest(results);

                expect(groupedResult.length).toEqual(1);
                expect(groupedResult[0].length).toEqual(1);
                expect(groupedResult[0][0]._id).toEqual('my-first-test');
            });
        });

        describe('when start and end test are created', () => {
            beforeEach(() => {
                const firstTest = getEmptyTest('my-first-test', null);

                const secondTest: TestResult = getEmptyTest('my-second-test', 'my-first-test');

                const thirdTest = getEmptyTest('my-third-test', null);

                results = [firstTest, secondTest, thirdTest];
            });

            it('returns grouped tests', () => {
                const groupedResult = getGroupedTest(results);

                expect(groupedResult.length).toEqual(2);
                expect(groupedResult[0].length).toEqual(2);
                expect(groupedResult[1].length).toEqual(1);
                expect(groupedResult[0][0]._id).toEqual('my-first-test');
                expect(groupedResult[0][1]._id).toEqual('my-second-test');
                expect(groupedResult[1][0]._id).toEqual('my-third-test');
            });
        });
    });
});

function getEmptyTest(id: string, rootId: string | null): TestResult {
    return {
        _id: id,
        date: 'today',
        test: {
            testPeriod: 'START',
            agilityPoints: 0,
            agilitySeconds: 0,
            childAge: 0,
            powerCentimeters: 0,
            powerPoints: 0,
            schoolYearStart: 0,
            speedPoints: 0,
            speedSeconds: 0,
            strengthCentimeters: 0,
            strengthPoints: 0,
        },
        rootResultId: rootId,
    };
}
