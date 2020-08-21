import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { ButtonDefault } from '../../components/Button';

interface Props {
    tags: string[];
}

export const ArticleTags = ({ tags }: Props) => {
    const classes = useStyles();

    return (
        <div className={classes.contentTags}>
            {tags.map(tag => {
                return (
                    <ButtonDefault
                        key={`tag#${tags.indexOf(tag)}`}
                        variant="contained"
                        disableElevation
                        className={classes.contentTagsButton}
                        innerText={`#${tag}`}
                    />
                );
            })}
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        contentTags: {
            margin: '30px 0',
            display: 'flex',
            width: '100%',
            flexWrap: 'wrap',

            [theme.breakpoints.down('sm')]: {
                marginLeft: '10px',
            },
        },
        contentTagsButton: {
            margin: '10px',
            marginLeft: 0,
        },
    }),
);
