import { gql } from '@apollo/client';

export const ASSESSMENTS_TITLES_QUERY = gql`
  query ASSESSMENTS_TITLES_QUERY {
    assessments {
      title
    }
  }
`;
