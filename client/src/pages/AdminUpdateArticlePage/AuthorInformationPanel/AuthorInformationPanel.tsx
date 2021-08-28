import { observer } from 'mobx-react-lite';
import { Box, Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { CustomContainer } from '../../../components/CustomContainer';
import { OutlinedTextField } from '../../../components/OutlinedTextField';
import { articleStore } from '../ArticleCreator/ArticleCreatorStore';

export const AuthorInformationPanel = observer(() => {
    const T_PREFIX = 'add-article.author-information-form';
    const { t } = useTranslation();
    const { article, updateRedactor } = articleStore;

    if (!article) return null;

    const { redactor } = article;

    return (
        <CustomContainer
            header={<Typography variant="h3">{t(`${T_PREFIX}.title`)}</Typography>}
            container={
                <Box p={2}>
                    <Box mb={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <OutlinedTextField
                                    value={redactor.firstName}
                                    label={t(`${T_PREFIX}.first-name`)}
                                    onChange={(value) => updateRedactor('firstName', value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <OutlinedTextField
                                    value={redactor.lastName}
                                    label={t(`${T_PREFIX}.last-name`)}
                                    onChange={(value) => updateRedactor('lastName', value)}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box mb={2}>
                        <OutlinedTextField
                            value={redactor.profession}
                            label={t(`${T_PREFIX}.profession`)}
                            onChange={(value) => updateRedactor('profession', value)}
                        />
                    </Box>
                    <Box mb={2}>
                        <OutlinedTextField
                            value={redactor.avatarUrl}
                            label={t(`${T_PREFIX}.avatar-url`)}
                            onChange={(value) => updateRedactor('avatarUrl', value)}
                        />
                    </Box>
                    <OutlinedTextField
                        value={redactor.biography}
                        label={t(`${T_PREFIX}.biography`)}
                        onChange={(value) => updateRedactor('biography', value)}
                        options={{ multiline: true, minRows: 7 }}
                    />
                </Box>
            }
        />
    );
});
