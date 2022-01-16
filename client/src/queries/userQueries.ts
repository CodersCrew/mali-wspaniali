import { FetchResult } from 'apollo-boost';
import { ReturnedStatus, UserInput } from '@app/graphql/types';
import * as UserRepository from '@app/graphql/userRepository';

export const createUser = (user: UserInput): Promise<FetchResult<ReturnedStatus>> => {
    return UserRepository.createUser(user);
};
