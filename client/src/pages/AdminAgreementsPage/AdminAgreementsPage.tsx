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

import { KindergartenWithUsers } from '../../graphql/types';
import { activePage } from '../../apollo_client';
import { AgreementsList } from './AgreementsList/AgreementsList';
import { AgreementsFilter } from './AgreementsFilter/AgreementsFilter';
import { AgreementStatusFilter } from '../../models/AgreementStatusFilter';
import { AgreementTypeFilter } from '../../models/AgreementTypeFilters';
import { AgreementKindergartenFilter } from '../../models/AgreementKindergartenFilters';
import { AgreementSortType } from '../../models/AgreementSortStatus';
import { PageContainer } from '../../components/PageContainer';

interface Props {
    kindergartens: KindergartenWithUsers[];
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
                <div className={classes.filterContainer}>
                    <Grid
                        container
                        justify="space-between"
                        alignItems="center"
                        classes={{ root: classes.filterHeader }}
                    >
                        <Typography variant="h4">{t('admin-agreements-page.agreements-list')}</Typography>
                        <IconButton onClick={() => setIsFilterListOpen((prev) => !prev)}>
                            <FilterListIcon />
                        </IconButton>
                    </Grid>
                    <Collapse in={isFiltersListOpen} unmountOnExit>
                        <AgreementsFilter
                            agreementType={agreementsTypeFilter}
                            agreementStatus={agreementsStatusFilter}
                            agreementKindergarten={agreementsKindergartenFilter}
                            onChange={setAgreementFilter}
                            onSubmit={sendFilterChanges}
                        />
                    </Collapse>
                </div>
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
            margin: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px`,
        },
        filterHeader: {
            padding: `14px 0 ${theme.spacing(1)}px`,
        },
    }),
);
