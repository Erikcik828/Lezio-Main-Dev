import { useEffect, useRef } from "react";

function MapDisplay({ location }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = new google.maps.Map(mapRef.current, {
      center: location || { lat: -34.397, lng: 150.644 },
      zoom: 15,
    });

    if (location) {
      new google.maps.Marker({
        position: location,
        map: map,
      });
    }
  }, [location]);

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }}></div>;
}

export default MapDisplay;
