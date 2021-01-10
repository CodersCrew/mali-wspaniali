import React from 'react';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    Paper,
    makeStyles,
    TableBody,
    createStyles,
    Theme,
    Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import { NotificationPageListItem } from './NotificationPageListItem';
import { Notification } from '../../graphql/types';
import { useNotificationContent } from './useNotificationContent';
import { TablePaginationActions } from './NotificationTablePaginationActions';

interface Props {
    notifications: Notification[];
    onClick: (id: string) => void;
}

export const NotificationPageList = ({ notifications, onClick }: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { getNotification } = useNotificationContent();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, notifications.length - page * rowsPerPage);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table aria-label="Notification table">
                <TableHead>
                    <TableRow>
                        <TableCell classes={{ root: classes.content }}>
                            <Typography variant="subtitle2">{t('notifications-page.content')}</Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="subtitle2">{t('notifications-page.date')}</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? notifications.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : notifications
                    ).map((notification) => {
                        const { _id, values, templateId, date, isRead } = notification;

                        return (
                            <NotificationPageListItem
                                key={_id}
                                id={_id}
                                text={getNotification(templateId, values)}
                                date={new Date(date)}
                                isRead={isRead}
                                onClick={onClick}
                            />
                        );
                    })}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 49.5 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[10, 20, 30, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={notifications.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            paddingLeft: theme.spacing(7),
        },
    }),
);
