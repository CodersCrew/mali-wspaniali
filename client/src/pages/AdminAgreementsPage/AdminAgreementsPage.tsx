import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Paper, IconButton, Grid, Divider, Collapse } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useQuery } from '@apollo/client';

import { Kindergarten } from '../../graphql/types';
import { activePage } from '../../apollo_client';
import { AgreementsList } from './AgreementsList/AgreementsList';
import { KINDERGARTENS } from '../../graphql/kindergartensRepository';
import { AgreementsFilter } from './AgreementsFilter/AgreementsFilter';
import { AgreementsTypeFilterMutations } from '../../operations/mutations/agreementsTypeFilterMutations';
import { AgreementKindergartenFilters } from '../../models/AgreementKindergartenFilters';
import {
    GetAgreementsKindergartenFilterQuery,
    GET_AGREEMENTS_KINDERGARTEN_FILTER,
} from '../../operations/queries/Agreements/getAgreementsKindergartenFilter';
import {
    GetAgreementsStatusFilterQuery,
    GET_AGREEMENTS_STATUS_FILTER,
} from '../../operations/queries/Agreements/getAgreementsStatusFilter';
import {
    GET_AGREEMENTS_TYPE_FILTER,
    GetAgreementsTypeFilterQuery,
} from '../../operations/queries/Agreements/getAgreementsTypeFilter';

export const AdminAgreementsPage = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [isFiltersListOpen, setIsFilterListOpen] = useState(false);
    const { data: kindergartenList } = useQuery<{ kindergartens: Kindergarten[] }>(KINDERGARTENS);
    const agreementsTypeFilterQuery = useQuery<GetAgreementsTypeFilterQuery>(GET_AGREEMENTS_TYPE_FILTER);
    const { agreementsTypeFilter } = agreementsTypeFilterQuery.data!;

    const agreementsStatusFilterQuery = useQuery<GetAgreementsStatusFilterQuery>(GET_AGREEMENTS_STATUS_FILTER);
    const { agreementsStatusFilter } = agreementsStatusFilterQuery.data!;
    const agreementsKindergartenFilterQuery = useQuery<GetAgreementsKindergartenFilterQuery>(
        GET_AGREEMENTS_KINDERGARTEN_FILTER,
    );

    const agreementsKindergartenFilter = agreementsKindergartenFilterQuery.data?.agreementsKindergartenFilter;

    useEffect(() => {
        activePage(['admin-menu.agreements']);
    }, []);

    useEffect(() => {
        if (kindergartenList) {
            AgreementsTypeFilterMutations.addAgreementsKindergartenFilters(
                [AgreementKindergartenFilters.SHOW_ALL, ...kindergartenList.kindergartens.map(mapToFilter)],
            );
        }
    }, [kindergartenList]);

    if (!kindergartenList) return null;

    return (
        <>
            <Paper elevation={0} classes={{ root: classes.container}}>
                <div className={classes.filterContainer}>
                    <Grid container justify="space-between" alignItems="center" classes={{ root: classes.filterHeader}} >
                        <Typography variant="h4">{t('admin-agreements-page.agreements-list')}</Typography>
                        <IconButton onClick={() => setIsFilterListOpen(prev => !prev)}><FilterListIcon /></IconButton>
                    </Grid>
                    <Collapse in={isFiltersListOpen} unmountOnExit >
                    <AgreementsFilter
                            agreementType={agreementsTypeFilter}
                            agreementStatus={agreementsStatusFilter}
                            agreementKindergarten={agreementsKindergartenFilter || []}
                        />
                    </Collapse>
                </div>
                <Divider />
                <AgreementsList kindergartens={kindergartenList.kindergartens} />
            </Paper>
        </>
    );
};

function mapToFilter({ _id, name }: Kindergarten) {
    return { id: _id, displayName: name, displayNameKey: '', selected: false };
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            margin: theme.spacing(3)
        },
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        filterContainer: {
            margin: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px`
        },
        filterHeader: {
            paddingTop: 14
        }
    }),
);
