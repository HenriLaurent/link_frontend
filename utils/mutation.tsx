import { gql } from "@apollo/client";

export const CREATE_USER = gql`
mutation CreateUser($google_id: String!, $firstName: String!, $lastName: String!, $email: String!, $age: Int!, $gender: String!, $city: String!, $phone: String!, $nbrFriend: Int!, $longitude: Float!, $latitude: Float!) {
  createUser(google_id: $google_id, first_name: $firstName, last_name: $lastName, email: $email, age: $age, gender: $gender, city: $city, phone: $phone, nbr_friend: $nbrFriend, longitude: $longitude, latitude: $latitude) {
    first_name
    last_name
    id
    google_id
    longitude
    latitude
    city
    age
    gender
  }
}
`;