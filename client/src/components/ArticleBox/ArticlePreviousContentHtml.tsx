import { useTranslation } from 'react-i18next';
import { Typography, Box } from '@material-ui/core';

type dataType = {
    text: string;
    variant: any;
    marginBottom: number;
};

const data = [
    { text: 'title', variant: 'h4', marginBottom: 2 },
    { text: 'first-paragraph', variant: 'body1', marginBottom: 2 },
    { text: 'second-paragraph', variant: 'body1', marginBottom: 2 },
    { text: 'third-paragraph', variant: 'body1', marginBottom: 2 },
    { text: 'fourth-paragraph', variant: 'body1', marginBottom: 0 },
];

export const ArticlePreviousContentHtml = () => {
    const { t } = useTranslation();

    return (
        <>
            {data.map(({ variant, text, marginBottom }: dataType) => (
                <Box key={text} mb={marginBottom}>
                    <Typography variant={variant}>{t(`admin-articles.html-content.${text}`)}</Typography>
                </Box>
            ))}
        </>
    );
};
