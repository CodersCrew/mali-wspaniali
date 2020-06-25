import React, { FC } from 'react';
import Slider from 'react-slick';
import { makeStyles } from '@material-ui/core';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const ArticleCarousel: FC = ({ children }) => {
    const classes = useStyles();
    // test
    const settings = {
        infinite: false,
        speed: 500,
        variableWidth: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        className: classes.container,
    };

    return <Slider {...settings}>{children}</Slider>;
};

const useStyles = makeStyles({
    container: {
        width: '97%',
    },
});
