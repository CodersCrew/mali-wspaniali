import { About } from './panels/About';
import { Conditions } from './panels/Conditions';
import { Results } from './panels/Results';
import { Interpretation } from './panels/Interpretation';

export const ChildProfileAboutTests = () => {
    return (
        <div>
            <About />
            <Conditions />
            <Results />
            <Interpretation />
        </div>
    );
};
