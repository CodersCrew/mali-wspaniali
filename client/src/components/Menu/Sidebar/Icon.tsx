import React from 'react';
import { makeStyles } from '@material-ui/core/';

import { Sex } from '../../../graphql/types';
import BoyAvatar from '../../../assets/boy.svg';
import GirlAvatar from '../../../assets/girl.svg';

export function ChildAvatar({ sex }: { sex: Sex }) {
    const classes = useStyles();
    const avatar = sex === 'male' ? BoyAvatar : GirlAvatar;

    return (
        <div className={classes.avatarWrapper}>
            <img src={avatar} className={classes.avatar} />
        </div>
    );
}

export function Icon({ icon }: { icon: React.ReactNode }) {
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
        height: 24,
        '&> img': {
            objectFit: 'contain',
        },
    },
});
