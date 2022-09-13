import { Typography, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';

import { CustomContainer } from '../../../components/CustomContainer';
import { CommonSelectField } from '../Components/CommonSelectFiled';
import { OutlinedTextField } from '../../../components/OutlinedTextField';
import { articleStore } from '../ArticleCreator/ArticleCreatorStore';

export const BasicInformationPanel = observer(function BasicInformationPanel() {
    const { t } = useTranslation();
    const T_PREFIX = 'add-article.basic-information-form';
    const { article, update } = articleStore;

    if (!article) return null;

    return (
        <CustomContainer
            header={<Typography variant="h3">{t(`${T_PREFIX}.title`)}</Typography>}
            container={
                <Box p={2}>
                    <Box mb={2}>
                        <OutlinedTextField
                            value={article.title}
                            label={t(`${T_PREFIX}.form-title`)}
                            onChange={(value) => update('title', value)}
                        />
                    </Box>
                    <Box mb={2}>
                        <CommonSelectField
                            label={t(`${T_PREFIX}.category`)}
                            value={article.category}
                            options={createCategoryOptions()}
                            onChange={(value) => update('category', value)}
                        />
                    </Box>
                    <Box mb={2}>
                        <OutlinedTextField
                            value={article.pictureUrl}
                            label={t(`${T_PREFIX}.picture-url`)}
                            onChange={(value) => update('pictureUrl', value)}
                        />
                    </Box>
                    <OutlinedTextField
                        value={article.description}
                        label={t(`${T_PREFIX}.description`)}
                        onChange={(value) => update('description', value)}
                        options={{ multiline: true, minRows: 7 }}
                    />
                </Box>
            }
        />
    );

    function createCategoryOptions() {
        return ['emotions', 'activity', 'food', 'other'].map((c) => ({
            label: t(`${T_PREFIX}.categories.${c}`),
            value: c,
        }));
    }
});
