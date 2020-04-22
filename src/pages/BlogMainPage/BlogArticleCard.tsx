import React from 'react';
import { Card, CardMedia, CardContent, Typography, makeStyles, Button } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import { theme } from '../../theme';

const useStyles = makeStyles({
    card: {
        maxWidth: '30%',
        maxHeight: '100%',
        overflow: 'visible',
        backgroundColor: '#e9e9e9',
        borderRadius: '4px',
        position: 'absolute'
    },
    cardIamge: {
        width: '90%',
        height: '240px',
        margin: '0 auto',
        position: 'relative',
        bottom: '30px'
    },
    cardContent: {
        position: 'relative',
        bottom: '20px',
    },
    articleTitle: {
        position: 'relative',
        bottom: '10px',
        fontSize: '15px',
        fontWeight: 'bold'
    },
    readMoreButton: {
        color: 'white',
        fontSize: '13px',
        position: 'absolute',
        right: '10px',
        marginBottom: '5%',
        whiteSpace: 'nowrap'
    }
});

export const BlogArticleCard = () => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <div>
                <Card className={classes.card} elevation={0}>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        image="https://images.unsplash.com/photo-1504450874802-0ba2bcd9b5ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
                        title="Contemplative Reptile"
                        className={classes.cardIamge}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2" className={classes.articleTitle}>
                            Tutaj będzie nazwa, która jest przeważnie bardzo długa
                        </Typography>
                        <Typography variant="body2" component="p">
                            Tutaj będzie zwykły tekst ok. do 2 zdań. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.
                        </Typography>
                    </CardContent>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<SendIcon />}
                        className={classes.readMoreButton}
                        disableElevation
                    >
                        CZYTAJ DALEJ
                    </Button>
                </Card>
            </div>
        </ThemeProvider>
    );
}