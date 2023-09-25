import { createComment } from "@/graphql/mutations";
import { getRestaurant, listRestaurants } from "@/graphql/queries";
import { API, Storage } from "aws-amplify";
import { nanoid } from "nanoid";
import Image from "next/image";
import { useState, useEffect } from "react";
import GoogleMapForRestaurant from "../googleMapDisplay/GoogleMapForRestaurant";
import "flowbite";

export default function RestaurantWithID({ restaurant }) {
  const [comment, setComment] = useState({
    message: "",
    rating: 0,
    title: "",
    restaurantID: restaurant.id,
  });
  useEffect(() => {}, []);
  const createNewComment = async () => {
    const id = nanoid();
    comment.id = id;
    try {
      await API.graphql({
        query: createComment,
        variables: { input: comment },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      console.log(comment.title);
      console.log(comment.message);
      console.log(comment.rating);
    } catch (error) {
      console.log(error);
    }
  };
  const onChangeInput = (e) => {
    setComment(() => ({
      ...comment,
      [e.target.name]: e.target.value,
    }));
    console.log(comment.title);
    console.log(comment.message);
    console.log(comment.rating);
  };
  return (
    <main className="mx-24">
      <h1>{restaurant.title}</h1>
      <input
        name="title"
        value={comment.title}
        onChange={onChangeInput}
        placeholder="Enter your title"
        className="w-full bg-slate-400"
      ></input>
      <input
        name="message"
        value={comment.message}
        onChange={onChangeInput}
        placeholder="Enter your comment"
        className="w-full bg-slate-400"
      ></input>
      <input
        type="number"
        name="rating"
        value={comment.rating}
        onChange={onChangeInput}
        placeholder="Enter your rating"
        className="w-full bg-slate-400"
        step="1"
      ></input>
      <button
        type="button"
        className="mb-4 bg-blue-600 text-white 
     font-semibold px-8 py-2 rounded-lg"
        onClick={createNewComment}
      >
        Create Comment
      </button>{" "}
      {restaurant.comments.items
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((comment) => (
          <div
            key={comment.id}
            className="w-full border-2 border-gray-500 bg-orange-700"
          >
            <p>{comment.title}</p>
            <p>{comment.message}</p>
          </div>
        ))}
      {restaurant.imageUrls &&
        restaurant.imageUrls.map((imageUrl, index) => (
          <Image
            key={index}
            src={imageUrl}
            alt={`Image for ${restaurant.title}`}
            width={500}
            height={500}
          />
        ))}
      <GoogleMapForRestaurant restaurant={restaurant} />
    </main>
  );
}
const enrichRestaurantData = async (restaurant) => {
  let imageUrls = [];
  if (restaurant.generalImages) {
    imageUrls = await Promise.all(
      restaurant.generalImages.map((image) => Storage.get(image))
    );
  }

  // let avgRating = 0;
  // if (restaurant.rates && restaurant.rates.items.length > 0) {
  //   const total = restaurant.rates.items.reduce(
  //     (acc, rate) => acc + rate.rate_value,
  //     0
  //   );
  //   avgRating = (total / restaurant.rates.items.length).toFixed(2) / 10;
  // }

  return {
    ...restaurant,
    imageUrls,
  };
};
export async function getStaticPaths() {
  const restaurantData = await API.graphql({
    query: listRestaurants,
  });
  const paths = restaurantData.data.listRestaurants.items.map((restaurant) => ({
    params: { id: restaurant.id },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const restaurantData = await API.graphql({
    query: getRestaurant,
    variables: { id },
  });
  const enrichedRestaurant = await enrichRestaurantData(
    restaurantData.data.getRestaurant
  );

  return {
    props: {
      restaurant: enrichedRestaurant,
    },
    revalidate: 1,
  };
}
