import { GetAllAssessmentHandler } from './get_all_assessments_handler';
import { GetAllAssessmentAssignedToInstructorHandler } from './get_all_assessments_assigned_to_instructor_handler';
import { GetAssessmentHandler } from './get_assessments_handler';

export const QueryHandlers = [
  GetAllAssessmentHandler,
  GetAllAssessmentAssignedToInstructorHandler,
  GetAssessmentHandler,
];
