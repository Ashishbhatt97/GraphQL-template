import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
  mutation createUser($email: String!, $password: String!, $name: String!) {
    createUser(email: $email, password: $password, name: $name) {
      name
      id
      email
      role
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`;

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshAccessToken($refreshToken: String!) {
    refreshAccessToken(refreshToken: $refreshToken) {
      accessToken
      refreshToken
    }
  }
`;

export const ME_QUERY = gql`
  query me {
    me {
      name
      id
      email
      role
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;
