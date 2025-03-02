export const userTypeDefs = `
  
input UserInput {
  email: String
  password: String
  name: String
  active: Boolean
  role: Role
  refreshToken: String
}

  enum Role {
      ADMIN
      USER
    }
  

  type AuthResponse {
      accessToken: String
      refreshToken: String
    }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    active : Boolean 
    role: Role
    refreshToken: String
    createdAt: String    
    updatedAt: String
  }

  type Query {
    getUser(id: ID!): User
    getAllUsers: [User]
    me: User
    }

  type Mutation {
    createUser(email: String!, password: String!, name: String!): User
    login(email: String!, password: String!): AuthResponse
    refreshAccessToken(refreshToken: String!): AuthResponse
    logout: Boolean
    updateUser(user: UserInput!): User
    deleteUser: Boolean
    }
`;
