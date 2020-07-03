import React from 'react';
import { TableRow, TableCell } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import { Document, UserAgreement } from '../../firebase/types';

export const UsersTableRow = ({ user }: { user: Document }) => {
    const { t } = useTranslation();

    const getAgreements = () => {
        if (user.agreements) {
            return user.agreements.map((agreement: UserAgreement) => (
                <TableCell key={`${user.userId}-${agreement.agreementId}`}>
                    {agreement.agreementId}
                    {agreement.checked}
                </TableCell>
            ));
        }

        return <TableCell>{t('no-results')}</TableCell>;
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
