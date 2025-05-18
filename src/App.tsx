import React from "react";
import './styles/App.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./pages/login";
import Home from "./pages/home";
import ChatBotGemini from "./components/chatBotGemini";
import NavBar from "./components/NavBar";
import Products from "./pages/products";
import DriversPage from "./pages/Drivers";
import MotorcyclesPage from "./pages/motorcycles";
import ChartsPage from "./pages/ChartPage"; // ⬅️ Nuevo import

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { isLoading } = useAuth0();
  const hideHeaderAndChat = location.pathname === "/" || isLoading;

  return (
    <>
      {!hideHeaderAndChat && <NavBar />}
      {children}
      {!hideHeaderAndChat && <ChatBotGemini />}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/conductores" element={<DriversPage />} />
          <Route path="/graficos" element={<ChartsPage />} />
          <Route path="/motocicletas" element={<MotorcyclesPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
