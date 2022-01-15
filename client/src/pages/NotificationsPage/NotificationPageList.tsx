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
    TableFooter,
    TablePagination,
    Box,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Notifications } from '@material-ui/icons/';

import { NotificationPageListItem } from './NotificationPageListItem';
import { Notification } from '../../graphql/types';
import { TablePaginationActions } from './NotificationTablePaginationActions';

interface Props {
    notifications: Notification[];
    onClick: (id: string) => void;
}

export const NotificationPageList = ({ notifications, onClick }: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="Notification table">
                <TableHead>
                    <TableRow>
                        <TableCell classes={{ root: classes.contentHeader }}>
                            <Typography variant="subtitle2">{t('notifications-page.content')}</Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="subtitle2">{t('notifications-page.date')}</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {notifications.length === 0 && <EmptyContent />}
                    {notifications.map((notification) => (
                        <NotificationPageListItem
                            key={notification._id}
                            notification={notification}
                            onClick={onClick}
                        />
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={possiblePageOptions()}
                            colSpan={3}
                            count={notifications.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onPageChange={(_, pages) => handleChangePage(pages)}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );

    function possiblePageOptions() {
        return [10, 20, 30].filter((option) => notifications.length > option);
    }

    function handleChangePage(newPage: number) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }
};

function EmptyContent() {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <TableRow>
            <TableCell variant="body" width="100%">
                <Box p={4} display="flex" justifyContent="center" alignItems="center" flexDirection="column" mr="-67px">
                    <Notifications classes={{ root: classes.notificationIcon }} />
                    <Box mb={3} mt={4}>
                        <Typography variant="h4" color="textSecondary">
                            {t('notifications-page.empty-list-message.title')}
                        </Typography>
                    </Box>
                    <Typography variant="body1" color="textSecondary">
                        {t('notifications-page.empty-list-message.description')}
                    </Typography>
                </Box>
            </TableCell>
        </TableRow>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        contentHeader: {
            paddingLeft: theme.spacing(6),
        },
        notificationIcon: {
            fontSize: 60,
            color: theme.palette.action.disabled,
        },
    }),
);
