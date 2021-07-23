import { ListItem, ListItemIcon, ListItemText, Checkbox } from '@material-ui/core';

import { Kindergarten } from '../../../graphql/types';

interface Props {
    kindergartenItem: Kindergarten;
    checked: Kindergarten[];
    labelId: string;
    setChecked: React.Dispatch<React.SetStateAction<Kindergarten[]>>;
}

export const KindergartenListItem = ({ kindergartenItem, checked, labelId, setChecked }: Props) => {
    const handleToggle = (kindergarten: Kindergarten) => () => {
        const currentIndex = checked.indexOf(kindergarten);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(kindergarten);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <ListItem role="listitem" button onClick={handleToggle(kindergartenItem)}>
            <ListItemIcon>
                <Checkbox
                    checked={checked.indexOf(kindergartenItem) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                />
            </ListItemIcon>
            <ListItemText id={labelId} primary={kindergartenItem.name} />
        </ListItem>
    );
};
