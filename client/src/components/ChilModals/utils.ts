import * as yup from 'yup';

import { AddChildResult } from './ChildModalTypes';


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

