import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatBotGemini from "./components/chatBotGemini";
import NavBar from "./components/NavBar";
import LoginGoogle from './pages/Logingoogle/LoginGoogle';
import { DriversList } from './pages/Driver/DriverList';
import { DriverForm } from './pages/Driver/DriverForm';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginGoogle />} />
        <Route path="/conductores" element={<DriversList />} />
        <Route path="/conductores/nuevo" element={<DriverForm />} />
      </Routes>
      <ChatBotGemini />
    </Router>
  );
}

export default App;
