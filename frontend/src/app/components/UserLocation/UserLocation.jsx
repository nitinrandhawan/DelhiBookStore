// components/UserLocation.jsx
"use client";

import React, { useEffect, useState } from "react";

export default function UserLocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      requestLocation();
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const requestLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const loc = await getCityAndState(
              position.coords.latitude,
              position.coords.longitude
            );
            setLocation(loc);
            setError(null);
          } catch (err) {
            setError("Failed to fetch location details.");
          }
        },
        (err) => {
          setError("Please allow location access.");
          if (retryCount < 1) {
            setRetryCount((prev) => prev + 1);
            setTimeout(() => {
              alert("Location is mandatory. Please allow access.");
              requestLocation(); // retry once
            }, 8000);
          }
        }
      );
    } else {
      setError("Geolocation is not supported in your browser.");
    }
  };

  const getCityAndState = async (lat, lon) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "biziffy-app",
      },
    });

    const data = await response.json();
    const address = data.address || {};
    const city =
      address.city || address.town || address.village || address.hamlet || "";
    const state = address.state || "";
    return { city, state };
  };

  return (
    <div>
      {location ? (
        <p className="m-0 p-0 location-detact">
          {location.city} {location.state}
        </p>
      ) : (
        <>
          <p className="m-0 p-0 location-detact">Detecting location...</p>
          {error && (
            <p className="m-0 p-0 location-detact text-danger">{error}</p>
          )}
        </>
      )}
    </div>
  );
}
