import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  Dashboard  from "./pages/Dashboard";
import  Login  from "./pages/Login";
import  Register  from "./pages/Register";
import Header from "./components/Header";

import { ToastContainer } from "react-toastify"; //this is needed for the toast to work in components
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header/>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
