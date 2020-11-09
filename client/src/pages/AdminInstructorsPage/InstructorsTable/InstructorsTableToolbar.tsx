import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormControl, InputLabel, MenuItem, Select, createStyles, makeStyles, Theme } from '@material-ui/core';
import { AddCircle as AddCircleIcon } from '@material-ui/icons';
import { ButtonSecondary } from '../../../components/Button';

export const InstructorsTableToolbar = () => {
    const classes = useStyles();

    const { t } = useTranslation();

    return (
        <div className={classes.container}>
            <div className={classes.input}>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="test-select-label">
                        {t('admin-instructors-page.table-toolbar.select-test')}
                    </InputLabel>
                    <Select
                        labelId="test-select-label"
                        id="test-select"
                        label={t('admin-instructors-page.table-toolbar.select-test')}
                        MenuProps={{
                            getContentAnchorEl: null,
                            anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                        }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem>Test 1</MenuItem>
                        <MenuItem>Test 2</MenuItem>
                        <MenuItem>Test 3</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className={classes.input}>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="instructor-select-label">
                        {t('admin-instructors-page.table-toolbar.instructor-search')}
                    </InputLabel>
                    <Select
                        labelId="instructor-select-label"
                        id="instructor-select"
                        label={t('admin-instructors-page.table-toolbar.instructor-search')}
                        MenuProps={{
                            getContentAnchorEl: null,
                            anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                        }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem>Instruktor 1</MenuItem>
                        <MenuItem>Instruktor 2</MenuItem>
                        <MenuItem>Instruktor 3</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <ButtonSecondary
                variant="contained"
                innerText={t('admin-instructors-page.table-toolbar.kindergarten-assign')}
                startIcon={<AddCircleIcon />}
            />
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: theme.spacing(2),
            display: 'flex',
            alignItems: 'center',
            gap: `${theme.spacing(3)}px`,
            flexWrap: 'wrap',
            background: theme.palette.primary.contrastText,
            borderRadius: theme.spacing(0.5),
            borderBottom: '1px solid rgba(224, 224, 224, 1)',
        },
        input: {
            width: 330,
        },
    }),
);
