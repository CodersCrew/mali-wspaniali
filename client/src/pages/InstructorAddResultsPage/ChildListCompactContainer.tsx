import React, { useState } from 'react';
import {
    Box,
    Grid,
    List,
    ListItem,
    Typography,
    TableBody,
    TableRow,
    Table,
    TableCell,
    makeStyles,
    IconButton,
} from '@material-ui/core';
import { Assessment, BarChart, EventNote, ExpandLess, ExpandMore } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { Child } from '../../graphql/types';
import { parseBirthQuarter } from '../../utils/parseBirthQuarter';

interface Props {
    childList: Child[];
    onClick: (type: string, value: string) => void;
}

export function ChildListCompactContainer({ childList, onClick }: Props) {
    const { t } = useTranslation();
    const classes = useStyles();
    const [selectedChild, setSelectedChild] = useState(childList[0]?._id);

    return (
        <List>
            {childList.map((c) => {
                const isOpen = selectedChild === c._id;

                return (
                    <>
                        <ListItem divider key={c._id}>
                            <Grid container direction="column">
                                <Grid item onClick={() => setSelectedChild((prev) => (prev !== c._id ? c._id : ''))}>
                                    <Grid container>
                                        <Grid item>
                                            <Box mr={2}>{isOpen ? <ExpandLess /> : <ExpandMore />}</Box>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body2">
                                                {c.firstname} {c.lastname}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {isOpen && (
                                    <Grid container>
                                        <Grid item>
                                            <Box ml={3}>
                                                <Table>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell classes={{ root: classes.cell }}>
                                                                <Typography variant="subtitle2">
                                                                    {t('add-results-page.birth-year')}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell classes={{ root: classes.cell }}>
                                                                <Typography variant="body2">{c.birthYear}</Typography>
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell classes={{ root: classes.cell }}>
                                                                <Typography variant="subtitle2">
                                                                    {t('add-results-page.birth-quarter')}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell classes={{ root: classes.cell }}>
                                                                <Typography variant="body2">
                                                                    {parseBirthQuarter(c.birthQuarter)}
                                                                </Typography>
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell classes={{ root: classes.cell }}>
                                                                <Typography variant="subtitle2">
                                                                    {t('add-results-page.first-assessment')}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell classes={{ root: classes.cell }}>
                                                                <IconButton
                                                                    classes={{ root: classes.iconButton }}
                                                                    onClick={() =>
                                                                        onClick('add-first-assessment-result', c._id)
                                                                    }
                                                                >
                                                                    <BarChart
                                                                        titleAccess={t(
                                                                            'add-results-page.add-first-assessment-result',
                                                                        )}
                                                                    />
                                                                </IconButton>
                                                            </TableCell>
                                                            <TableCell classes={{ root: classes.cell }}>
                                                                <IconButton
                                                                    classes={{ root: classes.iconButton }}
                                                                    onClick={() =>
                                                                        onClick('add-first-assessment-note', c._id)
                                                                    }
                                                                >
                                                                    <EventNote
                                                                        titleAccess={t('add-results-page.add-note')}
                                                                    />
                                                                </IconButton>
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell classes={{ root: classes.cell }}>
                                                                <Typography variant="subtitle2">
                                                                    {t('add-results-page.last-assessment')}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell classes={{ root: classes.cell }}>
                                                                <IconButton
                                                                    classes={{ root: classes.iconButton }}
                                                                    onClick={() =>
                                                                        onClick('add-last-assessment-result', c._id)
                                                                    }
                                                                >
                                                                    <BarChart
                                                                        titleAccess={t(
                                                                            'add-results-page.add-last-assessment-result',
                                                                        )}
                                                                    />
                                                                </IconButton>
                                                            </TableCell>
                                                            <TableCell classes={{ root: classes.cell }}>
                                                                <IconButton
                                                                    classes={{ root: classes.iconButton }}
                                                                    onClick={() =>
                                                                        onClick('add-last-assessment-note', c._id)
                                                                    }
                                                                >
                                                                    <EventNote
                                                                        titleAccess={t('add-results-page.add-note')}
                                                                    />
                                                                </IconButton>
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell classes={{ root: classes.cell }}>
                                                                <Typography variant="subtitle2">
                                                                    {t('add-results-page.see-results')}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell classes={{ root: classes.cell }}>
                                                                <IconButton
                                                                    classes={{ root: classes.iconButton }}
                                                                    onClick={() => onClick('see-results', c._id)}
                                                                >
                                                                    <Assessment
                                                                        titleAccess={t('add-results-page.see-results')}
                                                                    />
                                                                </IconButton>
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                )}
                            </Grid>
                        </ListItem>
                    </>
                );
            })}
        </List>
    );
}

const useStyles = makeStyles({
    cell: {
        border: 'none',
    },
    iconButton: {
        padding: 0,
    },
});
