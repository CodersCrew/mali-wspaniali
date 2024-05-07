import { useTranslation } from 'react-i18next';
import { TableHead, TableRow, TableCell, createStyles, makeStyles, Theme } from '@material-ui/core';

export const InstructorsTableHead = () => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <TableHead>
            <TableRow>
                <TableCell />

                <TableCell>{t('admin-instructors-page.table.lastName')}</TableCell>

                <TableCell>{t('admin-instructors-page.table.firstName')}</TableCell>

                <TableCell>{t('admin-instructors-page.table.email')}</TableCell>

                <TableCell align="right" className={classes.kindergartenCell}>
                    {t('admin-instructors-page.table.kindergarten-count')}
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        kindergartenCell: {
            paddingRight: theme.spacing(10),
        },
    }),
);
