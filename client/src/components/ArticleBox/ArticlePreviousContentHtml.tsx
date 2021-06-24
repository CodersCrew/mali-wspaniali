import { useTranslation } from 'react-i18next';
import { Typography, Box } from '@material-ui/core';

import { htmlContent } from './utils';

type dataType = {
    text: string;
    variant: any;
    marginBottom: number;
};

export const ArticlePreviousContentHtml = () => {
    const { t } = useTranslation();

    return (
        <>
            {htmlContent.map(({ variant, text, marginBottom }: dataType) => (
                <Box key={text} mb={marginBottom}>
                    <Typography variant={variant}>{t(`admin-articles.html-content.${text}`)}</Typography>
                </Box>
            ))}
        </>
    );
};
