import { useEffect, useRef } from "react";

function LocationInput({ onPlaceSelected }) {
  const autocompleteRef = useRef(null);

  useEffect(() => {
    const autocomplete = new google.maps.places.Autocomplete(
      autocompleteRef.current
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      onPlaceSelected(place);
    });
  }, []);

  return (
    <input ref={autocompleteRef} type="text" placeholder="Enter location..." />
  );
}

export default LocationInput;
