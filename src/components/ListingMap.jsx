"use client";
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function ListingMap({ address }) {
  // Default to Multan coordinates
  const multanCoords = [30.1575, 71.5249];
  const [coords, setCoords] = useState(multanCoords);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!address) {
      setCoords(multanCoords);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        } else {
          setCoords(multanCoords);
        }
      })
      .catch((err) => {
        setError('Could not find location');
        setCoords(multanCoords);
      })
      .finally(() => setLoading(false));
  }, [address]);

  return (
    <div className='w-full h-[350px] rounded-lg overflow-hidden relative'>
      {loading && (
        <div className='absolute inset-0 flex items-center justify-center bg-white/70 z-10'>
          <span className='text-gray-700 font-semibold'>Loading map...</span>
        </div>
      )}
      <MapContainer center={coords} zoom={13} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={coords}>
          <Popup>{address || 'Multan'}</Popup>
        </Marker>
      </MapContainer>
      {error && (
        <div className='absolute bottom-2 left-2 bg-red-100 text-red-700 px-3 py-1 rounded shadow text-sm'>
          {error}
        </div>
      )}
    </div>
  );
} 