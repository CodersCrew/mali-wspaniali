import { useState } from 'react';
import { Typography, makeStyles } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';

import { GroupedTests } from './GroupedTest';
import { Child } from '../../../graphql/types';

interface Props {
    child: Child;
}

export function ChildProfileResults({ child }: Props) {
    const [active, setActive] = useState('');

    if (child.results.length === 0) return <EmptyPanel />;

    return (
        <div data-testid="grouped-tests">
            <Descriptiom />
            {child.results.map((test) => {
                return (
                    <GroupedTests
                        child={child}
                        test={test}
                        isExpanded={active === test._id}
                        key={test._id}
                        onOpen={() => setActive(test._id)}
                        onClose={() => setActive('')}
                    />
                );
            })}
        </div>
    );
}

function EmptyPanel() {
    return (
        <>
            <Descriptiom />
            <EmptyPageMessage />
        </>
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

const useStyles = makeStyles({
    description: {
        marginBottom: 40,
    },
});
