import React from 'react';
import { TableRow, TableCell } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import { Document, Agreement } from '../../firebase/types';

export const UsersTableRow = ({ user }: { user: Document }) => {
    const { t } = useTranslation();

    // eslint-disable-next-line consistent-return
    const getAgreements = () => {
        if (user.agreements) {
            user.agreements.map((agreement: Agreement) => (
                <TableCell key={`${user.userId}-${agreement.agreementId}`}>
                    {agreement.agreementId}
                    {agreement.isAgreed}
                </TableCell>
            ));
        } else {
            return <TableCell>{t('no-results')}</TableCell>;
        }
    };

    return (
        <TableRow>
            <TableCell component="th" scope="row">
                {user.email}
            </TableCell>
            {getAgreements()}
        </TableRow>
    );
};
