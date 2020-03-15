import * as functions from 'firebase-functions';
import { authRepository } from '../repository/authRepository';

export const setParentRole = functions.firestore
  .document('user/{userId}')
  .onCreate((event, context) => {
    const { userId } = context.params;
    const parentRole = authRepository(userId).setParentRole();
    return parentRole;
  });
