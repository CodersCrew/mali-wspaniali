import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Typography,
    Paper,
    IconButton,
    Grid,
    Divider,
    Collapse,
    makeStyles,
    Theme,
    createStyles,
} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';

import { AssessmentTitle, KindergartenWithChildrens } from '../../graphql/types';
import { activePage } from '../../apollo_client';
import { AgreementsList } from './AgreementsList/AgreementsList';
import { AgreementsFilter } from './AgreementsFilter/AgreementsFilter';
import { AgreementStatusFilter } from '../../models/AgreementStatusFilter';
import { AgreementTypeFilter } from '../../models/AgreementTypeFilters';
import { AgreementKindergartenFilter } from '../../models/AgreementKindergartenFilters';
import { AgreementSortType } from '../../models/AgreementSortStatus';
import { PageContainer } from '../../components/PageContainer';

interface Props {
    kindergartens: KindergartenWithChildrens[];
    assessments: AssessmentTitle[];
    agreementsStatusFilter: AgreementStatusFilter;
    agreementsTypeFilter: AgreementTypeFilter;
    agreementsKindergartenFilter: AgreementKindergartenFilter[];
    agreementsSortStatus: AgreementSortType;
    isKindergartenLoading: boolean;
    actions: {
        setSortStatus: (value: string) => void;
        setAgreementFilter: (type: string, value: string | string[]) => void;
        sendFilterChanges: () => void;
    };
}

export const AdminAgreementsPage = ({
    kindergartens,
    assessments,
    agreementsStatusFilter,
    agreementsTypeFilter,
    agreementsKindergartenFilter,
    agreementsSortStatus,
    isKindergartenLoading,
    actions: { setSortStatus, setAgreementFilter, sendFilterChanges },
}: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [isFiltersListOpen, setIsFilterListOpen] = useState(false);

    useEffect(() => {
        activePage(['admin-menu.agreements']);
    }, []);

    return (
        <PageContainer>
            <Paper elevation={0}>
                <Grid container alignItems="center" classes={{ root: classes.filterHeader }}>
                    <IconButton onClick={() => setIsFilterListOpen((prev) => !prev)}>
                        <FilterListIcon />
                    </IconButton>
                    <Typography variant="h4">{t('admin-agreements-page.agreements-list')}</Typography>
                </Grid>

                <Collapse in={isFiltersListOpen} unmountOnExit className={classes.filterContainer}>
                    <AgreementsFilter
                        assessments={assessments}
                        agreementType={agreementsTypeFilter}
                        agreementStatus={agreementsStatusFilter}
                        agreementKindergarten={agreementsKindergartenFilter}
                        onChange={setAgreementFilter}
                        onSubmit={sendFilterChanges}
                    />
                </Collapse>
                <Divider />
                <AgreementsList
                    isLoading={isKindergartenLoading}
                    kindergartens={kindergartens}
                    activeSortType={agreementsSortStatus.id}
                    onSortChange={setSortStatus}
                />
            </Paper>
        </PageContainer>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        filterContainer: {
            margin: theme.spacing(2),
            paddingTop: theme.spacing(1),
        },
        filterHeader: {
            padding: theme.spacing(2.75),
        },
    }),
);
