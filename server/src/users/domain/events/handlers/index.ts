import { UserCreatedHandler } from './user_created_handler';
import { ChildCreatedHandler } from './child_created_handler';
import { UserSignedAgreementHandler } from './user_signed_agreement_handler';
import { UserUnsignedAgreementHandler } from './user_unsigned_agreement_handler';
import { UserDeletedHandler } from './user_deleted_handler';
import { UserUpdatedHandler } from './user_updated_handler';
import { UserAnonymizedHandler } from './user_anonymized_handler';
import { ChildUpdatedHandler } from './child_updated_handler';

export const EventHandlers = [
  UserCreatedHandler,
  ChildCreatedHandler,
  ChildUpdatedHandler,
  UserSignedAgreementHandler,
  UserUnsignedAgreementHandler,
  UserDeletedHandler,
  UserUpdatedHandler,
  UserAnonymizedHandler,
];
