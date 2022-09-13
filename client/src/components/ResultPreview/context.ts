import { createContext } from 'react';

import { AssessmentResult } from '@app/graphql/types';

export const ResultContext = createContext<AssessmentResult | null>(null);
