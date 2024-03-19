import React, { useEffect, useRef } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

export default function Maps({
  coverageData,
  selectedPosition,
  isSpecificPositionSelected,
  userLocation,
}) {
  console.log(
    "isSpecificPositionSelected in Maps:",
    isSpecificPositionSelected
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCfw_i1zJOfveuviiJxZJC7Jt7dAl73SVY",
  });

  const mapRef = useRef();

  useEffect(() => {
    if (userLocation && mapRef.current) {
      mapRef.current.panTo(userLocation);
      mapRef.current.setZoom(14);
    }
  }, [userLocation]);

  useEffect(() => {
    if (selectedPosition && mapRef.current && isSpecificPositionSelected) {
      console.log("Updating map to:", selectedPosition);
      mapRef.current.panTo(selectedPosition);
      mapRef.current.setZoom(20);
    }
  }, [selectedPosition, isSpecificPositionSelected]);

  useEffect(() => {
    if (
      !isSpecificPositionSelected &&
      isLoaded &&
      mapRef.current &&
      coverageData &&
      coverageData.length > 0
    ) {
      const bounds = new window.google.maps.LatLngBounds();
      coverageData.forEach((clinic) => {
        if (
          clinic.position &&
          clinic.position.lat != null &&
          clinic.position.lng != null
        ) {
          bounds.extend(
            new window.google.maps.LatLng(
              clinic.position.lat,
              clinic.position.lng
            )
          );
        }
      });
      mapRef.current.fitBounds(bounds);
    }
  }, [isLoaded, coverageData, isSpecificPositionSelected]);

  const mapContainerStyle = {
    width: "100%",
    height: "500px",
  };

  const onMapLoad = (map) => {
    mapRef.current = map;
  };

  if (!isLoaded) return <div>Carregando mapa...</div>;

  console.log(
    "isSpecificPositionSelected in CredentialNetwork:",
    isSpecificPositionSelected
  );

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      onLoad={onMapLoad}
      zoom={10} // O zoom inicial, ajuste conforme necessário
      options={{
        streetViewControl: false, // Desativa o controle de Street View
        mapTypeControl: false, // Ativa o controle de tipos de mapa
        zoomControl: true, // Ativa o controle de zoom
        // Outras opções...
      }}
    >
      {coverageData.map((clinic, index) => {
        if (
          clinic.position &&
          clinic.position.lat != null &&
          clinic.position.lng != null
        ) {
          return (
            <Marker
              key={index}
              position={{ lat: clinic.position.lat, lng: clinic.position.lng }}
              animation={window.google.maps.Animation.DROP}
            />
          );
        }
        return null;
      })}
    </GoogleMap>
  );
}
