import React from "react";
import './styles/App.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import ChatBotGemini from "./components/chatBotGemini";
import NavBar from "./components/NavBar";
import { DriversList } from "./pages/Driver/DriverList";
import { DriverForm } from "./pages/Driver/DriverForm";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const hideHeaderAndChat = location.pathname === "/";
  
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
          <Route path="/conductores" element={<DriversList />} />
          <Route path="/conductores/nuevo" element={<DriverForm />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;