import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check local storage for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  const [darkMode, setDarkMode] = useState(savedTheme ? savedTheme === "dark" : true);

  useEffect(() => {
    // Persist theme choice
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    
    // Apply theme class to body for global CSS targeting
    if (darkMode) {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);