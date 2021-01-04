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
import { useTheme } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { NotificationPageListItem } from './NotificationPageListItem';
import { Notification } from '../../graphql/types';
import { useNotificationContent } from './useNotificationContent';

interface Props {
    notifications: Notification[];
    onClick: (id: string) => void;
}
interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const classes = useStyles();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, page + 1);
    };

    return (
        <div className={classes.content2}>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
        </div>
    );
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

    console.log(notifications);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="Notification table">
                <TableHead>
                    <TableRow>
                        <TableCell classes={{ root: classes.content }}>
                            <Typography variant="subtitle2">{t('notifications-page.content')}</Typography>
                        </TableCell>
                        <TableCell>
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
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[10, 20, 40, { label: 'All', value: -1 }]}
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
        content2: {
            marginLeft: theme.spacing(2.5),
            display: 'flex',
        },
    }),
);
