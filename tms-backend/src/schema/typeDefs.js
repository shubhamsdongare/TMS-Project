const { gql } = require("apollo-server");

module.exports = gql`
  type Shipment {
    id: ID!
    origin: String
    destination: String
    status: String
    carrier: String
    vehicle: String
    weight: Int
    cost: Float
    eta: String
    date: String
    priority: String
  }

  type Query {
    shipments(
      page: Int
      limit: Int
      sortBy: String
    ): [Shipment]

    shipment(id: ID!): Shipment
  }

  type Mutation {
    addShipment(
      origin: String
      destination: String
      status: String
      carrier: String
      vehicle: String
      weight: Int
      cost: Float
      eta: String
      date: String
      priority: String
    ): Shipment

    updateShipment(
      id: ID!
      status: String
    ): Shipment
  }
`;
