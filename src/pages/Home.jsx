import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import "./Home.css"; // optional: for styling

export default function Home() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const snapshot = await getDocs(collection(db, "listings"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="home-container">
      <h1>🏠 Cribly PG Listings</h1>
      <div className="listing-grid">
        {listings.map((listing) => (
          <div className="listing-card" key={listing.id}>
            <img src={listing.image} alt={listing.title} className="listing-img" />
            <h3>{listing.title}</h3>
            <p>📍 {listing.location}</p>
            <p>💰 ₹{listing.price}</p>
            <p>✅ {listing.amenities?.slice(0, 3).join(", ")}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}
