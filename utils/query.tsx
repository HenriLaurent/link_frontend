import { gql } from "@apollo/client";

export const GET_USER = gql`
query User($google_id: String!) {
  user(google_id: $google_id) {
    id
    google_id
    first_name
    last_name
    email
    city
    age
    gender
    phone
  }
}
`;