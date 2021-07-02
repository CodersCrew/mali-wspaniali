import { useEffect, useState } from 'react';
import { Box, Grid, MenuItem } from '@material-ui/core/';
import { createStyles, makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import ReplyAllIcon from '@material-ui/icons/ReplyAll';
import { NoResults } from './NoResults';
import { TestResultsTable } from './KindergartenTable/TestResultsTable';
import { activePage } from '../../apollo_client';
import { useKindergartens } from '../../operations/queries/Kindergartens/getKindergartens';
import { PageContainer } from '../../components/PageContainer';
import { Theme } from '../../theme';
import { SelectList } from '../../components/SelectList';
import { TestToggleButton } from './TestToggleButton';
import { ButtonSecondary } from '../../components/Button';

export default function TestResultsPage() {
    const classes = useStyles();
    const { t } = useTranslation();
    const { kindergartenList } = useKindergartens();

    const [SearchedValue, setSearchedValue] = useState('');
    useEffect(() => {
        activePage(['admin-menu.results.title', 'admin-menu.results.table']);
    }, []);

    if (!kindergartenList) {
        return <NoResults />;
    }

    const [selectedTest, setSelectedTest] = useState('Test przedszkolaka 2020/2021');
    const [selectedMeasurement, setSelectedMeasurement] = useState('add-results-page.first-assessment');

    return (
        <PageContainer>
            <Box className={classes.wrapper}>
                <Grid className={classes.options}>
                    <Box className={classes.optionsContainer} justifyContent={'flex-start'}>
                        <div className={classes.SelectListContainer}>
                            <SelectList
                                value={selectedTest}
                                onSelect={setSelectedTest}
                                label={t('admin-instructors-page.table-toolbar.select-test')}
                                items={[
                                    <MenuItem key="done" value="Test przedszkolaka 2020/2021">
                                        Test przedszkolaka 2020/2021
                                    </MenuItem>,
                                ]}
                            />
                        </div>
                        <TestToggleButton value={selectedMeasurement} onChange={setSelectedMeasurement} />
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
                    <span className={classes.measurementText}>{t(selectedMeasurement)}</span>
                    <p>
                        <span className={classes.ResultStatusText}>{t('test-results.status-result')}: </span>
                        Opublikowane
                    </p>
                </Box>
                <TestResultsTable
                    kindergartens={kindergartenList}
                    searchedValue={SearchedValue}
                    setSearchValue={setSearchedValue}
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
            fontSize: '16px',
            fontWeight: 500,
        },
    }),
);
