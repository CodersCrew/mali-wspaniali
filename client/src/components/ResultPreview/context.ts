import { AssessmentResult } from '../../graphql/types';

export const ResultContext = React.createContext<AssessmentResult | null>(null);
