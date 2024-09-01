import { Routes, Route } from "react-router-dom"

// pages
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import HomePage from "./pages/HomePage"
import MeetingPage from "./pages/MeetingPage"
import EventPage from "./pages/EventPage"
import CospacePage from "./pages/CospacePage"
import PaymentPage from "./pages/PaymentPage"

function App() {
    return (
    <Routes>
      <Route path="/" Component={LandingPage} />
      <Route path="/login" Component={LoginPage} />
      <Route path="/register" Component={RegisterPage} />
      <Route path="/home" Component={HomePage} />
      <Route path="/ruang-meeting" Component={MeetingPage} />
      <Route path="/ruang-acara" Component={EventPage} />
      <Route path="/cospace" Component={CospacePage} />
      <Route path="/payment" Component={PaymentPage} />
    </Routes>
  )
}

export default App
