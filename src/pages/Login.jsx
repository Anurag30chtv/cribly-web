import { useState, useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function Login() {
  const [role, setRole] = useState("student");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      navigate(currentUser.role === 'owner' ? '/add-listing' : '/');
    }
  }, [currentUser, navigate]);

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role,
          createdAt: new Date()
        });
      } else {
        // Update role if changed (optional)
        await setDoc(userRef, { role }, { merge: true });
      }

      navigate(role === 'owner' ? '/add-listing' : '/');
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to Cribly</h2>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="mb-6">
          <p className="mb-2 font-medium">I am a:</p>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="student"
                checked={role === "student"}
                onChange={() => setRole("student")}
                className="mr-2"
              />
              Student
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="owner"
                checked={role === "owner"}
                onChange={() => setRole("owner")}
                className="mr-2"
              />
              PG Owner
            </label>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 flex items-center justify-center gap-2"
        >
          <img 
            src="https://www.google.com/favicon.ico" 
            alt="Google" 
            className="w-4 h-4"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}