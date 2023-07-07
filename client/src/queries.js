import { gql } from "@apollo/client";
const GET_LOCATION_POSTS = gql`
  query {
    locationPosts {
      id
      image
      name
      address
      userPosted
      liked
    }
  }
`;

const UPDATE_LOCATIONS = gql`
    mutation UpdateLocation($id: ID!, $image: String, $name: String, $address: String, $userPosted: Boolean, $liked: Boolean) {
  updateLocation(id: $id, image: $image, name: $name, address: $address, userPosted: $userPosted, liked: $liked) {
    id
    image
    name
    address
    userPosted
    liked
  }
    }
`;
const DELETE_LOCATIONS = gql`
mutation DeleteLocation($id: ID!) {
  deleteLocation(id: $id) {
    id
    image
    name
    address
    userPosted
    liked
  }
}

`; 
const GET_LIKED_LOCATIONS = gql`
query  {
  likedLocations {
    id
    image
    name
    address
    userPosted
    liked
  }
}

`
const UPLOAD_LOCATIONS= gql`
mutation UploadLocation($image: String!, $address: String!, $name: String!) {
  uploadLocation(image: $image, address: $address, name: $name) {
    id
    image
    name
    address
    userPosted
    liked
  }
}`

const MY_LOCATIONS = gql`
query UserPostedLocations {
  userPostedLocations {
    id
    image
    name
    address
    userPosted
    liked
  }
}`

export { GET_LOCATION_POSTS, UPDATE_LOCATIONS, GET_LIKED_LOCATIONS,DELETE_LOCATIONS,UPLOAD_LOCATIONS,MY_LOCATIONS};
