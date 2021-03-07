import { useState } from 'react';
import { Typography, makeStyles, Theme, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { CustomContainer } from '../../components/CustomContainer';
import { AdminSettingsListContainers } from './AdminSettingsListContainer';
import { AdminKindergardenSelect } from './AdminKindergardenSelect';
import { useKindergartens } from '../../operations/queries/Kindergartens/getKindergartens';
import { mapKindergartenToOption } from '../../components/ChildForm/utils';
import { SearchInput } from './SearchInput';

export const AdminSettingsList = () => {
    const { t } = useTranslation();
    const { kindergartenList } = useKindergartens();
    const kindergartenOptions = kindergartenList.map(mapKindergartenToOption);
    const classes = useStyles();
    const [selectedKindergaraden, setSelectedKindergarden] = useState<string>('');

    const handleChange = (kindergardenId: string) => {
        setSelectedKindergarden(kindergardenId);
    };

    return (
        <div>
            <CustomContainer
                header={
                    <>
                        <Typography variant="h4">{t('parent-settings.header')}</Typography>
                        <Grid container spacing={3} className={classes.headerContainer}>
                            <Grid item xs={12} sm={3}>
                                <SearchInput />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <AdminKindergardenSelect
                                    label={t('parent-settings.search-label')}
                                    value={selectedKindergaraden}
                                    options={kindergartenOptions}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                    </>
                }
                container={
                    <div>
                        <AdminSettingsListContainers />
                    </div>
                }
            />
        </div>
    );
};
const useStyles = makeStyles((theme: Theme) => ({
    headerContainer: { marginTop: theme.spacing(3.5) },
}));
