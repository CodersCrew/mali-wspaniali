import useMuiTheme from '@material-ui/styles/useTheme';

import { Theme } from './types';

export const useTheme = () => useMuiTheme<Theme>();