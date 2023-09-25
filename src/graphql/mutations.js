/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRestaurant = /* GraphQL */ `
  mutation CreateRestaurant(
    $input: CreateRestaurantInput!
    $condition: ModelRestaurantConditionInput
  ) {
    createRestaurant(input: $input, condition: $condition) {
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
export const updateRestaurant = /* GraphQL */ `
  mutation UpdateRestaurant(
    $input: UpdateRestaurantInput!
    $condition: ModelRestaurantConditionInput
  ) {
    updateRestaurant(input: $input, condition: $condition) {
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
export const deleteRestaurant = /* GraphQL */ `
  mutation DeleteRestaurant(
    $input: DeleteRestaurantInput!
    $condition: ModelRestaurantConditionInput
  ) {
    deleteRestaurant(input: $input, condition: $condition) {
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
