import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { CustomContainer } from '../../../components/CustomContainer';
import { Article } from '../../../graphql/types';
import { CommonSelectField } from '../Components/CommonSelectFiled';
import { CommonTextField } from '../Components/CommonTextFiled';

export const BasicInformationPanel = React.memo(
    function BasicInformationPanel(props: { value: Article; onChange: (key: string, value: string) => void }) {
        const { t } = useTranslation();
        const T_PREFIX = 'add-article.basic-information-form';

        return (
            <CustomContainer
                header={<Typography variant="h3">{t(`${T_PREFIX}.title`)}</Typography>}
                container={
                    <Box p={2}>
                        <Box mb={2}>
                            <CommonTextField
                                value={props.value.title}
                                label={t(`${T_PREFIX}.form-title`)}
                                onChange={(value) => props.onChange('title', value)}
                            />
                        </Box>
                        <Box mb={2}>
                            <CommonSelectField
                                label={t(`${T_PREFIX}.category`)}
                                options={[
                                    { label: t(`${T_PREFIX}.categories.emotions`), value: 'emotions' },
                                    { label: t(`${T_PREFIX}.categories.activity`), value: 'activity' },
                                    { label: t(`${T_PREFIX}.categories.food`), value: 'food' },
                                    { label: t(`${T_PREFIX}.categories.other`), value: 'other' },
                                ]}
                                onChange={(value) => props.onChange('category', value)}
                            />
                        </Box>
                        <Box mb={2}>
                            <CommonTextField
                                value={props.value.pictureUrl}
                                label={t(`${T_PREFIX}.picture-url`)}
                                onChange={(value) => props.onChange('pictureUrl', value)}
                            />
                        </Box>
                        <CommonTextField
                            value={props.value.description}
                            label={t(`${T_PREFIX}.description`)}
                            onChange={(value) => props.onChange('description', value)}
                            options={{ multiline: true }}
                        />
                    </Box>
                }
            />
        );
    },
    (prev, next) => {
        return (
            prev.value.title === next.value.title &&
            prev.value.category === next.value.category &&
            prev.value.pictureUrl === next.value.pictureUrl &&
            prev.value.description === next.value.description
        );
    },
);
