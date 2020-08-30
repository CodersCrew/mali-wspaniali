import { FetchResult } from 'apollo-boost';
import { ReturnedStatus, UserInput } from '../graphql/types';
import * as UserRepository from '../graphql/userRepository';

export const createUser = (
    user: UserInput,
): Promise<FetchResult<ReturnedStatus>> => {
    return UserRepository.createUser(user);
};
