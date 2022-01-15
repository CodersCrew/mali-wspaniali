import { createContext } from 'react';

import { AssessmentResult } from '../../graphql/types';

export const ResultContext = createContext<AssessmentResult | null>(null);
