import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home"
import ChatBotGemini from "./components/chatBotGemini"
import './App.css'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Login/>} />
        <Route path = "/home" element = {<Home/>} />
      </Routes>
      <ChatBotGemini/>
    </BrowserRouter>
    
  )
}
export default App
