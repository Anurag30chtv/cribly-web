import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase/config";
import { Link } from "react-router-dom";

export default function Listing() {
  
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const q = query(
          collection(db, "listings"),
          orderBy("createdAt", "desc"),
          limit(20)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setListings(data);
      } catch (err) {
        console.error("Failed to fetch listings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Available PGs</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((pg) => (
          <div key={pg.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {pg.imageBase64 && (
              <img
                src={pg.imageBase64}
                alt={pg.propertyName}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
            )}
            <div className="p-5">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">{pg.propertyName}</h2>
                <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                  {pg.roomType}
                </span>
              </div>
              
              <p className="text-gray-600 mb-2 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {pg.location}
              </p>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-indigo-600">₹{pg.price}/month</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  pg.genderPreference === "Male" ? "bg-blue-100 text-blue-800" :
                  pg.genderPreference === "Female" ? "bg-pink-100 text-pink-800" :
                  "bg-gray-100 text-gray-800"
                }`}>
                  {pg.genderPreference === "Any" ? "All Genders" : pg.genderPreference}
                </span>
              </div>
              
              {pg.foodIncluded && (
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mb-3">
                  Food Included
                </span>
              )}
              
              <div className="flex flex-wrap gap-1 mb-4">
                {pg.amenities?.slice(0, 4).map((item, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                    {item}
                  </span>
                ))}
              </div>
              
              <Link
                to={`/pg/${pg.id}`}
                className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded transition duration-200"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {listings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No PGs available yet. Check back later!</p>
        </div>
      )}
    </div>
  );
}