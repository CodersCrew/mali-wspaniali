import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';
import { useAssessments } from '../../operations/queries/Assessment/getAllAssessments';
import { NoResults } from './NoResults';

const TestResultLoadingPage = () => {
    const history = useHistory();
    const { assessments, areAssessmentsLoading } = useAssessments();

    const orderedAssessments = [...assessments].sort(
        (ass1, ass2) =>
            new Date(ass1.firstMeasurementEndDate).getTime() - new Date(ass2.firstMeasurementEndDate).getTime(),
    );

    if (!areAssessmentsLoading && !assessments.length) return <NoResults />;

    if (!areAssessmentsLoading)
        history.push({
            pathname: `/admin/${orderedAssessments[0]._id}/first`,
            state: {
                assessment: orderedAssessments,
            },
        });

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
        </div>
    );
};

export default TestResultLoadingPage;
