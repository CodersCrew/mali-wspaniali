import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Typography, Table, TableBody } from '@material-ui/core/';
import { getAllChildren } from '../../graphql/userRepository';
import { TestResultsTableRow } from './TestResultsTableRow';
import { NoResults } from './NoResults';
import { Child } from '../../graphql/types';
import { Pagination } from './Pagination';

export const TestResultsPage = () => {
    const { t } = useTranslation();
    const [children, setChildren] = useState<Child[]>([]);

    useEffect(() => {
        getAllChildren().then(({ data }) => setChildren(data!.allChildren));
    }, []);

    if (children.length === 0) return <NoResults />;

    return (
        <Container>
            <Typography variant="h2" align="center" gutterBottom>
                {t('test-results.search-result')}
            </Typography>
            <Table>
                <TableBody>
                    {children.map((child: Child) => (
                        <TestResultsTableRow key={child._id} child={child} />
                    ))}
                </TableBody>
            </Table>
            <Pagination page={1} pageChangeHandler={() => true} documentsCount={children.length} rowsPerPage={10} />
        </Container>
    );
};
