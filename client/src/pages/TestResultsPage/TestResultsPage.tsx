import { useEffect, useState } from 'react';
import { Box, Grid, MenuItem } from '@material-ui/core/';
import { createStyles, makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import ReplyAllIcon from '@material-ui/icons/ReplyAll';
import { useHistory, useParams } from 'react-router-dom';
import { NoResults } from './NoResults';
import { TestResultsTable } from './KindergartenTable/TestResultsTable';
import { activePage } from '../../apollo_client';
import { useKindergartensWithChildren } from '../../operations/queries/Kindergartens/getKindergartensWithChildren';
import { PageContainer } from '../../components/PageContainer';
import { Theme } from '../../theme';
import { SelectList } from '../../components/SelectList';
import { AssessmentPart, assessmentParts, AssessmentType, TestToggleButton } from './TestToggleButton';
import { ButtonSecondary } from '../../components/Button';
import { Assessment } from '../../graphql/types';
// import { useKindergartens } from '../../operations/queries/Kindergartens/getKindergartens';

export default function TestResultsPage() {
    const history = useHistory<Assessment[]>();
    const { assessmentId, assessmentType } = useParams<{ assessmentId: string; assessmentType: AssessmentType }>();
    const classes = useStyles();
    const { t } = useTranslation();

    const { kindergartenList } = useKindergartensWithChildren(assessmentId);
    const [SearchedValue, setSearchedValue] = useState('');

    const selectedAssessmentPart = assessmentParts.find((a) => a.type === assessmentType) ?? assessmentParts[0];

    const orderedAssessments = history.location.state;
    const selectedAssessment = orderedAssessments.find((a) => a._id === assessmentId) ?? orderedAssessments[0];

    const pushToAdminResult = (selectedAssessmentId: string, selectedAssessmentType: string) => {
        history.push({
            pathname: `/admin/${selectedAssessmentId}/${selectedAssessmentType}`,
            state: orderedAssessments,
        });
    };
    useEffect(() => {
        activePage(['admin-menu.results.title', 'admin-menu.results.table']);
    }, []);

    const handleSelectAssessment = (selectedAssessmentId: string) => {
        pushToAdminResult(selectedAssessmentId, assessmentType);
    };
    const handleSelectAssessmentType = (selectedAssessmentType: AssessmentPart) => {
        pushToAdminResult(assessmentId, selectedAssessmentType.type);
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
                            onClick={() => {
                                console.log('publikuj wyniki');
                            }}
                            icon={<ReplyAllIcon />}
                            innerText={t('test-results.publish-result')}
                        />
                        <ButtonSecondary
                            onClick={() => {
                                console.log('pobierz wyniki');
                            }}
                            icon={<SaveAltIcon />}
                            innerText={t('test-results.download-result')}
                        />
                    </Box>
                </Grid>
                <Box className={classes.informationContainer} justifyContent="space-between" alignItems={'center'}>
                    <span className={classes.measurementText}>{t(selectedAssessmentPart.assessmentName)}</span>
                    <p>
                        <span className={classes.ResultStatusText}>{t('test-results.status-result')}: </span>
                        {t(`manage-test-view.test-list.${selectedAssessment.status}`)}
                    </p>
                </Box>
                <TestResultsTable
                    assessmentType={assessmentType}
                    kindergartens={kindergartenList}
                    searchedValue={SearchedValue}
                    onSearchChange={setSearchedValue}
                />
            </Box>
        </PageContainer>
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
            width: '80%',
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
