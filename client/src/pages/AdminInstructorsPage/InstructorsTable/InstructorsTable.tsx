import React from 'react';
import { Table, TableBody, TableContainer, Paper } from '@material-ui/core';
import { InstructorsTableHead } from './InstructorsTableHead';
import { InstructorsTableRow } from './InstructorsTableRow';
import { User } from '../../../graphql/types';

interface Props {
    instructors: User[];
}

export const InstructorsTable = ({ instructors }: Props) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="instructors table">
                <InstructorsTableHead />
                <TableBody>
                    {instructors.map(instructor => (
                        <InstructorsTableRow key={instructor._id} instructor={instructor} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
