import { PrivilegedUser, Kindergarten, PrivilegedUserSimplified } from '@app/graphql/types';

export type InstructorWithKindergartens = PrivilegedUser & { kindergartens: Kindergarten[] | null };
export type InstructorRelation = { instructor: PrivilegedUserSimplified; kindergartens: Kindergarten[] };
