import { gql } from "@apollo/client";

export const getALL = gql`
  {
     getPosts{
      id
      body
      username
      createdAt
    }
  }
`;