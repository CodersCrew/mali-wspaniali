import { useState } from 'react';
import { Typography, makeStyles, Theme, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'use-debounce';

import { CustomContainer } from '../../components/CustomContainer';
import { AdminSettingsListContainers } from './AdminSettingsListContainer';
import { AdminKindergardenSelect } from './AdminKindergardenSelect';
import { useKindergartens } from '../../operations/queries/Kindergartens/getKindergartens';
import { mapKindergartenToOption } from '../../components/ChildForm/utils';
import { SearchInput } from './SearchInput';
import { Kindergarten } from '../../graphql/types';

const T_PREFIX = 'user-settings';

export function AdminSettingsList() {
    const { kindergartenList } = useKindergartens();
    const [selectedKindergaraden, setSelectedKindergarden] = useState<string>('');
    const [selectedRole, setSelectedRole] = useState<string>('parent');
    const [search, setSearch] = useState<string>('');
    const [debouncedSearch] = useDebounce(search, 500);

    return (
        <CustomContainer
            header={
                <SettingsHeader
                    kindergartens={kindergartenList}
                    selectedKindergarten={selectedKindergaraden}
                    selectedRole={selectedRole}
                    onKindergartenChange={handleKindergartenChange}
                    onRoleChange={handleRoleChange}
                    onSearchChange={setSearch}
                />
            }
            container={
                <AdminSettingsListContainers
                    role={selectedRole}
                    search={debouncedSearch}
                    kindergartenId={selectedKindergaraden}
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
}

interface SettingsHeaderProps {
    kindergartens: Kindergarten[];
    selectedKindergarten: string;
    selectedRole: string;
    onKindergartenChange: (id: string) => void;
    onRoleChange: (role: string) => void;
    onSearchChange: (value: string) => void;
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
                <Grid item xs={12} sm={4}>
                    <SearchInput onChange={props.onSearchChange} />
                </Grid>
                <Grid item xs={12} sm={4}>
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
                    <Grid item xs={12} sm={4}>
                        <AdminKindergardenSelect
                            label={t(`${T_PREFIX}.search-label`)}
                            value={props.selectedKindergarten}
                            options={kindergartenOptions}
                            onChange={props.onKindergartenChange}
                        />
                    </Grid>
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
