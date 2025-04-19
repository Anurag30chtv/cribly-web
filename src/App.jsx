// src/App.jsx
import Navbar from "./components/Navbar";
import ErrorBoundary from './ErrorBoundary';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <ErrorBoundary>
      <Navbar />
      <AppRoutes />
    </ErrorBoundary>
  );
}

export default App;