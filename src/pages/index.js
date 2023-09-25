import Image from "next/image";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { listRestaurants } from "@/graphql/queries";
import Link from "next/link";
import GoogleMapForRestaurant from "./googleMapDisplay/GoogleMapForRestaurant";
import "flowbite";
import { Rating } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ restaurantList }) {
  return (
    <main className="mx-24">
      <h1>Hekooo</h1>
      {/* {restaurantList.map((restaurant) => (
        <Link key={restaurant.id} href={`/screens/${restaurant.id}`}>
          <div className="w-full h-72 bg-gray-400 border-y-2 border-cyan-300 ">
            <div className="flex justify-between">
              <div>
                <p className="text-3xl text-red-600 font-semibold ">
                  {restaurant.title}
                </p>
                <p>{restaurant.content}</p>
                <p>{restaurant.username}</p>
              </div>
              <div>
                <GoogleMapForRestaurant restaurant={restaurant} />
              </div>
            </div>
          </div>
        </Link>
      ))} */}
      <div className="">
        <h1 className="text-7xl font-bold text-third">Bütün Restoranlar</h1>

        <div class="flex flex-col">
          <div class="bg-white p-6 rounded-xl shadow-lg">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <div class="flex flex-col">
                <label for="name" class="font-medium text-sm text-stone-600">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="john doe"
                  class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                />
              </div>

              <div class="flex flex-col">
                <label for="email" class="font-medium text-sm text-stone-600">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="johndoe@example.com"
                  class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                />
              </div>

              <div class="flex flex-col">
                <label for="date" class="font-medium text-sm text-stone-600">
                  Published Date
                </label>
                <input
                  type="date"
                  id="date"
                  class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                />
              </div>

              <div class="flex flex-col">
                <label for="status" class="font-medium text-sm text-stone-600">
                  Status
                </label>

                <select
                  id="status"
                  class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                >
                  <option>Active</option>
                  <option>Pending</option>
                  <option>Deleted</option>
                </select>
              </div>
            </div>

            <div class="grid md:flex grid-cols-2 justify-end space-x-4 w-full mt-6">
              <button class="px-4 py-2 rounded-lg  bg-stone-400 hover:bg-stone-500 font-bold text-white shadow-lg shadow-stone-200 transition ease-in-out duration-200 translate-10">
                Reset
              </button>

              <button class="px-4 py-2 rounded-lg text-orange-50 bg-orange-400 hover:bg-orange-500 font-bold text-white shadow-lg shadow-orange-200 transition ease-in-out duration-200 translate-10">
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-y-8  bg-primary">
          {restaurantList.map((restaurant) => (
            <div className="w-full h-96 bg-white mx-6 rounded-lg border-4 border-black">
              <div className="grid grid-cols-12 gap-4 h-full w-full">
                <div className=" w-full h-full col-span-4">
                  {restaurant.imageUrls && (
                    <Image
                      src={restaurant.imageUrls[0]}
                      alt="... "
                      width={500}
                      height={500}
                      className="w-full h-full"
                    ></Image>
                  )}
                </div>
                <div className="bg-white w-full h-full col-span-5">
                  <div className="grid grid-cols-5 gap-4 w-full h-full">
                    <div className="bg-black h-full w-full"></div>
                    <div className="bg-black h-full w-full"></div>
                    <div className="bg-black h-full w-full"></div>
                    <div className="bg-black h-full w-full"></div>
                    <div className="bg-black h-full w-full"></div>
                  </div>
                </div>
                <div className="bg-gray-100 w-full h-full col-span-3 flex justify-center items-center">
                  <GoogleMapForRestaurant restaurant={restaurant} />
                </div>
              </div>
            </div>
          ))}

          <div className="w-full h-72 bg-white mx-6 rounded-lg border-4 border-black"></div>
          <div className="w-full h-72 bg-white mx-6 rounded-lg border-4 border-black"></div>
        </div>
      </div>

      <Link className="block" href={"/profile"}>
        Go to profile
      </Link>
      <Link href={"/create-restaurant"}>Create Restaurant</Link>
    </main>
  );
}

const fetchRestaurantsWithImages = async () => {
  const restaurantData = await API.graphql({
    query: listRestaurants,
  });

  const restaurants = restaurantData.data.listRestaurants.items;

  // Fetch image URLs for each restaurant
  const enrichedRestaurants = await Promise.all(
    restaurants.map(async (restaurant) => {
      if (restaurant.generalImages) {
        const imageUrls = await Promise.all(
          restaurant.generalImages.map((image) => Storage.get(image))
        );
        return { ...restaurant, imageUrls };
      }
      return restaurant;
    })
  );

  return enrichedRestaurants;
};
export async function getStaticProps() {
  const restaurantList = await fetchRestaurantsWithImages();

  return {
    props: {
      restaurantList,
    },
    revalidate: 1, // Re-generate the page every hour (3600 seconds)
  };
}
