import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Table, TableBody, createStyles, makeStyles, Theme } from '@material-ui/core/';
import { useMutation, useQuery } from '@apollo/client';
import { getAllChildren } from '../../graphql/userRepository';
import { TestResultsTableRow } from './TestResultsTableRow';
import { NoResults } from './NoResults';
import { Child } from '../../graphql/types';
import { Pagination } from './Pagination';
import { activePage } from '../../apollo_client';
import { AddOrEditKindergartenModal } from './KindergartenModals/AddOrEditKindergartenModal';
import {
    CREATE_KINDERGARTEN,
    AddKindergartenInput,
    KINDERGARTENS,
    KindergartenResponse,
    UPDATE_KINDERGARTEN,
    DELETE_KINDERGARTEN,
} from '../../graphql/kindergartensRepository';
import { ResultsActions } from './ResultsActions';

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
    }, []);

    const handleAddKindergarten = (value: AddKindergartenInput) =>
        createKindergarten({ variables: { kindergarten: value } });

    if (children.length === 0 || !kindergartenData) return <NoResults />;

    return (
        <div className={classes.container}>
            <Typography variant="h3">{t('test-results.description')}</Typography>
            <ResultsActions handleAddKindergarten={handleAddKindergarten} />
            <Table>
                <TableBody>
                    {children.map((child: Child) => (
                        <TestResultsTableRow key={child._id} child={child} />
                    ))}
                    {kindergartenData.kindergartens.map(({ _id, city, name, address, number }) => (
                        <div key={_id}>
                            {name} {city}{' '}
                            <AddOrEditKindergartenModal
                                initialData={{ city, name, number, address }}
                                kindergartenId={_id}
                                onSubmit={v => {
                                    updateKindergarten({
                                        variables: {
                                            id: _id,
                                            kindergarten: v,
                                        },
                                    });
                                }}
                                onDelete={id => {
                                    deleteKindergarten({
                                        variables: { id },
                                    });
                                }}
                            />
                        </div>
                    ))}
                </TableBody>
            </Table>
            <Pagination page={1} pageChangeHandler={() => true} documentsCount={children.length} rowsPerPage={10} />
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: theme.spacing(3),
            display: 'flex',
            flexDirection: 'column',
            gap: `${theme.spacing(4)}px`, // for some reason it doesn't work without 'px'
        },
    }),
);
