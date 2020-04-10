import React from 'react';
import { makeStyles, Theme, createStyles, Grid, Button, Typography } from '@material-ui/core';
import { SingleArticleColors } from '../../colors';

export const DisplayPath = ({category, title}: {category: string, title: string}) => {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            pathText: {
                fontWeight: 'bold',
                letterSpacing: '2px',
                lineHeight: '1.17',
                margin: '0px 5px 0px 5px',
            },
            pathTitleContainer: {
                marginTop: '8px',
            },
            pathTitle: {
                color: SingleArticleColors.title,
                letterSpacing: '2px',
                lineHeight: '1.17',
                fontSize: '12px',
                padding: '1px 5px 0px 10px',
            },
            pathArrowContainer: {
                marginTop: '10px',
            },
            pathArrow: {
                border: 'solid',
                borderColor: SingleArticleColors.arrow,
                borderWidth: '0px 3px 3px 0px',
                padding: '4px',
                margin: '0px 5px 0px 5px',
                width: '5px',
                height: '5px',
                transform: 'rotate(-45deg)',
            },
        }),
    );
    const classes = useStyles();

    return (
        <>
            <Grid item xs={8}>
                <Grid container direction="row">
                    <Button href="#BLOG" disableElevation disableFocusRipple disableRipple disableTouchRipple>
                        <Typography className={classes.pathText}>BLOG</Typography>
                    </Button>
                    <div className={classes.pathArrowContainer}>
                        <Typography className={classes.pathArrow} />
                    </div>
                    <Button
                        href={`#${category.toUpperCase()}`}
                        disableElevation
                        disableFocusRipple
                        disableRipple
                        disableTouchRipple
                    >
                        <Typography className={classes.pathText}>{category.toUpperCase()}</Typography>
                    </Button>
                    <div className={classes.pathArrowContainer}>
                        <Typography className={classes.pathArrow} />
                    </div>
                    <div className={classes.pathTitleContainer}>
                        <Typography className={classes.pathTitle}>{title.toUpperCase()}</Typography>
                    </div>
                </Grid>
            </Grid>
        </>
    );
};
