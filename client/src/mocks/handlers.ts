import { graphql } from 'msw';
import { getAssessmentMock } from '@app/utils/testing/getAssessmentMock';
import { getChildMock } from '@app/utils/testing/getChildMock';
import { getCurrentParamMock } from '@app/utils/testing/getCurrentParamMock';
import { getResultMock } from '@app/utils/testing/getResultMock';

export const handlers = [
    graphql.query('Result', (req, res, ctx) => {
        return res(
            ctx.data({
                result: {
                    ...getResultMock(),
                    assessment: getAssessmentMock(),
                    currentParams: getCurrentParamMock(),
                    child: getChildMock(),
                },
            }),
        );
    }),
];
