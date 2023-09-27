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
	const [costRangeSubmit, setCostRangeSubmit] = useState(false);
	const toggleCostRange = () => {
		setCostRangeSubmit(!costRangeSubmit);
	};
	return (
		<main className="mx-24">
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
				<div className=" grid lg:grid-cols-5 xs:grid-cols-2 gap-12">
					<button
						className="w-24 h-12 rounded-lg bg-white border-2 border-black"
						onClick={toggleCostRange}>
						Hello
					</button>
					{costRangeSubmit && <div>Heloo</div>}
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
											className="w-full h-full"></Image>
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
