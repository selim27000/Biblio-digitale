import { gql } from "@apollo/client";
export const CREATE_POST = gql`
  mutation createPost{
  createPost(body:"this is another post2hubbbb"){
    id
    body
    createdAt
    username
  }
}
`;

export const DELETE_POST = gql`
  mutation deletePost($id: String) {
    deletePost(id: $id)
  }
`;