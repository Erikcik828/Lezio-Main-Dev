/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRestaurant = /* GraphQL */ `
  subscription OnCreateRestaurant(
    $filter: ModelSubscriptionRestaurantFilterInput
    $username: String
  ) {
    onCreateRestaurant(filter: $filter, username: $username) {
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
export const onUpdateRestaurant = /* GraphQL */ `
  subscription OnUpdateRestaurant(
    $filter: ModelSubscriptionRestaurantFilterInput
    $username: String
  ) {
    onUpdateRestaurant(filter: $filter, username: $username) {
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
export const onDeleteRestaurant = /* GraphQL */ `
  subscription OnDeleteRestaurant(
    $filter: ModelSubscriptionRestaurantFilterInput
    $username: String
  ) {
    onDeleteRestaurant(filter: $filter, username: $username) {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment(
    $filter: ModelSubscriptionCommentFilterInput
    $createdBy: String
  ) {
    onCreateComment(filter: $filter, createdBy: $createdBy) {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment(
    $filter: ModelSubscriptionCommentFilterInput
    $createdBy: String
  ) {
    onUpdateComment(filter: $filter, createdBy: $createdBy) {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment(
    $filter: ModelSubscriptionCommentFilterInput
    $createdBy: String
  ) {
    onDeleteComment(filter: $filter, createdBy: $createdBy) {
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
