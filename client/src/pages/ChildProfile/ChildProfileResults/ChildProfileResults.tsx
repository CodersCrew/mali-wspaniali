import React, { useState } from 'react';

import { Child, TestResult } from '../../../graphql/types';

import { GroupedTests } from './GroupedTest';

interface Props {
    onNoResultClick(): void;
    child: Child;
}

export const ChildProfileResults = ({ child }: Props) => {
    const [active, setActive] = useState('');

    const { results } = child;

    const grouped = getGroupedTest(results);

    if (results.length === 0) return getEmptyMessage();

    return (
        <div data-testid="grouped-tests">
            {grouped.map((groupedTest) => {
                const [startTest] = groupedTest;

                return (
                    <GroupedTests
                        isExpanded={active === startTest._id}
                        onOpen={() => setActive(startTest._id)}
                        onClose={() => setActive('')}
                        key={startTest._id}
                        date={new Date(startTest.date)}
                        tests={groupedTest}
                    />
                );
            })}
        </div>
    );
};

function getEmptyMessage() {
    return <div data-testid="no-test-assigned">There is no test assigned to your child</div>;
}

// export for test purposes only
export function getGroupedTest(results: TestResult[]) {
    return results
        .filter((result) => !result.rootResultId)
        .map((result) => {
            const endResult = results.find((lastResult) => lastResult.rootResultId === result._id);

            if (endResult) return [result, endResult];

            return [result];
        });
}
