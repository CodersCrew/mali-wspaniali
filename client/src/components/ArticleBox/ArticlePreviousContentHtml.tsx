import { useTranslation } from 'react-i18next';
import { Typography, Box } from '@material-ui/core';

import { htmlContent } from './utils';

type DataType = {
    text: string;
    marginBottom: number;
};

export const ArticlePreviousContentHtml = () => {
    const { t } = useTranslation();

    return (
        <>
            {htmlContent.map(({ text, marginBottom }: DataType) => (
                <Box key={text} mb={marginBottom}>
                    <Typography variant="body1">{t(`admin-articles.html-content.${text}`)}</Typography>
                </Box>
            ))}
        </>
    );
};
