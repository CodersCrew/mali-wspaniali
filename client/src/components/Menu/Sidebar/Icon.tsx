import React from 'react';
import { makeStyles, Avatar } from '@material-ui/core/';

import { Sex } from '../../../graphql/types';
import BoyAvatar from '../../../assets/boy.png';
import GirlAvatar from '../../../assets/girl.png';

export function ChildAvatar({ sex }: { sex: Sex }) {
    const classes = useStyles();
    const avatar = sex === 'male' ? BoyAvatar : GirlAvatar;

    return (
        <div className={classes.avatarWrapper}>
            <Avatar src={avatar} className={classes.avatar} variant="square" />
        </div>
    );
}

export function Icon({ icon }: { icon: JSX.Element }) {
    const classes = useStyles();

    return <div className={classes.avatarWrapper}>{icon}</div>;
}

const useStyles = makeStyles({
    avatarWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '4px',
        width: 28,
        height: 28,
    },
    avatar: {
        width: 24,
        height: 24,
        '&> img': {
            objectFit: 'contain',
        },
    },
});
