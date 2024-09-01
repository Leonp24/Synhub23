import { Routes, Route } from "react-router-dom"

// pages
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import HomePage from "./pages/HomePage"
import MeetingPage from "./pages/MeetingPage"

function App() {
    return (
    <Routes>
      <Route path="/" Component={LandingPage} />
      <Route path="/login" Component={LoginPage} />
      <Route path="/register" Component={RegisterPage} />
      <Route path="/home" Component={HomePage} />
      <Route path="/ruang-meeting" Component={MeetingPage} />
    </Routes>
  )
}

export default App
