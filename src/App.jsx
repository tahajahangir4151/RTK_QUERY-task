import React from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store/store";
import { Github, Moon, Sun } from "lucide-react";
import { toggleTheme } from "./store/slices/themeSlice";
import SearchBar from "./components/SearchBar";
import Home from "./pages/Home";

function AppContent() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

  //UseEffect to check which class theme is present then add and remove class based on it
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to={"/"} className="flex items-center space-x-3">
              <Github className="w-8 h-8 text-gray-900 dark:text-white" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                GitHub Explorer
              </h1>
            </Link>
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="mt-4">
            <SearchBar />
          </div>
        </div>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;
