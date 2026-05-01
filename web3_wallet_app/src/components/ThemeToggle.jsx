import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useEffect } from "react";

const ThemeToggle = () => {
  const { dark, setDark } = useContext(ThemeContext);
  useEffect(() => {
    const root = document.documentElement;

    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);
  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-3 py-1 bg-gray-700 text-white rounded"
    >
      {dark ? "Light" : "Dark"}
    </button>
  );
};

export default ThemeToggle;
