import "./App.css";

import { Outlet } from "react-router-dom";

// Componente principal da aplicação
import Navbar from "./components/Navbar.jsx";
import Home from "./routes/Home.jsx";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
