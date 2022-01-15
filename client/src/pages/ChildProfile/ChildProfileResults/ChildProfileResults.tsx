import { Typography, Box, makeStyles } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';

import { GroupedTests } from './GroupedTest';
import { Child } from '../../../graphql/types';

export function ChildProfileResults({ child }: { child: Child }) {
    const [activeItem, setActiveItem] = React.useState('');

    if (child.results.length === 0) return <EmptyPanel />;

    return (
        <Box pb={3}>
            <Descriptiom />
            {child.results.map((result) => {
                return (
                    <GroupedTests
                        child={child}
                        resultId={result._id}
                        result={result}
                        isExpanded={activeItem === result._id}
                        key={result._id}
                        onToggle={() => onToggle(result._id)}
                    />
                );
            })}
        </Box>
    );

    function onToggle(resultId: string) {
        setActiveItem((prev) => (prev === resultId ? '' : resultId));
    }
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
    const { t } = useTranslation();

    return <div data-testid="no-test-assigned">{t('child-profile.empty-view')}</div>;
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
