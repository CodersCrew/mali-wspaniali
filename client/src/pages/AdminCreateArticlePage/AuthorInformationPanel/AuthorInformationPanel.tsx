import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import pick from 'lodash.pick';
import isEqual from 'lodash.isequal';

import { CustomContainer } from '../../../components/CustomContainer';
import { Article } from '../../../graphql/types';
import { OutlinedTextField } from '../../../components/OutlinedTextField';

export const AuthorInformationPanel = React.memo(
    function AuthorInformationPanel(props: {
        value: Article;
        onChange: (key: string, value: string | Record<string, string>) => void;
    }) {
        const T_PREFIX = 'add-article.author-information-form';
        const { t } = useTranslation();

        return (
            <CustomContainer
                header={<Typography variant="h3">{t(`${T_PREFIX}.title`)}</Typography>}
                container={
                    <Box p={2}>
                        <Box mb={2}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <OutlinedTextField
                                        value={props.value.redactor.firstName}
                                        label={t(`${T_PREFIX}.first-name`)}
                                        onChange={(value) =>
                                            props.onChange('redactor', { ...props.value.redactor, firstName: value })
                                        }
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <OutlinedTextField
                                        value={props.value.redactor.lastName}
                                        label={t(`${T_PREFIX}.last-name`)}
                                        onChange={(value) =>
                                            props.onChange('redactor', { ...props.value.redactor, lastName: value })
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box mb={2}>
                            <OutlinedTextField
                                value={props.value.redactor.profession}
                                label={t(`${T_PREFIX}.profession`)}
                                onChange={(value) =>
                                    props.onChange('redactor', { ...props.value.redactor, profession: value })
                                }
                            />
                        </Box>
                        <Box mb={2}>
                            <OutlinedTextField
                                value={props.value.redactor.avatarUrl}
                                label={t(`${T_PREFIX}.avatar-url`)}
                                onChange={(value) =>
                                    props.onChange('redactor', { ...props.value.redactor, avatarUrl: value })
                                }
                            />
                        </Box>
                        <OutlinedTextField
                            value={props.value.redactor.biography}
                            label={t(`${T_PREFIX}.biography`)}
                            onChange={(value) =>
                                props.onChange('redactor', { ...props.value.redactor, biography: value })
                            }
                            options={{ multiline: true, minRows: 7 }}
                        />
                    </Box>
                }
            />
        );
    },
    (prev, next) => {
        const toCompare = ['firstName', 'lastName', 'profession', 'avatarUrl', 'biography'];

        return isEqual(pick(prev.value.redactor, toCompare), pick(next.value.redactor, toCompare));
    },
);
