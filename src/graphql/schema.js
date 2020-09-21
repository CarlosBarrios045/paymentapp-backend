const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    ping: String!
    # Users
    getUsers: [User]
    getUser(id: ID!): User

    # Payments
    getPayments(idUser: ID): [Payment]
    getPayment(id: ID!): Payment
  }

  type Mutation {
    # Users
    createUser(input: UserInput): User
    updateUser(id: ID!, input: UserInput): User
    deleteUser(id: ID!): String

    # Payments
    createPayment(input: PaymentInput): Payment
    updatePayment(id: ID!, input: PaymentInput): Payment
    deletePayment(id: ID!): String

    # Login
    login(email: String!, password: String!): Token
    getUserLogged: User
  }

  type User {
    id: ID
    name: String!
    lastname: String!
    email: String!
    password: String
    role: typeUser!
  }

  input UserInput {
    name: String!
    lastname: String!
    email: String!
    password: String!
    role: typeUser!
  }

  enum typeUser {
    CLIENT
    ADMIN
  }

  type Payment {
    id: ID
    amount: String!
    user: ID!
    date: String
  }

  input PaymentInput {
    amount: String!
    user: ID!
  }

  type Token {
    token: String
  }
`;

module.exports = typeDefs;
