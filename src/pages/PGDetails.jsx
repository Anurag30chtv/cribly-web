import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";

export default function PGDetails() {
  const { id } = useParams();
  const [pg, setPg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPG = async () => {
      try {
        const docRef = doc(db, "listings", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPg({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error getting PG:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPG();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!pg) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-800">PG not found</h2>
        <p className="text-gray-600 mt-2">The listing you're looking for doesn't exist or may have been removed.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Main Image */}
        {pg.imageBase64 && (
          <img
            src={pg.imageBase64}
            alt={pg.propertyName}
            className="w-full h-64 md:h-80 object-cover"
          />
        )}
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">{pg.propertyName}</h1>
              <p className="text-gray-600 mb-4 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {pg.location}
              </p>
            </div>
            
            <div className="bg-indigo-50 p-3 rounded-lg">
              <p className="text-2xl font-bold text-indigo-700">₹{pg.price}<span className="text-sm font-normal text-gray-600">/month</span></p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 my-6">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Room Type</p>
              <p className="font-medium">{pg.roomType}</p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Gender Preference</p>
              <p className="font-medium">{pg.genderPreference === "Any" ? "All Genders" : pg.genderPreference}</p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Food</p>
              <p className="font-medium">{pg.foodIncluded ? "Included" : "Not Included"}</p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Contact</p>
              <p className="font-medium">{pg.contactNumber}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
            <p className="text-gray-600 whitespace-pre-line">{pg.description || "No description provided."}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Amenities</h2>
            <div className="flex flex-wrap gap-2">
              {pg.amenities?.length > 0 ? (
                pg.amenities.map((item, idx) => (
                  <span key={idx} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                    {item}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No amenities listed</p>
              )}
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="text-lg font-medium text-blue-800 mb-2">Interested in this PG?</h3>
            <p className="text-blue-600 mb-3">Contact the owner directly at: <span className="font-semibold">{pg.contactNumber}</span></p>
            <a
              href={`tel:${pg.contactNumber}`}
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}