import React, { FC } from 'react';
// import Slider from 'react-slick';
import { makeStyles } from '@material-ui/core';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import Carousel from 'react-material-ui-carousel';
import { Grid } from '@material-ui/core';
import clsx from 'clsx';
import { getChunks } from '../../../utils/chunkArray';

export const ArticleCarousel: FC = ({ children }) => {
    const classes = useStyles();

    const elements = React.Children.toArray(children);
    const grouped = getChunks(elements, 3);

    return (
        <Carousel autoPlay={false} className={classes.container}>
            {grouped.map((items, groupIndex) => (
                <Grid container direction="row" spacing={3} key={groupIndex}>
                    {items.map((item, index) => (
                        <Grid
                            item
                            md={4}
                            sm={6}
                            key={index}
                            className={clsx({
                                [classes.firstItem]: index === 0,
                                [classes.lastItem]: index === items.length - 1,
                            })}
                        >
                            {item}
                        </Grid>
                    ))}
                </Grid>
            ))}
        </Carousel>
    );
};

const useStyles = makeStyles({
    container: {
        width: '100%',
    },
    firstItem: {
        paddingLeft: '0 !important',
    },
    lastItem: {
        paddingRight: '0 !important',
    },
});
