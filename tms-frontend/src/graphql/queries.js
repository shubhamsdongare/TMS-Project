import { gql } from "@apollo/client";

export const GET_SHIPMENTS = gql`
  query GetShipments(
    $page: Int
    $limit: Int
    $sortBy: String
    $sortOrder: String
  ) {
    shipments(
      page: $page
      limit: $limit
      sortBy: $sortBy
      sortOrder: $sortOrder
    ) {
      totalCount
      data {
        id
        origin
        destination
        status
        carrier
        vehicle
        weight
        cost
        eta
        date
        priority
      }
    }
  }
`;
