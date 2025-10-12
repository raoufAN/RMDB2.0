//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WrapperSection from "./components/wrapperSection/WrapperSection";
import Login from "./pages/loginPage/Login";
import { AnimatePresence } from "motion/react";
import AnimationPages from "./components/animationPages/AnimationPages";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import UseAuth from "./Hooks/useAuth";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  // check if is log in or not
  UseAuth();

  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route
            path="/login"
            element={
              <AnimationPages>
                <Login />
              </AnimationPages>
            }
          />
          <Route
            path="/*"
            element={
              <AnimationPages>
                <WrapperSection />
              </AnimationPages>
            }
          />
        </Routes>
      </AnimatePresence>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
};

export default App;
