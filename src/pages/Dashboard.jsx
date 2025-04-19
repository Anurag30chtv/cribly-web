import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { currentUser } = useAuth();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {currentUser?.role === 'owner' ? 'Owner' : 'Student'} Dashboard
      </h1>
      <div className="bg-white p-6 rounded shadow">
        {currentUser?.role === 'owner' ? (
          <div>
            <h2 className="text-xl font-semibold mb-2">Your Listings</h2>
            <p>Manage your PG listings here</p>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-2">Your Saved PGs</h2>
            <p>View your favorite PG listings</p>
          </div>
        )}
      </div>
    </div>
  );
}