import { screen, waitFor } from '@testing-library/dom';

import { translationOf } from '@app/utils/testing/isTranslationOf';
import { renderWithMock } from '@app/utils/testing/renderWithMockedProvider';

import { ResultPreview } from '../ResultPreview';

describe.skip('ResultPreview', () => {
    describe('when result exists', () => {
        it('renders preview with test stages and summary', async () => {
            await renderWithMock(<ResultPreview resultId="only-done" />);

            await waitFor(() => {
                expect(screen.queryByText(translationOf('child-profile.initial-test'))).toBeDefined();
                expect(screen.queryByText(translationOf('child-profile.final-test'))).toBeDefined();
                expect(screen.queryByText(translationOf('child-profile.test-result'))).toBeDefined();
            });
        });

        describe('and assessment is partly done', () => {
            it('renders preview with only the first measurement', async () => {
                await renderWithMock(<ResultPreview resultId="only-first-done" />);

                await waitFor(() => {
                    expect(screen.queryByText(translationOf('child-profile.initial-test'))).toBeDefined();
                    expect(screen.queryByText(translationOf('child-profile.final-test'))).toBeNull();
                    expect(screen.queryByText(translationOf('child-profile.test-result'))).toBeNull();
                });
            });

            it('renders preview with only the last measurement', async () => {
                await renderWithMock(<ResultPreview resultId="only-last-done" />);

                await waitFor(() => {
                    expect(screen.queryByText(translationOf('child-profile.initial-test'))).toBeNull();
                    expect(screen.queryByText(translationOf('child-profile.final-test'))).toBeDefined();
                    expect(screen.queryByText(translationOf('child-profile.test-result'))).toBeNull();
                });
            });
        });

        describe('and assessment is not started', () => {
            it('renders empty view', async () => {
                await renderWithMock(<ResultPreview resultId="only-not-done" />);

                await waitFor(() => {
                    expect(screen.queryByText(translationOf('child-profile.results-empty-view.title'))).toBeDefined();
                    expect(screen.queryByText(translationOf('child-profile.initial-test'))).toBeNull();
                    expect(screen.queryByText(translationOf('child-profile.final-test'))).toBeNull();
                    expect(screen.queryByText(translationOf('child-profile.test-result'))).toBeNull();
                });
            });
        });

        describe('and assessment is not found', () => {
            it('renders empty view', async () => {
                await renderWithMock(<ResultPreview resultId="only-not-found" />);

                await waitFor(() => {
                    expect(document.querySelector('div')).toBeEmptyDOMElement();
                    expect(screen.queryByText(translationOf('child-profile.results-empty-view.title'))).toBeNull();
                    expect(screen.queryByText(translationOf('child-profile.initial-test'))).toBeNull();
                    expect(screen.queryByText(translationOf('child-profile.final-test'))).toBeNull();
                    expect(screen.queryByText(translationOf('child-profile.test-result'))).toBeNull();
                });
            });
        });
    });
});
