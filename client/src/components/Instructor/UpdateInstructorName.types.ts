import { FormikProps } from 'formik';

export type UpdateInstructorNameModalProps = {
    firstname: string;
    lastname: string;
    mail: string;
    preventClose?: boolean;
};

export type UpdateInstructorNameFormProps = {
    formik: FormikProps<UpdateInstructorNameModalProps>;
};
