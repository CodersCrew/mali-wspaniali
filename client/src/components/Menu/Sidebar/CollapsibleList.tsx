import { useState } from 'react';
import { Collapse, List, makeStyles } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { SingleItemProps, SingleItem } from './SingleItem';

interface Props {
    mainItem: SingleItemProps;
    subItems: SingleItemProps[];
    onClick: (link: string) => void;
}

export function CollapsibleList({ mainItem, subItems, onClick }: Props) {
    const [isOpen, setIsOpen] = useState(mainItem.active);
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <SingleItem
                item={{
                    name: mainItem.name,
                    icon: mainItem.icon,
                    rightIcon: isOpen ? <ExpandLess /> : <ExpandMore />,
                    active: mainItem.active,
                    preload: mainItem.preload,
                }}
                onClick={() => setIsOpen((prev) => !prev)}
                grayed
            />
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {subItems.map((item) => (
                        <SingleItem
                            key={item.name}
                            item={item}
                            onClick={() => item.link && onClick(item.link)}
                            leftPadding
                            grayed
                        />
                    ))}
                </List>
            </Collapse>
        </div>
    );
}

const useStyles = makeStyles({
    container: {
        marginTop: 4,
        marginBottom: 4,
    },
});
