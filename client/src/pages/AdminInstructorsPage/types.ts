import { PrivilegedUser, Kindergarten } from '../../graphql/types';

export type InstructorWithKindergartens = PrivilegedUser & { kindergartens: Kindergarten[] | null };
