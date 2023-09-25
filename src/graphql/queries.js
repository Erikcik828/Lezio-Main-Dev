/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRestaurant = /* GraphQL */ `
  query GetRestaurant($id: ID!) {
    getRestaurant(id: $id) {
      id
      title
      content
      username
      price
      generalImages
      category
      lat
      lng
      comments {
        items {
          id
          title
          message
          rating
          restaurantID
          createdAt
          updatedAt
          createdBy
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listRestaurants = /* GraphQL */ `
  query ListRestaurants(
    $filter: ModelRestaurantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRestaurants(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        username
        price
        generalImages
        category
        lat
        lng
        comments {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const restaurantsByUsername = /* GraphQL */ `
  query RestaurantsByUsername(
    $username: String!
    $sortDirection: ModelSortDirection
    $filter: ModelRestaurantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    restaurantsByUsername(
      username: $username
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        content
        username
        price
        generalImages
        category
        lat
        lng
        comments {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      title
      message
      restaurant {
        id
        title
        content
        username
        price
        generalImages
        category
        lat
        lng
        comments {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      rating
      restaurantID
      createdAt
      updatedAt
      createdBy
      __typename
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        message
        restaurant {
          id
          title
          content
          username
          price
          generalImages
          category
          lat
          lng
          createdAt
          updatedAt
          __typename
        }
        rating
        restaurantID
        createdAt
        updatedAt
        createdBy
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const commentsByRestaurantID = /* GraphQL */ `
  query CommentsByRestaurantID(
    $restaurantID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsByRestaurantID(
      restaurantID: $restaurantID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        message
        restaurant {
          id
          title
          content
          username
          price
          generalImages
          category
          lat
          lng
          createdAt
          updatedAt
          __typename
        }
        rating
        restaurantID
        createdAt
        updatedAt
        createdBy
        __typename
      }
      nextToken
      __typename
    }
  }
`;
