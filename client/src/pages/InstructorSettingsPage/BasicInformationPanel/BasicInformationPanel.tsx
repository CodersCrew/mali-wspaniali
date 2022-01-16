import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { OutlinedTextField } from '../../../components/OutlinedTextField';
import { UpdatedUserInput } from '@app/graphql/types';

interface BasicInformationPanelProps {
    user: UpdatedUserInput;
    onChange: (key: string, value: string) => void;
}

export function BasicInformationPanel(props: BasicInformationPanelProps) {
    const { t } = useTranslation();

    return (
        <div>
            <Box mb={2}>
                <OutlinedTextField
                    value={props.user.firstname}
                    label={t('instructor-settings-page.basic-information-panel.first-name')}
                    onChange={(value) => props.onChange('firstname', value)}
                />
            </Box>
            <OutlinedTextField
                value={props.user.lastname}
                label={t('instructor-settings-page.basic-information-panel.last-name')}
                onChange={(value) => props.onChange('lastname', value)}
            />
        </div>
    );
}
