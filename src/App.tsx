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
import ChartsPage from "./pages/ChartPage";
import { AuthProvider } from "./context/AuthContext";
import Customer from "./pages/Customer";
import Address  from "./pages/Address";
import Order from "./pages/Order";
import Shift  from "./pages/Shift";
import Issue from "./pages/Issue";
import PedidosPage from "./pages/PedidosPages";



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
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/conductores" element={<DriversPage />} />
            <Route path="/graficos" element={<ChartsPage />} />
            <Route path="/motocicletas" element={<MotorcyclesPage />} />
            <Route path="/clientes" element={<Customer />} />
            <Route path="/direcciones" element={<Address />} />
            <Route path="/ordenes" element={<Order />} />
            <Route path="/turnos" element={<Shift />} />
            <Route path="/inconvenientes" element={<Issue/>} />
            <Route path="/mapa" element={<PedidosPage/>} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
