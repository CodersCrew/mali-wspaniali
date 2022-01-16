import { useState, useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import pick from 'lodash.pick';

import { activePage } from '../../apollo_client';
import { CustomContainer } from '../../components/CustomContainer';
import { PageContainer } from '../../components/PageContainer';
import { BasicInformationPanel } from './BasicInformationPanel/BasicInformationPanel';
import { ButtonSecondary } from '../../components/Button/ButtonSecondary';
import { useMe } from '../../utils/useMe';
import { useUpdateUser } from '../../operations/mutations/User/useUpdateUser';
import { UpdatedUserInput } from '@app/graphql/types';

export default function InstructorSettingsPage() {
    const { t } = useTranslation();
    const user = useMe();
    const { updateUser } = useUpdateUser();
    const [editedUser, setEditedUser] = useState<UpdatedUserInput>(
        pick(user, ['firstname', 'lastname']) as UpdatedUserInput,
    );

    useEffect(() => {
        activePage(['instructor-menu.settings']);
    }, []);

    if (!user) return null;

    return (
        <PageContainer>
            <CustomContainer
                header={
                    <Typography variant="h3">
                        {t('instructor-settings-page.basic-information-panel.title')}&nbsp;
                    </Typography>
                }
                container={
                    <Box p={2}>
                        <BasicInformationPanel
                            user={editedUser}
                            onChange={(key, value) => setEditedUser((prev) => ({ ...prev, [key]: value }))}
                        />
                    </Box>
                }
            />
            <Box mt={2} display="flex" justifyContent="flex-end">
                <ButtonSecondary
                    variant="contained"
                    onClick={() => {
                        updateUser(editedUser);
                    }}
                >
                    {t('instructor-settings-page.save')}
                </ButtonSecondary>
            </Box>
        </PageContainer>
    );
}
