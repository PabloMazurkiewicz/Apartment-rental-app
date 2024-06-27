/**
 * @author Dias
 * @date 2024/6/20
 * @description Main Component
 */

import React, { lazy } from 'react';
import './App.css';

import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Navigate, Routes } from "react-router-dom";
import constants from './utils/constants';
import UserDashboard from './pages/user/Dashboard';
import RealtorDashboard from './pages/realtor/Dashboard';
import RealtorNewApartment from './pages/realtor/NewApartment';
import UserProperty from './pages/user/Property';
import UserFavorites from './pages/user/Favorites';

// Lazy load the components
const AuthPage = lazy(() => import('./pages/Auth'));

// Define the shape of the auth state
interface AuthState {
  user: User | null;
}

// Define the shape of the user object if known, otherwise use 'any'
interface User {
  id: string;
  role: string;
}

// Define the shape of the entire application state
interface AppState {
  auth: AuthState;
}

function App() {
  // Use the AppState type to annotate the state parameter
  const { user: currentUser } = useSelector((state: AppState) => state.auth);

  return (
    <Router>
      <Routes>
        {!currentUser && (
          <React.Fragment>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/*" element={<Navigate to={'/auth'} replace />} />
          </React.Fragment>
        )}
        
        {currentUser && 
          (
            <React.Fragment>
              {
                currentUser.role == constants.ROLE_USER ? 
                  <>
                    <Route path="/" element={<UserDashboard />} />
                    <Route path="/property/:id" element={<UserProperty />} />
                    <Route path="/favorites" element={<UserFavorites />} />
                  </>
                : 
                  <>
                    <Route path="/" element={<RealtorDashboard />} />
                    <Route path="/add" element={<RealtorNewApartment />} />
                    <Route path="/edit/:id" element={<RealtorNewApartment />} />
                  </>
              }
              <Route path="/auth" element={<Navigate to={'/'} replace />} />
            </React.Fragment>
          )
        }
      </Routes>
    </Router>
  );
}

export default App;