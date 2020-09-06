import React from 'react';
import { TableRow, TableCell } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import { User } from '../../graphql/types';

interface Props {
    user: User;
}

export const UsersTableRow = ({ user }: Props) => {
    const { t } = useTranslation();

    const { agreements, _id } = user;

    const getAgreements = () => {
        if (agreements.length !== 0) {
            return agreements.map(agreement => (
                <TableCell key={`${_id}-${agreement._id}`}>
                    {agreement.text} {agreement.isSigned.toString()}
                </TableCell>
            ));
        }

        return <TableCell>{t('no-results')}</TableCell>;
    };

    return (
        <TableRow>
            <TableCell component="th" scope="row">
                {user.mail}
            </TableCell>
            {getAgreements()}
        </TableRow>
    );
};
