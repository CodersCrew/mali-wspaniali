import React from 'react';

import { AssessmentResult } from '../../graphql/types';

export const ResultContext = React.createContext<AssessmentResult | null>(null);
