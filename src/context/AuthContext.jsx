import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for active sessions on load
  useEffect(() => {
    const storedUser = localStorage.getItem("setuai_user");
    const storedGuest = localStorage.getItem("setuai_guest");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else if (storedGuest === "true") {
      setIsGuest(true);
    }
    setLoading(false);
  }, []);

  const login = (phoneOrEmail, password) => {
    // Return a Promise to simulate server response
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Fetch all registered users to look up
        const users = JSON.parse(localStorage.getItem("setuai_users") || "[]");
        const foundUser = users.find(
          (u) => (u.email === phoneOrEmail || u.phone === phoneOrEmail) && u.password === password
        );

        if (foundUser) {
          // Exclude password from current session storage
          const { password: _, ...sessionUser } = foundUser;
          setUser(sessionUser);
          setIsGuest(false);
          localStorage.setItem("setuai_user", JSON.stringify(sessionUser));
          localStorage.removeItem("setuai_guest");
          resolve(sessionUser);
        } else {
          // If no custom user exists, check default demo user
          if ((phoneOrEmail === "9876543210" || phoneOrEmail === "demo@setuai.org") && password === "123456") {
            const demoUser = {
              name: "Ramesh Kumar",
              phone: "9876543210",
              email: "demo@setuai.org",
              type: "farmer",
              language: "hi"
            };
            setUser(demoUser);
            setIsGuest(false);
            localStorage.setItem("setuai_user", JSON.stringify(demoUser));
            localStorage.removeItem("setuai_guest");
            resolve(demoUser);
          } else {
            reject(new Error("Invalid mobile/email or password. Try 9876543210 / 123456 as demo."));
          }
        }
      }, 1000);
    });
  };

  const signUp = (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem("setuai_users") || "[]");
        users.push(userData);
        localStorage.setItem("setuai_users", JSON.stringify(users));

        // Auto-login after sign-up
        const { password: _, ...sessionUser } = userData;
        setUser(sessionUser);
        setIsGuest(false);
        localStorage.setItem("setuai_user", JSON.stringify(sessionUser));
        localStorage.removeItem("setuai_guest");
        resolve(sessionUser);
      }, 1000);
    });
  };

  const loginAsGuest = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsGuest(true);
        setUser(null);
        localStorage.setItem("setuai_guest", "true");
        localStorage.removeItem("setuai_user");
        resolve();
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    setIsGuest(false);
    localStorage.removeItem("setuai_user");
    localStorage.removeItem("setuai_guest");
  };

  const updateUser = (updatedData) => {
    setUser((prev) => {
      const updated = { ...prev, ...updatedData };
      localStorage.setItem("setuai_user", JSON.stringify(updated));
      return updated;
    });
    // If guest, convert to user upon profile save
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
