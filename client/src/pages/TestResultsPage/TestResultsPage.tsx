import { useState, useEffect } from 'react';
import { Box, Grid, MenuItem } from '@material-ui/core/';
import { createStyles, makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { useHistory, useParams } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';

import { activePage } from '@app/apollo_client';
import { ButtonSecondary } from '@app/components/Button';
import { PageContainer } from '@app/components/PageContainer';
import { SelectList } from '@app/components/SelectList';
import { Assessment } from '@app/graphql/types';
import { useKindergartensWithChildren } from '@app/operations/queries/Kindergartens/getKindergartensWithChildren';
import { Theme } from '@app/theme';

// import { useAssessmentResults } from '@app/operations/queries/Assessment/getAssessmentResults';
// import { Result } from '@app/components/ResultPreview/Result';
import axios from 'axios';
import FileSaver from 'file-saver';
import { TestResultsTable } from './KindergartenTable/TestResultsTable';
import { NoResults } from './NoResults';
import { AssessmentPart, assessmentParts, MeasurementType, TestToggleButton } from './TestToggleButton';

export default function TestResultsPage() {
    const history = useHistory<{ assessment: Assessment[] }>();
    const { assessmentId, measurementType } = useParams<{ assessmentId: string; measurementType: MeasurementType }>();
    const classes = useStyles();
    const { t } = useTranslation();
    const [page, setPage] = useState(0);

    const { kindergartenList, isKindergartenListLoading } = useKindergartensWithChildren(assessmentId, page);
    // const { assessmentResults } = useAssessmentResults(assessmentId);

    const selectedAssessmentPart = assessmentParts.find((a) => a.type === measurementType) ?? assessmentParts[0];

    const orderedAssessments = history.location.state?.assessment;
    const selectedAssessment = orderedAssessments.find((a) => a._id === assessmentId) ?? orderedAssessments[0];

    const pushToAdminResult = (selectedAssessmentId: string, selectedAssessmentType: MeasurementType) => {
        history.push({
            pathname: `/admin/${selectedAssessmentId}/${selectedAssessmentType}`,
            state: {
                assessment: orderedAssessments,
            },
        });
    };

    useEffect(() => {
        activePage(['admin-menu.results.title', 'admin-menu.results.table']);
    }, []);

    const handleSelectAssessment = (selectedAssessmentId: string) => {
        pushToAdminResult(selectedAssessmentId, measurementType);
    };
    const handleSelectAssessmentType = (selectedAssessmentType: AssessmentPart) => {
        pushToAdminResult(assessmentId, selectedAssessmentType.type);
    };

    const downloadResults = async () => {
        // TODO: remove!
        /*
        if (assessmentResults) {
            console.log('pobierz wyniki:', assessmentResults);
            const result = assessmentResults.kindergartens[0].kindergarten.children[4].results[0];
            const res = new Result({ result });
            console.log('new Result - age:', res.getChildAge());
        } else {
            console.log('brak wyników');
        }
*/

        const FILE_NAME = 'test-przedszkole-agatka.xlsx';

        try {
            const url = process.env.VITE_APP_API
                ? `${process.env.VITE_APP_API}/children/result_sheet/${assessmentId}`
                : `http://localhost:3005/children/result_sheet/${assessmentId}`;

            const token = localStorage.getItem('token') || '';

            const response = await axios.get(url, {
                headers: {
                    authorization: token,
                },
                responseType: 'blob',
            });

            FileSaver.saveAs(response.data, FILE_NAME);
        } catch (error: unknown) {
            console.log({ error });
        }
    };

    if (!kindergartenList) return <NoResults />;

    return (
        <PageContainer>
            <Box className={classes.wrapper}>
                <Grid className={classes.options}>
                    <Box className={classes.optionsContainer} justifyContent={'flex-start'}>
                        <div className={classes.SelectListContainer}>
                            <SelectList
                                value={assessmentId}
                                onSelect={handleSelectAssessment}
                                label={t('admin-instructors-page.table-toolbar.select-test')}
                                items={orderedAssessments.map((assessment) => (
                                    <MenuItem key={assessment._id} value={assessment._id}>
                                        {assessment.title}
                                    </MenuItem>
                                ))}
                            />
                        </div>

                        <TestToggleButton value={selectedAssessmentPart} onChange={handleSelectAssessmentType} />
                    </Box>

                    <Box className={classes.optionsContainer} justifyContent={'flex-end'}>
                        <ButtonSecondary
                            onClick={downloadResults}
                            icon={<SaveAltIcon />}
                            innerText={t('test-results.download-result')}
                        />
                    </Box>
                </Grid>

                <Box className={classes.informationContainer} justifyContent="space-between" alignItems={'center'}>
                    <span className={classes.measurementText}>{t(selectedAssessmentPart.assessmentName)}</span>
                    <p>
                        <span className={classes.ResultStatusText}>{t('test-results.status-result')}: </span>
                        {t(`manage-test-view.test-list.${selectedAssessment.firstMeasurementStatus}`)}
                    </p>
                </Box>

                {isKindergartenListLoading ? (
                    <EmptyPage />
                ) : (
                    <TestResultsTable
                        assessmentId={assessmentId}
                        measurementType={measurementType}
                        kindergartens={kindergartenList}
                        page={page}
                        setPage={setPage}
                        assessment={selectedAssessment}
                    />
                )}
            </Box>
        </PageContainer>
    );
}

function EmptyPage() {
    return (
        <>
            <Skeleton height={64} />
            <Skeleton height={64} />
            <Skeleton height={64} />
            <Skeleton height={64} />
        </>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            backgroundColor: theme.palette.primary.contrastText,
        },
        options: {
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: theme.spacing(2),
        },
        SelectListContainer: {
            display: 'flex',
            width: 400,
            marginRight: theme.spacing(2),
        },
        optionsContainer: {
            display: 'flex',
            flexDirection: 'row',
            width: '45%',
        },
        informationContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '96%',
            margin: theme.spacing(2),
        },
        measurementText: {
            fontSize: '20px',
            fontWeight: 500,
        },
        ResultStatusText: {
            fontSize: 16,
            fontWeight: 500,
        },
    }),
);
