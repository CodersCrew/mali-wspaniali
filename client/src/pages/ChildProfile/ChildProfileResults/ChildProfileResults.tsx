import { useState } from 'react';
import { Typography, makeStyles } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';

import { GroupedTests } from './GroupedTest';
import { AssessmentResult, Child } from '../../../graphql/types';

interface Props {
    child: Child;
}

export function ChildProfileResults({ child }: Props) {
    const [active, setActive] = useState('');

    if (child.results.length === 0)
        return (
            <>
                <Descriptiom />
                <EmptyPageMessage />
            </>
        );

    return (
        <div data-testid="grouped-tests">
            <Descriptiom />
            {child.results.map((test) => {
                return (
                    <GroupedTests
                        isExpanded={active === test._id}
                        onOpen={() => setActive(test._id)}
                        onClose={() => setActive('')}
                        key={test._id}
                        test={test}
                    />
                );
            })}
        </div>
    );
}

function EmptyPageMessage() {
    return <div data-testid="no-test-assigned">There is no test assigned to your child</div>;
}

function Descriptiom() {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <Typography variant="h3" className={classes.description}>
            {t('child-profile.description')}
        </Typography>
    );
}

// export for test purposes only
export function getGroupedTest(results: AssessmentResult[]) {
    return (
        results
            // .filter((result) => !result.rootResultId)
            .map((result) => {
                // const endResult = results.find((lastResult) => lastResult.rootResultId === result._id);

                // if (endResult) return [result, endResult];

                return [result];
            })
    );
}

const useStyles = makeStyles({
    description: {
        marginBottom: 40,
    },
});
