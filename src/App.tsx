import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "./components/NavBar";
import Sidebar from "./components/SideBar"; // Importar el nuevo componente
import ChatBotGemini from "./components/chatBotGemini";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/login";
import Home from "./pages/home";
import Products from "./pages/products";
import DriversPage from "./pages/Drivers";
import MotorcyclesPage from "./pages/motorcycles";
import ChartsPage from "./pages/ChartPage";
import Restaurants from "./pages/Restaurants";
import Customer from "./pages/Customer";
import Address from "./pages/Address";
import Order from "./pages/Order";
import Menus from "./pages/Menu";
import Issue from "./pages/Issue";
import PedidosMapa from "./pages/MapView";
import Shifts from "./pages/Shifts"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MotorcycleInfringementsPage from './pages/MotorcycleInfringementsPage';
import InfringementPage from "./pages/InfringementPage";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { isLoading } = useAuth0();
  const hideHeaderAndChat = location.pathname === "/" || isLoading;
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Añadir/quitar clase para la página de login
  useEffect(() => {
    if (location.pathname === "/") {
      document.body.classList.add('login-page');
    } else {
      document.body.classList.remove('login-page');
    }
  }, [location.pathname]);

  // Manejar el estado de colapso del sidebar
  const handleSidebarToggle = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  return (
    <>
      {!hideHeaderAndChat && <NavBar />}
      {!hideHeaderAndChat && <Sidebar onToggle={handleSidebarToggle} />}
      <div className={`main-content ${sidebarCollapsed ? 'sidebar-hidden' : ''}`}>
        {children}
      </div>
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
            <Route path="/restaurantes" element={<Restaurants />} />
            <Route path="/clientes" element={<Customer />} />
            <Route path="/direcciones" element={<Address />} />
            <Route path="/ordenes" element={<Order />} />
            <Route path="/menus" element={<Menus />} />
            <Route path="/inconvenientes" element={<Issue />} />
            <Route path="/mapa" element={<PedidosMapa />} />
            <Route path="/turnos" element={<Shifts />} />
            <Route path="/motos/:id/infracciones" element={<MotorcycleInfringementsPage />} />
            <Route path="/infracciones/:id" element={<InfringementPage />} />
            
          </Routes>
        </Layout>
        <ToastContainer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
