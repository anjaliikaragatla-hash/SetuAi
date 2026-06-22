import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for active sessions on load
  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem("setuai_token");
      const storedGuest = localStorage.getItem("setuai_guest");

      if (token) {
        try {
          const res = await fetch("/api/auth/me", {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
          if (res.ok) {
            const userData = await res.json();
            setUser(userData);
          } else {
            // Token expired or invalid
            logout();
          }
        } catch (err) {
          console.error("Session check failed, using cached user if offline:", err);
          const cachedUser = localStorage.getItem("setuai_user");
          if (cachedUser) setUser(JSON.parse(cachedUser));
        }
      } else if (storedGuest === "true") {
        setIsGuest(true);
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  const login = async (phoneOrEmail, password) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: phoneOrEmail, password })
      });

      if (!res.ok) {
        const errorText = await res.text();
        // Extract message from ResponseStatusException JSON structure if available
        let message = errorText;
        try {
          const errObj = JSON.parse(errorText);
          message = errObj.message || message;
        } catch (e) {}
        throw new Error(message || "Invalid mobile/email or password.");
      }

      const token = await res.text(); // Returns the JWT token string
      localStorage.setItem("setuai_token", token);

      // Now fetch user details
      const meRes = await fetch("/api/auth/me", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!meRes.ok) throw new Error("Failed to retrieve user profile");

      const userData = await meRes.json();
      setUser(userData);
      setIsGuest(false);
      localStorage.setItem("setuai_user", JSON.stringify(userData));
      localStorage.removeItem("setuai_guest");
      return userData;
    } catch (err) {
      throw new Error(err.message || "Connection to server failed.");
    }
  };

  const signUp = async (userData) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: userData.password
        })
      });

      if (!res.ok) {
        const errorText = await res.text();
        let message = errorText;
        try {
          const errObj = JSON.parse(errorText);
          message = errObj.message || message;
        } catch (e) {}
        throw new Error(message || "Sign up failed. Please try again.");
      }

      // Auto-login after sign-up
      return await login(userData.email, userData.password);
    } catch (err) {
      throw new Error(err.message || "Connection to server failed.");
    }
  };

  const loginAsGuest = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsGuest(true);
        setUser(null);
        localStorage.setItem("setuai_guest", "true");
        localStorage.removeItem("setuai_user");
        localStorage.removeItem("setuai_token");
        resolve();
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    setIsGuest(false);
    localStorage.removeItem("setuai_user");
    localStorage.removeItem("setuai_guest");
    localStorage.removeItem("setuai_token");
  };

  const updateUser = (updatedData) => {
    setUser((prev) => {
      const updated = { ...prev, ...updatedData };
      localStorage.setItem("setuai_user", JSON.stringify(updated));
      // Save to server if token is available
      const token = localStorage.getItem("setuai_token");
      if (token) {
        fetch("/api/auth/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(updated)
        }).catch(err => console.error("Failed to sync profile update to server:", err));
      }
      return updated;
    });
    if (isGuest) {
      setIsGuest(false);
      localStorage.removeItem("setuai_guest");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isGuest,
        isAuthenticated: !!user || isGuest,
        loading,
        login,
        signUp,
        loginAsGuest,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
