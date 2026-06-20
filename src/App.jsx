import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { LandingPage } from "./pages/LandingPage";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Dashboard } from "./pages/Dashboard";
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Landing Page */}
              <Route path="/" element={<LandingPage />} />

              {/* Login View */}
              <Route path="/login" element={<Login />} />

              {/* Sign Up View */}
              <Route path="/signup" element={<SignUp />} />

              {/* Dashboard View */}
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Profile View */}
              <Route path="/profile" element={<Profile />} />

              {/* Settings View */}
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
