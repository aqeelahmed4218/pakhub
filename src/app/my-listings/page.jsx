"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import ListingItem from "@/components/ListingItem";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MyListings() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) return;
    const fetchListings = async () => {
      setLoading(true);
      setError(null);
      try {
        const userMongoId = user.publicMetadata.userMongoId || user.publicMetadata.userMogoId;
        const res = await fetch("/api/listing/get", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userRef: userMongoId }),
        });
        if (!res.ok) throw new Error("Failed to fetch listings");
        const data = await res.json();
        setListings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, [isSignedIn, user]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    try {
      const res = await fetch(`/api/listing/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Failed to delete listing");
      setListings((prev) => prev.filter((l) => l._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (!isLoaded) return <div className="text-center p-8">Loading...</div>;
  if (!isSignedIn)
    return (
      <div className="text-center p-8 text-xl font-semibold">
        Please sign in to view your listings.
      </div>
    );

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-white">My Listings</h1>
      <Link href="/create-listing" className="bg-cyan-700 text-white px-4 py-2 rounded hover:bg-cyan-500 mb-6 inline-block">+ Add New Listing</Link>
      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : listings.length === 0 ? (
        <div className="text-gray-500">You have not posted any listings yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          {listings.map((listing) => (
            <div key={listing._id} className="relative">
              <ListingItem listing={listing} />
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => router.push(`/update-listing/${listing._id}`)}
                  className="bg-amber-500 text-white px-2 py-1 rounded hover:bg-amber-400 text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(listing._id)}
                  className="bg-rose-600 text-white px-2 py-1 rounded hover:bg-rose-500 text-xs"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
} 