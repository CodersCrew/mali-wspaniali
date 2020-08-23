import React, { useState } from 'react';
import { Collapse, List, Divider } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { SingleItemProps, SingleItem } from './SingleItem';

interface Props {
    mainItem: SingleItemProps;
    subItems: SingleItemProps[];
    onClick: (link: string) => void;
}

export function CollapsibleList({ mainItem, subItems, onClick }: Props) {
    const [isOpen, setIsOpen] = useState(mainItem.active);

    return (
        <>
            <SingleItem
                item={{
                    name: mainItem.name,
                    icon: mainItem.icon,
                    rightIcon: isOpen ? <ExpandLess /> : <ExpandMore />,
                    active: mainItem.active,
                }}
                onClick={() => setIsOpen(prev => !prev)}
            />
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {subItems.map(({ name, icon, link, active }) => (
                        <SingleItem
                            key={name}
                            item={{ name, icon, link, active }}
                            onClick={() => link && onClick(link)}
                            leftPadding
                        />
                    ))}
                </List>
            </Collapse>
            <Divider />
        </>
    );
}
