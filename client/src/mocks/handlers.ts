import { graphql, GraphQLRequest } from 'msw';
import { getAssessmentMock } from '@app/utils/testing/getAssessmentMock';
import { getChildMock } from '@app/utils/testing/getChildMock';
import { getCurrentParamMock } from '@app/utils/testing/getCurrentParamMock';
import { getResultMock } from '@app/utils/testing/getResultMock';
import { Assessment } from '@app/graphql/types';

export const handlers = [
    graphql.query('Result', (req: GraphQLRequest<{ id: string }>, res, ctx) => {
        const reqVariables = req.body!.variables as { id: string };

        return res(
            ctx.data({
                result: {
                    ...getResultMock(),
                    assessment: getAssessmentMock(getAssessmentChange(reqVariables.id)),
                    currentParams: getCurrentParamMock(),
                    child: getChildMock(),
                },
            }),
        );
    }),
];

function getAssessmentChange(id: string): Partial<Assessment> {
    if (id === 'only-first-done') {
        return { firstMeasurementStatus: 'done', lastMeasurementStatus: 'active' };
    }

    if (id === 'only-last-done') {
        return { firstMeasurementStatus: 'active', lastMeasurementStatus: 'done' };
    }

    return { firstMeasurementStatus: 'done', lastMeasurementStatus: 'done' };
}
