import React from 'react';
import { Table, TableBody } from '@material-ui/core';
import { InstructorsTableHead } from './InstructorsTableHead';
import { InstructorsTableRow } from './InstructorsTableRow';
import { User } from '../../../graphql/types';

interface Props {
    instructors: User[];
}

export const InstructorsTable = ({ instructors }: Props) => {
    return (
        <Table aria-label="instructors table">
            <InstructorsTableHead />
            <TableBody>
                {instructors.map(instructor => (
                    <InstructorsTableRow key={instructor._id} instructor={instructor} />
                ))}
            </TableBody>
        </Table>
    );
};
