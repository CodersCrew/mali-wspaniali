import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { AssessmentResult, Child } from '../../graphql/types';
import { countSumOfPoints } from '../../utils/countSumOfPoints';
import { ResultComparison } from './ResultComparison';
import { TestDetails } from './TestDetails';
import { TestSummary } from './TestSummary';

export function ResultPreview(props: { result: AssessmentResult; child: Child }) {
    const { t } = useTranslation();
    const { sumOfPointsFirstMeasurement, sumOfPointsLastMeasurement } = countSumOfPoints(props.result);

    return (
        <>
            <SingleTest
                {...props}
                title={t('child-profile.initial-test')}
                description={t('child-profile.initial-fitness-level')}
                points={sumOfPointsFirstMeasurement}
                prefix="first"
            />
            <SingleTest
                {...props}
                title={t('child-profile.final-test')}
                description={t('child-profile.final-fitness-level')}
                points={sumOfPointsLastMeasurement}
                prefix="last"
            />
            <ResultComparison
                {...props}
                params={props.result.currentParams}
                firstResultPoints={sumOfPointsFirstMeasurement}
                lastResultPoints={sumOfPointsLastMeasurement}
            />
        </>
    );
}

interface SingleTestProps {
    result: AssessmentResult;
    child: Child;
    title: string;
    description: string;
    points: number;
    prefix: string;
}

function SingleTest(props: SingleTestProps) {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <TestSummary {...props} />
            <TestDetails {...props} />
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            padding: `${theme.spacing(2)}px 0`,
            [theme.breakpoints.down('sm')]: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '100vw',
            },
        },
    }),
);
