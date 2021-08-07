import { Box, Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { CustomContainer } from '../../../components/CustomContainer';
import { Article } from '../../../graphql/types';
import { CommonTextField } from '../Components/CommonTextFiled';

export function AuthorInformationPanel(props: { value: Article; onChange: (key: string, value: string) => void }) {
    const T_PREFIX = 'add-article.author-information-form';
    const { t } = useTranslation();

    return (
        <CustomContainer
            header={<Typography variant="h3">Informacje o autorze</Typography>}
            container={
                <Box p={2}>
                    <Box mb={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <CommonTextField
                                    value={props.value.redactor.firstName}
                                    label={t(`${T_PREFIX}.first-name`)}
                                    onChange={(value) => props.onChange('firstName', value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <CommonTextField
                                    value={props.value.redactor.lastName}
                                    label={t(`${T_PREFIX}.last-name`)}
                                    onChange={(value) => props.onChange('lastName', value)}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box mb={2}>
                        <CommonTextField
                            value={props.value.redactor.profession}
                            label={t(`${T_PREFIX}.profession`)}
                            onChange={(value) => props.onChange('profession', value)}
                        />
                    </Box>
                    <Box mb={2}>
                        <CommonTextField
                            value={props.value.redactor.avatarUrl}
                            label={t(`${T_PREFIX}.avatar-url`)}
                            onChange={(value) => props.onChange('avatarUrl', value)}
                        />
                    </Box>
                    <CommonTextField
                        value={props.value.redactor.biography}
                        label={t(`${T_PREFIX}.biography`)}
                        onChange={(value) => props.onChange('biography', value)}
                        options={{ multiline: true }}
                    />
                </Box>
            }
        />
    );
}
