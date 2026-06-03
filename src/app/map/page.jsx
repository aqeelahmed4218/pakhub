"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";

const multanCoords = [30.1575, 71.5249];

export default function MapPage() {
  const [listings, setListings] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchListings() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/listing/get", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });
        const data = await res.json();
        setListings(data);
      } catch (err) {
        setError("Failed to fetch listings");
      } finally {
        setLoading(false);
      }
    }
    fetchListings();
  }, []);

  useEffect(() => {
    async function geocodeAll() {
      if (!listings.length) return;
      setLoading(true);
      const geocoded = await Promise.all(
        listings.map(async (listing) => {
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(listing.address)}`
            );
            const data = await res.json();
            if (data && data.length > 0) {
              return {
                ...listing,
                coords: [parseFloat(data[0].lat), parseFloat(data[0].lon)],
              };
            }
          } catch {}
          return { ...listing, coords: multanCoords };
        })
      );
      setMarkers(geocoded);
      setLoading(false);
    }
    geocodeAll();
  }, [listings]);

  return (
    <main className="max-w-6xl mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white">Explore Properties on Map</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="w-full h-[500px] rounded-lg overflow-hidden relative bg-gray-200">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
            <span className="text-gray-700 font-semibold">Loading map...</span>
          </div>
        )}
        <MapContainer center={multanCoords} zoom={12} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.map((listing) => (
            <Marker key={listing._id} position={listing.coords}>
              <Popup>
                <div>
                  <div className="font-bold text-emerald-700 mb-1">{listing.name}</div>
                  <div className="text-gray-700 text-sm mb-1">{listing.address}</div>
                  <Link href={`/listing/${listing._id}`} className="text-cyan-700 underline text-sm">View Details</Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </main>
  );
} 