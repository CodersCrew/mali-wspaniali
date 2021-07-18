import { CreateUserHandler } from './create_user_handler';
import { LoginUserHandler } from './login_user_handler';
import { AddChildHandler } from './add_child_handler';
import { ChangePasswordHandler } from './change_password_handler';
import { ResetPasswordHandler } from './reset_password_handler';
import { ChangeUserAgreementHandler } from './change_user_agreement_handler';
import { EditChildHandler } from './edit_child_handler';
import { CreateAssessmentResultHandler } from './create_assessment_result_handler';
import { UpdateAssessmentResultHandler } from './update_assessment_result_handler';
import { AnonymizeUserHandler } from './anonymize_user_handler';
import { UpdateUserHandler } from './update_user_handler';

import { CreateConfirmationRequestHandler } from './create_confirmation_request_handler';
export { CreateUserHandler } from './create_user_handler';
export { LoginUserHandler } from './login_user_handler';
export { AddChildHandler } from './add_child_handler';
export { ChangePasswordHandler } from './change_password_handler';
export { ResetPasswordHandler } from './reset_password_handler';
export { ChangeUserAgreementHandler } from './change_user_agreement_handler';
export { EditChildHandler } from './edit_child_handler';
export { UpdateAssessmentResultHandler } from './update_assessment_result_handler';
export { AnonymizeUserHandler } from './anonymize_user_handler';

export const CommandHandlers = [
  CreateUserHandler,
  LoginUserHandler,
  AddChildHandler,
  EditChildHandler,
  CreateAssessmentResultHandler,
  UpdateAssessmentResultHandler,
  ChangePasswordHandler,
  ResetPasswordHandler,
  ChangeUserAgreementHandler,
  AnonymizeUserHandler,
  UpdateUserHandler,
  CreateConfirmationRequestHandler,
];
