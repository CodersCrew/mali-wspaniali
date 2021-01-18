import * as yup from 'yup';

import { AddChildResult, ChildInput } from '../../graphql/types';

export const initialValues: AddChildResult = {
    firstname: '',
    lastname: '',
    sex: '',
    'birth-date': '',
    'birth-quarter': '',
    kindergarten: '',
};

export const validationSchema = yup.object({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    sex: yup.string().required(),
    'birth-date': yup.string().required(),
    'birth-quarter': yup.string().required(),
    kindergarten: yup.string().required(),
});

export const normalizeChild = (child: AddChildResult): ChildInput => {
    return {
        firstname: child.firstname,
        lastname: child.lastname,
        birthYear: parseInt(child['birth-date'], 10),
        birthQuarter: parseInt(child['birth-quarter'], 10),
        sex: child.sex,
        kindergartenId: child.kindergarten,
    };
};
