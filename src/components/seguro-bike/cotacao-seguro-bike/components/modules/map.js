import React, { useEffect, useRef, ReactElement, useState } from "react";
import { Wrapper, Status, Marker } from "@googlemaps/react-wrapper";
import axios from "axios";

const enviroment = process.env.REACT_APP_ENVIRONMENT;

const apiUrl = process.env[`REACT_APP_API_ENDPOINT_${enviroment}`];

function MapComponent({ center, zoom, marker }) {
  const mapRef = useRef();
  const markerRef = useRef();

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
      disableDefaultUI: true,
    });

    markerRef.current = new window.google.maps.Marker({
      position: marker,
      map,
      title: "Meu Marcador",
    });
  }, [center, zoom, marker]);

  return (
    <div
      style={{ width: "100%", height: "100%", position: "unset" }}
      ref={mapRef}
      id="map"
    />
  );
}

export default function GoogleMaps({ geolocation }) {
  const [mapZoom, setMapZoom] = useState(15);

  return (
    <Wrapper apiKey={"AIzaSyCfw_i1zJOfveuviiJxZJC7Jt7dAl73SVY"}>
      <MapComponent center={geolocation} zoom={mapZoom} marker={geolocation} />
    </Wrapper>
  );
}
