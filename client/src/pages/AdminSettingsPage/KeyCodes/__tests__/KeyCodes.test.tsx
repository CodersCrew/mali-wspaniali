import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { I18nextProvider } from 'react-i18next';

import { KeyCodes } from '../KeyCodes';
import { KEYCODE_SERIES } from '../../../../operations/queries/KeyCodes/getKeyCodesSeries';
import { awaitForRenderResponse } from '../../../../utils/testing/awaitForResponse';
import { translation } from '../../../../internationalization/i18n';
import { translationOf } from '../../../../utils/testing/isTranslationOf';

describe('KeyCodes', () => {
    describe('when loaded without historical keycodes', () => {
        beforeEach(async () => {
            renderPage(emptyKeyCodesList);

            await awaitForRenderResponse();
        });

        it('returns empty list', () => {
            expect(screen.getByTestId('total-keycodes')).toHaveTextContent(
                translationOf('admin-setting-page.keycode-generation.keycode-amount-total', { total: 0 }),
            );
            expect(screen.queryAllByTestId('keycode-item').length).toEqual(0);
        });
    });

    describe('when loaded with historical keycodes', () => {
        beforeEach(async () => {
            renderPage(populatedKeyCodesList);

            await awaitForRenderResponse();
        });

        it('returns populated list', () => {
            expect(screen.getByTestId('total-keycodes')).toHaveTextContent(
                translationOf('admin-setting-page.keycode-generation.keycode-amount-total', { total: 1 }),
            );
            expect(screen.queryAllByTestId('keycode-item').length).toEqual(1);
        });

        it('returns correct item', () => {
            const item = screen.queryAllByTestId('keycode-item')[0];

            expect(item.querySelector('button')).toHaveTextContent('mw-keycodes-RwNxRTO8TV.clsx');
            expect(within(item).getByTestId('keycode-item-target')).toHaveTextContent('instructor');
            expect(within(item).getByTestId('keycode-item-count')).toHaveTextContent('1');
        });
    });
});

function renderPage(mocks: MockedResponse[]) {
    return render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <I18nextProvider i18n={translation}>
                <KeyCodes />
            </I18nextProvider>
        </MockedProvider>,
    );
}

const emptyKeyCodesList = [
    {
        request: {
            query: KEYCODE_SERIES,
        },
        result: {
            data: {
                keyCodeSeries: [],
            },
        },
    },
];

const populatedKeyCodesList = [
    {
        request: {
            query: KEYCODE_SERIES,
        },
        result: {
            data: {
                keyCodeSeries: [
                    {
                        count: 1,
                        date: '2020-10-11T12:20:22.086Z',
                        series: 'RwNxRTO8TV',
                        target: 'instructor',
                    },
                ],
            },
        },
    },
];
