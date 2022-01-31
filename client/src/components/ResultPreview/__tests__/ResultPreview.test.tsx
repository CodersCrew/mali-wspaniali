import { screen } from '@testing-library/dom';

import { translationOf } from '@app/utils/testing/isTranslationOf';
import { renderWithMock } from '@app/utils/testing/renderWithMockedProvider';

import { ResultPreview } from '../ResultPreview';

describe('ResultPreview', () => {
    describe('when result exists', () => {
        it('renders preview with test stages and summary', async () => {
            await renderWithMock(<ResultPreview resultId="my-result-id" />);

            expect(screen.queryByText(translationOf('child-profile.initial-test'))).toBeDefined();
            expect(screen.queryByText(translationOf('child-profile.final-test'))).toBeDefined();
            expect(screen.queryByText(translationOf('child-profile.test-result'))).toBeDefined();
        });

        describe('and assessment is partly done', () => {
            it('renders preview with only the first measurement', async () => {
                await renderWithMock(<ResultPreview resultId="only-first-done" />);

                expect(screen.queryByText(translationOf('child-profile.initial-test'))).toBeDefined();
                expect(screen.queryByText(translationOf('child-profile.final-test'))).toBeNull();
                expect(screen.queryByText(translationOf('child-profile.test-result'))).toBeNull();
            });

            it('renders preview with only the last measurement', async () => {
                await renderWithMock(<ResultPreview resultId="only-last-done" />);

                expect(screen.queryByText(translationOf('child-profile.initial-test'))).toBeNull();
                expect(screen.queryByText(translationOf('child-profile.final-test'))).toBeDefined();
                expect(screen.queryByText(translationOf('child-profile.test-result'))).toBeNull();
            });
        });
    });
});
