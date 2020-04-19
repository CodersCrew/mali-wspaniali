import React from 'react';
import { Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';
import { cardBackgroundColor } from '../../colors';

export const ParentHomeInfo = () => {
    const classes = useStyles();
    const { infoContainer, infoParentCard, infoWrapper, infoImage, infoCloseIcon, infoTitle } = classes;

    const parents = [
        {
            name: 'Władysław',
            img: <img src={require('../../img/mali_wspaniali_boy.png')} alt="mali_wspaniali_boy" />,
        },
        {
            name: 'Małgorzata',
            img: <img src={require('../../img/mali_wspaniali_girl.png')} alt="mali_wspaniali_boy" />,
        },
    ];

    return (
        <div className={infoContainer}>
            {parents.map(parent => (
                <div className={infoParentCard} key={parent.name}>
                    <span>{parent.img}</span>
                    <span>{parent.name}</span>
                </div>
            ))}
            <div className={infoWrapper}>
                <span className={infoImage}>
                    <img src={require('../../img/mali_wspaniali_info.png')} alt="mali_wspaniali_boy" />
                </span>
                <div>
                    <span>
                        <Close className={infoCloseIcon} />
                    </span>
                    <p className={infoTitle}>Tutaj Nagłówek Fundacji</p>
                    <span>
                        Tutaj będzie krótkie wprowadzenie od Fundacji. Lorem Ipsum is simply dummy text of the printing
                        and typesetting industry. Lorem Ipsum has been the.Lorem Ipsum is simply dummy text of the
                        printing and typesetting industry. Lorem Ipsum has been the. Lorem Ipsum is simply dummy text of
                        the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and
                    </span>
                </div>
            </div>
        </div>
    );
};

const useStyles = makeStyles({
    infoContainer: {
        display: 'flex',
        marginBottom: 40,
        padding: '0 50px 0 0',
    },
    infoParentCard: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '0 9px 12px 8px',
        alignItems: 'center',
        marginRight: 35,
        background: cardBackgroundColor,
        boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.15)',
        borderRadius: '4px',
        fontWeight: 'bold',
        maxWidth: '121px',
        maxHeight: '163px',
    },
    infoWrapper: {
        display: 'flex',
        boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.15)',
        borderRadius: '4px',
        background: cardBackgroundColor,
        padding: '20px 14px 20px 15px',
        position: 'relative',
        maxHeight: '163px',
    },
    infoImage: {
        marginRight: 15,
    },
    infoTitle: {
        margin: 0,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    infoCloseIcon: {
        width: 14,
        height: 14,
        position: 'absolute',
        top: 14,
        right: 14,
        cursor: 'pointer',
    },
});
