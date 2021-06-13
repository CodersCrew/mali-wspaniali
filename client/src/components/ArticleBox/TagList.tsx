import { createStyles, makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { ButtonPrimary } from '../Button';
import { useIsDevice } from '../../queries/useBreakpoints';

interface Props {
    tags: string[];
    isPreview?: boolean;
}

export const isArticlePreviewVisible = (isPreView: boolean, componentProperty: any) => {
    if (componentProperty || (!componentProperty && !isPreView)) return false;

    return true;
};

export function TagList({ tags, isPreview }: Props) {
    const classes = useStyles();
    const { isMobile } = useIsDevice();
    const { t } = useTranslation();

    const previousTag = [1, 2, 3].map((index: number) => {
        return t(`admin-articles.tags.tag${index}`);
    });

    const isTags = tags?.length > 0;
    const allTags = isTags ? tags : previousTag;

    return (
        <>
            {allTags.map((tag, index) => {
                return (
                    <ButtonPrimary
                        key={`${tag} ${index}`}
                        variant="contained"
                        disableElevation
                        className={clsx({
                            [classes.contentTagsButton]: true,
                            [classes.contentTagsButtonMobile]: isMobile,
                            [classes.disabled]: !isTags,
                        })}
                        innerText={`#${tag}`}
                    />
                );
            })}
        </>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        contentTagsButton: {
            color: theme.palette.text.primary,
            borderRadius: theme.spacing(2),
            margin: theme.spacing(0, 2, 0, 0),
        },
        contentTagsButtonMobile: {
            margin: theme.spacing(2, 2, 0, 0),
        },
        disabled: {
            opacity: '0.5',
        },
    }),
);
