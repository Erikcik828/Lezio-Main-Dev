import { withAuthenticator } from "@aws-amplify/ui-react";
import { useState, useRef, React } from "react";
import { API, Storage } from "aws-amplify";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";
import { createRestaurant } from "@/graphql/mutations";
import dynamic from "next/dynamic";
import { nanoid } from "nanoid";
import LocationInput from "./createLocationComponents/LocationInput";
import MapDisplay from "./createLocationComponents/MapDisplay";

const initialState = { title: "", content: "" };
function CreateRestaurant() {
  const [createdRestaurant, setCreatedRestaurant] = useState(initialState);
  const { title, content } = createdRestaurant;
  const [image, setImage] = useState("");
  const imageFileInput = useRef(null);

  const router = useRouter();
  const [location, setLocation] = useState(null);

  const handlePlaceSelected = (place) => {
    if (place.geometry) {
      setLocation({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
      console.log(location.lat);
      console.log(location.lng);
    }
  };
  function onChange(e) {
    setCreatedRestaurant(() => ({
      ...createdRestaurant,
      [e.target.name]: e.target.value,
    }));
  }

  const createNewRestaurant = async () => {
    if (!title || !content) {
      throw new Error("Fill Out the forms");
      return;
    }
    const id = nanoid();
    createdRestaurant.id = id; //=> "V1StGXR8_Z5jdHi6B-myT"

    let filenames = [];
    if (image && Array.isArray(image)) {
      const uploadPromises = image.map(async (img) => {
        const filename = `${img.name}_${nanoid()}`;
        filenames.push(filename);
        await Storage.put(filename, img);
      });
      await Promise.all(uploadPromises);
      createdRestaurant.generalImages = filenames;
    }
    const restaurantWithImg = {
      ...createdRestaurant,
      id: id,
      lat: location.lat,
      lng: location.lng,
    };
    await API.graphql({
      query: createRestaurant,
      variables: { input: restaurantWithImg },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    router.push("/screens/" + id);
    console.log(createdRestaurant.title);
    console.log(createdRestaurant.content);
  };

  const uploadImage = async () => {
    imageFileInput.current.click();
  };
  function handleChangeImage(e) {
    const filesUploaded = Array.from(e.target.files); // Convert FileList to array
    if (!filesUploaded) return;
    setImage(filesUploaded); // Set state with array of File objects
  }

  return (
    <div>
      <h1
        className="text-3xl font-semibold tracking-wide
      mt-6"
      >
        Create new Restaurant
      </h1>
      <input
        onChange={onChange}
        name="title"
        placeholder="Title"
        value={createdRestaurant.title}
        className="border-b pb-2 text-lg my-4
         focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
      />
      <input
        onChange={onChange}
        name="content"
        placeholder="Content"
        value={createdRestaurant.content}
        className="border-b pb-2 text-lg my-4
         focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
      />
      {image &&
        image.map((img, index) => (
          <img key={index} src={URL.createObjectURL(img)} className="my-4" />
        ))}
      <input
        type="file"
        ref={imageFileInput}
        className="absolute w-0 h-0 "
        onChange={handleChangeImage}
        multiple // Allow multiple files to be selected
      ></input>
      <button
        type="button"
        className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg"
        onClick={uploadImage}
      >
        {" "}
        Upload Cover Image
      </button>
      <button
        type="button"
        className="mb-4 bg-blue-600 text-white 
     font-semibold px-8 py-2 rounded-lg"
        onClick={createNewRestaurant}
      >
        Create Restaurant
      </button>{" "}
      <LocationInput onPlaceSelected={handlePlaceSelected} />
      <MapDisplay location={location} />
    </div>
  );
}

export default CreateRestaurant;
