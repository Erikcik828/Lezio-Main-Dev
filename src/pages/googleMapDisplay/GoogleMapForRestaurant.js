import React, { useRef, useEffect } from "react";

const GoogleMapForRestaurant = ({ restaurant }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = new google.maps.Map(mapRef.current, {
      zoom: 15,
      center: { lat: restaurant.lat, lng: restaurant.lng },
    });

    new google.maps.Marker({
      position: { lat: restaurant.lat, lng: restaurant.lng },
      map: map,
      title: restaurant.title,
    });
  }, [restaurant]);

  return <div ref={mapRef} style={{ width: "18rem", height: "18rem" }}></div>;
};

export default GoogleMapForRestaurant;
