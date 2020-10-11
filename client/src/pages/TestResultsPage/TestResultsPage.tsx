import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Typography, Table, TableBody } from '@material-ui/core/';
import { useMutation } from '@apollo/client';
import { getAllChildren } from '../../graphql/userRepository';
import { TestResultsTableRow } from './TestResultsTableRow';
import { NoResults } from './NoResults';
import { Child } from '../../graphql/types';
import { Pagination } from './Pagination';
import { activePage } from '../../apollo_client';
import { AddOrEditKindergartenModal } from './KindergartenModals/AddOrEditKindergartenModal';
import { useKindergartens } from '../../operations/queries/Kindergartens/getKindergartens';
import {
    CREATE_KINDERGARTEN,
    AddKindergartenInput,
    UPDATE_KINDERGARTEN,
    DELETE_KINDERGARTEN,
} from '../../graphql/kindergartensRepository';

export const TestResultsPage = () => {
    const { t } = useTranslation();
    const [children, setChildren] = useState<Child[]>([]);
    const [createKindergarten] = useMutation<AddKindergartenInput>(CREATE_KINDERGARTEN);
    const [updateKindergarten] = useMutation<AddKindergartenInput>(UPDATE_KINDERGARTEN);
    const [deleteKindergarten] = useMutation<{ id: string }>(DELETE_KINDERGARTEN);
    const { kindergartenList } = useKindergartens();

    useEffect(() => {
        activePage(['admin-menu.results']);
        getAllChildren().then(({ data }) => setChildren(data!.allChildren));
    }, []);

    if (children.length === 0 || !kindergartenList) return <NoResults />;

    return (
        <Container>
            <Typography variant="h2" align="center" gutterBottom>
                {t('test-results.search-result')}
            </Typography>
            <AddOrEditKindergartenModal
                onSubmit={(value: AddKindergartenInput) =>
                    createKindergarten({
                        variables: {
                            kindergarten: value,
                        },
                    })
                }
            />
            <Table>
                <TableBody>
                    {children.map((child: Child) => (
                        <TestResultsTableRow key={child._id} child={child} />
                    ))}
                    {kindergartenList.map(({ _id, city, name, address, number }) => (
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
        </Container>
    );
};
