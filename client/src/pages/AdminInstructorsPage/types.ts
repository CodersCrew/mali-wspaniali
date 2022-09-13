import { PrivilegedUser, Kindergarten } from '@app/graphql/types';

export type InstructorWithKindergartens = PrivilegedUser & { kindergartens: Kindergarten[] | null };
export type InstructorRelation = { instructor: PrivilegedUser; kindergartens: Kindergarten[] };
