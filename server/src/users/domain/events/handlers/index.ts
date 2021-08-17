import { UserCreatedHandler } from './user_created_handler';
import { ChildCreatedHandler } from './child_created_handler';
import { UserSignedAgreementHandler } from './user_signed_agreement_handler';
import { UserUnsignedAgreementHandler } from './user_unsigned_agreement_handler';
import { UserUpdatedHandler } from './user_updated_handler';
import { UserAnonymizedHandler } from './user_anonymized_handler';
import { ChildUpdatedHandler } from './child_updated_handler';
import { ChildAssessmentResultCreatedHandler } from './child_assessment_result_created_handler';
import { ChildAssessmentResultUpdatedHandler } from './child_assessment_result_updated_handler';
import { UserConfirmedHandler } from './user_confirmed_handler';

export const EventHandlers = [
  UserCreatedHandler,
  UserConfirmedHandler,
  ChildCreatedHandler,
  ChildUpdatedHandler,
  UserSignedAgreementHandler,
  UserUnsignedAgreementHandler,
  UserUpdatedHandler,
  UserAnonymizedHandler,
  ChildAssessmentResultCreatedHandler,
  ChildAssessmentResultUpdatedHandler,
];
