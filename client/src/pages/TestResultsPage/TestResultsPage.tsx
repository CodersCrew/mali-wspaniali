import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, createStyles, makeStyles, Theme } from '@material-ui/core/';
import { useMutation, useQuery } from '@apollo/client';
import { getAllChildren } from '../../graphql/userRepository';
import { NoResults } from './NoResults';
import { Child } from '../../graphql/types';
import { activePage } from '../../apollo_client';
import {
    CREATE_KINDERGARTEN,
    AddKindergartenInput,
    KINDERGARTENS,
    KindergartenResponse,
    UPDATE_KINDERGARTEN,
    DELETE_KINDERGARTEN,
} from '../../graphql/kindergartensRepository';
import { ResultsActions } from './ResultsActions';
import { TestResultsTable } from './TestResultsTable';

export const TestResultsPage = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [children, setChildren] = useState<Child[]>([]);
    const [createKindergarten] = useMutation<AddKindergartenInput>(CREATE_KINDERGARTEN);
    const [updateKindergarten] = useMutation<AddKindergartenInput>(UPDATE_KINDERGARTEN);
    const [deleteKindergarten] = useMutation<{ id: string }>(DELETE_KINDERGARTEN);
    const { data: kindergartenData } = useQuery<KindergartenResponse>(KINDERGARTENS);

    useEffect(() => {
        activePage(['admin-menu.results']);
        getAllChildren().then(({ data }) => setChildren(data!.allChildren));
        console.log(kindergartenData);
        console.log(children);
        console.log(updateKindergarten);
        console.log(deleteKindergarten);
    }, [kindergartenData]);

    const handleAddKindergarten = (value: AddKindergartenInput) =>
        createKindergarten({ variables: { kindergarten: value } });

    if (children.length === 0 || !kindergartenData) return <NoResults />;

    const { kindergartens } = kindergartenData;

    return (
        <div className={classes.container}>
            <Typography variant="h3">{t('test-results.description')}</Typography>
            <ResultsActions handleAddKindergarten={handleAddKindergarten} />
            <TestResultsTable kindergartens={kindergartens} />
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: theme.spacing(3),
            display: 'flex',
            flexDirection: 'column',
            gap: `${theme.spacing(4)}px`, // for some reason it doesn't work without 'px',
        },
    }),
);
