import React, { FC, useContext } from 'react';
import { AddChildModal } from '../components/AddChildModal/AddChildModal';

export const ParentWrapper: FC = ({ children }) => {
    return (
        <>
            <AddChildModal
                handleSubmit={data => console.log(data)}
            />
            {children}
        </>
    );
};
