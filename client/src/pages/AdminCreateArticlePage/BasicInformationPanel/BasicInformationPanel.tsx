import { Typography, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { CustomContainer } from '../../../components/CustomContainer';
import { CommonSelectField } from '../Components/CommonSelectFiled';
import { CommonTextField } from '../Components/CommonTextFiled';

export function BasicInformationPanel(props: { onChange: (key: string, value: string) => void }) {
    const { t } = useTranslation();
    const T_PREFIX = 'add-article.basic-information-form';

    return (
        <CustomContainer
            header={<Typography variant="h3">{t(`${T_PREFIX}.title`)}</Typography>}
            container={
                <Box p={2}>
                    <Box mb={2}>
                        <CommonTextField
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
                            label={t(`${T_PREFIX}.picture-url`)}
                            onChange={(value) => props.onChange('pictureUrl', value)}
                        />
                    </Box>
                    <CommonTextField
                        label={t(`${T_PREFIX}.description`)}
                        onChange={(value) => props.onChange('desciption', value)}
                    />
                </Box>
            }
        />
    );
}
