import React, { FC } from 'react';
import { Table, TableBody, TableContainer, Paper } from '@material-ui/core';

import { InstructorsTableHead } from './InstructorsTableHead';

export const InstructorsTableContainer: FC = ({ children }) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="instructors table">
                <InstructorsTableHead />
                <TableBody>{children}</TableBody>
            </Table>
        </TableContainer>
    );
};
