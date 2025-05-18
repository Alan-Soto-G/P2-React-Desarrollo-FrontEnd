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
import ListAddresses from "./pages/Addresses/AddressList";
import Create from "./pages/Addresses/Create";
import Update from "./pages/Addresses/Update";
import ListCustomers from "./pages/Customers/CustomerList";
import CreateC from "./pages/Customers/CreateC";
import UpdateC from "./pages/Customers/UpdateC";



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
          <Route path="/direcciones" element={<ListAddresses />} />
          <Route path="/direcciones/crear" element={<Create />} />
          <Route path="/direcciones/actualizar" element={<Update />} />
          <Route path="/clientes" element={<ListCustomers />} />
          <Route path="/clientes/crear" element={<CreateC />} />
          <Route path="/clientes/actualizar" element={<UpdateC />} />





          

          {/* <Route path="/conductores/crear" element={<DriverForm />} /> */}
          {/* <Route path="/conductores/editar/:id" element={<DriverForm />} /> */}
          {/* <Route path="/conductores/:id" element={<DriverForm />} /> */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
