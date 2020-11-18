import { User, Kindergarten } from '../../graphql/types';

export type InstructorWithKindergartens = User & { kindergartens: Kindergarten[] | null };
