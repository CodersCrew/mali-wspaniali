import { Tabs as MuiTabs, makeStyles, createStyles, TabsProps, Theme } from '@material-ui/core';
import { Tab } from './Tab';

type Category = {
    label: string;
    value?: string;
};

interface Props extends TabsProps {
    categories: Category[];
    onTabsChange: (value: string) => void;
    currentCategory?: string;
    indicator: string;
}

export const Tabs = ({ currentCategory, onTabsChange, categories, indicator, ...props }: Props) => {
    const classes = useStyles({ indicator });

    return (
        <MuiTabs classes={classes} value={currentCategory} onChange={(_, v: string) => onTabsChange(v)} {...props}>
            {categories.map((category) => (
                <Tab key={category.label} {...category} />
            ))}
        </MuiTabs>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        flexContainer: {
            alignItems: 'flex-end',
            backgroundColor: 'theme.palette.primary.contrastText',
            marginLeft: theme.spacing(3),
        },
        indicator: {
            backgroundColor: ({ indicator }: { indicator: string }) => indicator,
        },
    }),
);
