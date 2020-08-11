import React from 'react';
import { TableRow, TableCell } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import { User } from '../../graphql/types';

interface Props {
    user: User;
}

export const UsersTableRow = ({ user }: Props) => {
    const { t } = useTranslation();

    const { aggrements, _id } = user;

    const getAgreements = () => {
        if (aggrements.length !== 0) {
            return aggrements.map(aggrement => (
                <TableCell key={`${_id}-${aggrement._id}`}>
                    {aggrement.text} {aggrement.isSigned.toString()}
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
