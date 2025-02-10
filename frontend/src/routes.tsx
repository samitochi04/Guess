import { Route, Routes, Navigate } from "react-router-dom";
import Profile from "./pages/Profile";
import { useSelector } from "react-redux";
import { RootState } from "./state/store"; // Import your store type
import { JSX } from "react";
import Login from "./component/auth/Login";
import Signup from "./component/auth/Signup";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = useSelector((state: RootState) => state.auth.token); // Fetch token from redux
  return token ? children : <Navigate to="/login" />; // If no token, navigate to login
};

const AppRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    
    {/* Protected routes */}
    <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
  </Routes>
);

export default AppRoutes;
