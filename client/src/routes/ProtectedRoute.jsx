// src/routes/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/token';

const ProtectedRoute = ({ children }) => {
  const token = getToken();
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
