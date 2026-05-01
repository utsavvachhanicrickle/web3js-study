import { useContext } from "react";
import { DarkModeContext } from "../context/darkModeContext";
import { useEffect } from "react";

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="px-3 py-1 bg-(--bg) text-(--text) rounded"
    >
      {darkMode ? "Light" : "Dark"}
    </button>
  );
};

export default ThemeToggle;
