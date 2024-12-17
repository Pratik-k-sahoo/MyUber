import React, { useState, useEffect } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
	width: "100%",
  height: "100%"
};

const LiveTracking = () => {
	const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
  const [mapOptions, setMapOptions] = useState({});

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				setCurrentPosition({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
			},
			(error) => console.log(error),
			{ enableHighAccuracy: true }
		);

		const watchId = navigator.geolocation.watchPosition(
			(position) => {
				setCurrentPosition({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
			},
			(error) => console.log(error),
			{ enableHighAccuracy: true }
		);

		return () => navigator.geolocation.clearWatch(watchId);
	}, []);

  const onLoad = () => {
		setMapOptions({
			mapTypeControlOptions: {
				position: window.google.maps.ControlPosition.BOTTOM_CENTER,
			},
			fullscreenControl: false,
		});
	};

	return (
		<LoadScript googleMapsApiKey={`${import.meta.env.VITE_GOOGLE_MAPS_API}`}>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={currentPosition}
				zoom={15}
				options={mapOptions}
				onLoad={onLoad}
			>
				<Marker position={currentPosition} />
			</GoogleMap>
		</LoadScript>
	);
};

export default LiveTracking;
