import { useState, useEffect } from 'react';
import { Box, Grid, MenuItem, InputAdornment, TextField } from '@material-ui/core/';
import { createStyles, makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { useHistory, useParams } from 'react-router-dom';

import { activePage } from '@app/apollo_client';
import { ButtonSecondary } from '@app/components/Button';
import { PageContainer } from '@app/components/PageContainer';
import { SelectList } from '@app/components/SelectList';
import { Assessment } from '@app/graphql/types';
import { useKindergartensWithChildren } from '@app/operations/queries/Kindergartens/getKindergartensWithChildren';
import { Theme } from '@app/theme';

import { Search as SearchIcon } from '@material-ui/icons';
import { EmptyPage } from '@app/components/EmptyPage';
import { TestResultsTable } from './KindergartenTable/TestResultsTable';
import { NoResults } from './NoResults';
import { AssessmentPart, assessmentParts, MeasurementType, TestToggleButton } from './TestToggleButton';

export default function TestResultsPage() {
    const history = useHistory<{ assessment: Assessment[] }>();
    const { assessmentId, measurementType } = useParams<{ assessmentId: string; measurementType: MeasurementType }>();
    const classes = useStyles();
    const { t } = useTranslation();
    const [page, setPage] = useState(0);
    const [searchPhrase, setSearchPhrase] = useState('');

    const { kindergartenList, isKindergartenListLoading } = useKindergartensWithChildren(
        assessmentId,
        page,
        searchPhrase,
    );

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

    useEffect(() => {
        setPage(0);
    }, [searchPhrase]);

    const handleSelectAssessment = (selectedAssessmentId: string) => {
        pushToAdminResult(selectedAssessmentId, measurementType);
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

                    <TextField
                        label={t('add-test-view.kindergartens.find-kindergarten')}
                        type="search"
                        variant="outlined"
                        data-testid="search-field"
                        value={searchPhrase}
                        onChange={({ target: { value } }) => setSearchPhrase(value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                        fullWidth
                    />

                    <Box className={classes.optionsContainer} justifyContent={'flex-end'}>
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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            backgroundColor: theme.palette.primary.contrastText,
        },
        options: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            rowGap: theme.spacing(2),
            justifyContent: 'space-between',
            width: '100%',
            padding: theme.spacing(2),

            '@media (min-width: 768px)': {
                flexDirection: 'row',
                alignItems: 'center',
                rowGap: theme.spacing(0),
            },
        },
        SelectListContainer: {
            display: 'flex',
            marginRight: theme.spacing(2),
            flex: '1',

            '@media (min-width: 768px)': {
                minWidth: '240px',
            },
        },
        optionsContainer: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',

            '@media (min-width: 768px)': {
                paddingRight: theme.spacing(2),
            },
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
