import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    users: [User]
    userById(userId: String): User
  }
  scalar Any
  type Phone {
    country_code: String
    number: String
  }
  type Address {
    country: String
    state: String
    city: String
    locality: String
  }
  type Location {
    type: [Any]
    coordinates: [Float]
  }
  scalar Date

  type User {
    id: ID!
    name: String!
    username: String
    email: String
    password: String!
    bio: String
    profile_pic: String
    interests: [String]
    organisations: [String]
    following_fundraisers: [String]
    phone: Phone
    address: Address
    location: Location
    lancels: Int
    level: Int
    social_links: Any
    created_at: Date
    updated_at: Date
  }
  type Mutation {
    createUser(name: String!, password: String!): User!
  }
`;
