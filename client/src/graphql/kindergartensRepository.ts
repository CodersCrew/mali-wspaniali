import { gql } from '@apollo/client';

export const KINDERGARTEN_WITH_CHILDRENS = gql`
    query KINDERGARTEN_WITH_CHILDRENS {
        kindergartens {
            _id
            name
            number
            children {
                firstname
                lastname
                parent {
                    mail
                    agreements {
                        text
                        isSigned
                    }
                }
            }
        }
    }
`;