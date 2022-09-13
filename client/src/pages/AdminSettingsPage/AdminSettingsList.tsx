import { useState } from 'react';
import { Typography, makeStyles, Theme, Grid, Checkbox, FormControlLabel } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'use-debounce';

import { Kindergarten } from '@app/graphql/types';
import { CustomContainer } from '../../components/CustomContainer';
import { AdminSettingsListContainers } from './AdminSettingsListContainer';
import { AdminKindergardenSelect } from './AdminKindergardenSelect';
import { useKindergartens } from '../../operations/queries/Kindergartens/getKindergartens';
import { mapKindergartenToOption } from '../../components/ChildForm/utils';
import { SearchInput } from './SearchInput';

const T_PREFIX = 'user-settings';

export function AdminSettingsList() {
    const { kindergartenList } = useKindergartens();
    const [selectedKindergaraden, setSelectedKindergarden] = useState<string>('');
    const [selectedRole, setSelectedRole] = useState<string>('parent');
    const [search, setSearch] = useState<string>('');
    const [debouncedSearch] = useDebounce(search, 500);
    const [inactiveOnly, setInactiveOnly] = useState(false);

    return (
        <CustomContainer
            header={
                <SettingsHeader
                    inactiveOnly={inactiveOnly}
                    kindergartens={kindergartenList}
                    onInactiveOnlyChange={handleInactiveOnlyChange}
                    onKindergartenChange={handleKindergartenChange}
                    onRoleChange={handleRoleChange}
                    onSearchChange={setSearch}
                    selectedKindergarten={selectedKindergaraden}
                    selectedRole={selectedRole}
                />
            }
            container={
                <AdminSettingsListContainers
                    isConfirmed={!inactiveOnly}
                    kindergartenId={selectedKindergaraden}
                    role={selectedRole}
                    search={debouncedSearch}
                />
            }
        />
    );

    function handleKindergartenChange(kindergardenId: string) {
        setSelectedKindergarden(kindergardenId);
    }

    function handleRoleChange(role: string) {
        setSelectedRole(role);
    }

    function handleInactiveOnlyChange() {
        setInactiveOnly((prevState) => !prevState);
    }
}

interface SettingsHeaderProps {
    inactiveOnly: boolean;
    kindergartens: Kindergarten[];
    onInactiveOnlyChange: () => void;
    onKindergartenChange: (id: string) => void;
    onRoleChange: (role: string) => void;
    onSearchChange: (value: string) => void;
    selectedKindergarten: string;
    selectedRole: string;
}

function SettingsHeader(props: SettingsHeaderProps) {
    const { t } = useTranslation();
    const kindergartenOptions = [
        { label: '-', helperLabel: '', value: '' },
        ...[...props.kindergartens].sort((a, b) => (a.city > b.city ? -1 : 1)).map(mapKindergartenToOption),
    ];

    const classes = useStyles();

    return (
        <>
            <Typography variant="h4">{t(`${T_PREFIX}.header`)}</Typography>
            <Grid container spacing={3} className={classes.headerContainer}>
                <Grid item xs={12} sm={3}>
                    <SearchInput onChange={props.onSearchChange} />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <AdminKindergardenSelect
                        label={t(`${T_PREFIX}.role-select`)}
                        value={props.selectedRole}
                        options={getRoleOptions()}
                        onChange={(role) => {
                            props.onRoleChange(role);
                            props.onKindergartenChange('');
                        }}
                    />
                </Grid>
                {props.selectedRole === 'parent' && (
                    <>
                        <Grid item xs={12} sm={3}>
                            <AdminKindergardenSelect
                                label={t(`${T_PREFIX}.search-label`)}
                                onChange={props.onKindergartenChange}
                                options={kindergartenOptions}
                                value={props.selectedKindergarten}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={props.inactiveOnly}
                                        color="primary"
                                        onChange={props.onInactiveOnlyChange}
                                    />
                                }
                                label={t(`${T_PREFIX}.not-confirmed-only`)}
                            />
                        </Grid>
                    </>
                )}
            </Grid>
        </>
    );

    function getRoleOptions() {
        return [
            { label: t(`${T_PREFIX}.parent-option`), helperLabel: '', value: 'parent' },
            { label: 'Instructor', helperLabel: '', value: 'instructor' },
        ];
    }
}

const useStyles = makeStyles((theme: Theme) => ({
    headerContainer: { marginTop: theme.spacing(3.5) },
}));
