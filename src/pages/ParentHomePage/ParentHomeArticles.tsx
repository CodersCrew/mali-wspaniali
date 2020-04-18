import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { cardBackgroundColor, activeColor } from '../../colors';

export const ParentHomeArticles = () => {
    const classes = useStyles();
    const {
        articleHeader,
        articlesList,
        articleCard,
        articleImg,
        articleInfo,
        articleTitle,
        articleButton,
        articleButtonIcon,
    } = classes;

    const articles = [
        {
            title: 'Tutaj będzie nazwa, która jest przeważnie bardzo długa',
            description:
                'Tutaj będzie zwykły tekst ok. do 2 zdań. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.',
            img: <img src='../../img/mali_wspaniali_img_one.png' alt="mali_wspaniali_img_one" />,
        },
        {
            title: 'Tutaj będzie nazwa, która jest przeważnie bardzo długa',
            description:
                'Tutaj będzie zwykły tekst ok. do 2 zdań. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.',
            img: <img src='../../img/mali_wspaniali_img_two.png' alt="mali_wspaniali_img_two" />,
        },
        {
            title: 'Tutaj będzie nazwa, która jest przeważnie bardzo długa',
            description:
                'Tutaj będzie zwykły tekst ok. do 2 zdań. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.',
            img: <img src= '../../img/mali_wspaniali_img_three.png' alt="mali_wspaniali_img_three" />,
        },
        {
            title: 'Tutaj będzie nazwa, która jest przeważnie bardzo długa',
            description:
                'Tutaj będzie zwykły tekst ok. do 2 zdań. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.',
            img: <img src='../../img/mali_wspaniali_img_one.png' alt="mali_wspaniali_img_one" />,
        },
        {
            title: 'Tutaj będzie nazwa, która jest przeważnie bardzo długa',
            description:
                'Tutaj będzie zwykły tekst ok. do 2 zdań. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.',
            img: <img src= '../../img/mali_wspaniali_img_one.png' alt="mali_wspaniali_img_one" />,
        },
    ];

    return (
        <>
            <span className={articleHeader}>Najnowsze ARTYKUŁY</span>
            <div className={articlesList}>
                {articles.map(article => (
                    <div className={articleCard} key={article.title}>
                        <span className={articleImg}>{article.img}</span>
                        <div className={articleInfo}>
                            <span className={articleTitle}>{article.title}</span>
                            <span>{article.description}</span>
                            <Button className={articleButton}>
                                <span className={articleButtonIcon}>
                                    <img
                                        src='../../img/mali_wspaniali_more_btn.svg'
                                        alt="mali_wspaniali_more"
                                    />
                                </span>
                                <span>Czytaj dalej</span>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

const useStyles = makeStyles({
    articleHeader: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 21,
    },
    articlesList: {
        display: 'flex',
        marginTop: 30,
    },
    articleCard: {
        textAlign: 'center',
        padding: '0 15px 15px 15px',
        background: cardBackgroundColor,
        marginRight: 60,
        boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.15)',
        borderRadius: '4px',
        marginTop: 26,
        maxWidth: '306px',
    },
    articleImg: {
        borderRadius: '4px',
        position: 'relative',
        top: '-26px',
    },
    articleInfo: {
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        marginTop: '-26px',
    },
    articleTitle: {
        marginTop: 6,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    articleButton: {
        padding: '4px 10px 4px 10px',
        background: activeColor,
        borderRadius: '4px',
        textTransform: 'uppercase',
        color: '#fff',
        fontSize: '13px',
        display: 'flex',
        alignSelf: 'flex-end',
        marginTop: 10,
    },
    articleButtonIcon: {
        marginRight: 9,
        display: 'flex',
    },
});
