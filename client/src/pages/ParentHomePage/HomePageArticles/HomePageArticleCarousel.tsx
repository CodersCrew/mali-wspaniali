import React, { FC } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Grid } from '@material-ui/core';
import { getChunks } from '../../../utils/chunkArray';

export const ArticleCarousel: FC = ({ children }) => {
    const elements = React.Children.toArray(children);
    const grouped = getChunks(elements, 3);

    return (
        <Carousel autoPlay={false}>
            {grouped.map((items, groupIndex) => (
                <Grid container direction="row" spacing={3} key={groupIndex}>
                    {items.map((item, index) => (
                        <Grid item md={4} sm={6} key={index}>
                            {item}
                        </Grid>
                    ))}
                </Grid>
            ))}
        </Carousel>
    );
};
