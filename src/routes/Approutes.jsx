import { Routes, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProtectedRoute from './ProtectedRoute';  // Correct relative path
import ErrorBoundary from '../ErrorBoundary';
// ... other imports
import {
  Home,
  Listing,
  PGDetails,
  AddListing,
  Login,
  Register,
  Dashboard,
  NotFound
} from '../pages';
import { ROUTES } from '../constants/routes';

export default function AppRoutes({ customRoutes = [] }) {
  return (
    <Routes>
      {/* Public routes */}
      <Route 
        path={ROUTES.HOME} 
        element={
          <ErrorBoundary>
            <Home />
          </ErrorBoundary>
        } 
      />
      <Route 
        path={ROUTES.LISTINGS} 
        element={
          <ErrorBoundary>
            <Listing />
          </ErrorBoundary>
        } 
      />
      <Route 
        path={ROUTES.PG_DETAILS} 
        element={
          <ErrorBoundary>
            <PGDetails />
          </ErrorBoundary>
        } 
      />
      <Route 
        path={ROUTES.LOGIN} 
        element={
          <ErrorBoundary>
            <Login />
          </ErrorBoundary>
        } 
      />
      <Route 
        path={ROUTES.REGISTER} 
        element={
          <ErrorBoundary>
            <Register />
          </ErrorBoundary>
        } 
      />
      
      {/* Owner-only routes */}
      <Route element={
        <ErrorBoundary>
          <ProtectedRoute allowedRoles={['owner']} />
        </ErrorBoundary>
      }>
        <Route 
          path={ROUTES.ADD_LISTING} 
          element={
            <ErrorBoundary>
              <AddListing />
            </ErrorBoundary>
          } 
        />
      </Route>
      
      {/* Authenticated user routes */}
      <Route element={
        <ErrorBoundary>
          <ProtectedRoute allowedRoles={['owner', 'student']} />
        </ErrorBoundary>
      }>
        <Route 
          path={ROUTES.DASHBOARD} 
          element={
            <ErrorBoundary>
              <Dashboard />
            </ErrorBoundary>
          } 
        />
      </Route>
      
      {/* Custom routes passed as props */}
      {customRoutes.map((route, index) => (
        <Route 
          key={index}
          path={route.path}
          element={
            <ErrorBoundary>
              {route.element}
            </ErrorBoundary>
          }
        />
      ))}
      
      {/* 404 - Not Found */}
      <Route 
        path="*" 
        element={
          <ErrorBoundary>
            <NotFound />
          </ErrorBoundary>
        } 
      />
    </Routes>
  );
}

AppRoutes.propTypes = {
  customRoutes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      element: PropTypes.node.isRequired
    })
  )
};

AppRoutes.defaultProps = {
  customRoutes: []
};