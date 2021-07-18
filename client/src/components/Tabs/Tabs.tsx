import { Tabs as MuiTabs, makeStyles, createStyles, TabsProps, Theme } from '@material-ui/core';
import { useIsDevice } from '../../queries/useBreakpoints';
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
    const { isMobile } = useIsDevice();
    const classes = useStyles({ indicator, isMobile });

    return (
        <MuiTabs classes={classes} value={currentCategory} onChange={(_, v: string) => onTabsChange(v)} {...props}>
            {categories.map((category) => (
                <Tab key={category.value} {...category} />
            ))}
        </MuiTabs>
    );
};

type propStyle = {
    isMobile: boolean;
    indicator: string;
};
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        flexContainer: {
            alignItems: 'flex-end',
            backgroundColor: 'theme.palette.primary.contrastText',
            marginLeft: ({ isMobile }: propStyle) => (isMobile ? theme.spacing(1) : theme.spacing(3)),
        },
        indicator: {
            backgroundColor: ({ indicator }: propStyle) => indicator,
        },
        scrollButtons: {
            display: 'none',
        },
    }),
);
