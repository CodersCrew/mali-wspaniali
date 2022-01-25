import { ResultPreview } from '../ResultPreview';
import { renderWithMock } from '@app/utils/testing/renderWithMockedProvider';
import { translationOf } from '@app/utils/testing/isTranslationOf';

describe('ResultPreview', () => {
    describe('when result exists', () => {
        it('renders preview with test stages', async () => {
            await renderWithMock(<ResultPreview resultId="my-result-id" />);

            expect(document.querySelector('section:nth-of-type(1) h4')?.textContent).toBe(
                translationOf('child-profile.initial-test'),
            );

            expect(document.querySelector('section:nth-of-type(2) h4')?.textContent).toBe(
                translationOf('child-profile.final-test'),
            );
        });
    });
});
