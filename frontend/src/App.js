import React, { useEffect, useState } from "react";
import LandingScreen from "./Screens/LandingScreen";
import DashboardScreen from "./Screens/DashboardScreen";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PatientScreen from "./Screens/PatientScreen";
import AppointmentScreen from "./Screens/AppointmentScreen";
import DoctorScreen from "./Screens/DoctorScreen";
import AppointmentDetailScreen from "./Screens/AppointmentDetailScreen";

function App() {
  const initialLoginStatus = localStorage.getItem("isLoggedIn") === "true"; // Corrected the comparison
  const [isLoggedIn, setIsLoggedIn] = useState(initialLoginStatus);

  // Update localStorage when login status changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <LandingScreen onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <DashboardScreen onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/patients"
          element={
            isLoggedIn ? (
              <PatientScreen onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/appointments"
          element={
            isLoggedIn ? (
              <AppointmentScreen onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/doctors"
          element={
            isLoggedIn ? (
              <DoctorScreen onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/detail/appointments/:id"
          element={
            isLoggedIn ? (
              <AppointmentDetailScreen onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
