import { Routes, Route } from "react-router-dom"

// pages
import LandingPage from "../pages/Customer/LandingPage"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/Customer/RegisterPage"
import HomePage from "../pages/Customer/HomePage"
import MeetingPage from "../pages/Customer/MeetingPage"
import EventPage from "../pages/Customer/EventPage"
import CospacePage from "../pages/Customer/CospacePage"
import PaymentPage from "../pages/Customer/PaymentPage"
import SuccessPage from "../pages/Customer/SuccessPage"
import OrderPage from "../pages/Customer/OrderPage"

// dashboard
import DashboardPage from "../pages/Dashboard/DashboardPage"
import BankPage from "../pages/Dashboard/banks/BankPage"
import CreateBankPage from "../pages/Dashboard/banks/CreateBankPage"
import EditBankPage from "../pages/Dashboard/banks/EditBankPage"
import BannerPage from "../pages/Dashboard/banners/BannerPage"
import CreateBannerPage from "../pages/Dashboard/banners/CreateBannerPage"
import EditBannerPage from "../pages/Dashboard/banners/EditBannerPage"
import FacilityPage from "../pages/Dashboard/facilitys/FacilityPage"
import CreateFacilityPage from "../pages/Dashboard/facilitys/CreateFacilityPage"
import EditFacilityPage from "../pages/Dashboard/facilitys/EditFacilityPage"
import UserPage from "../pages/Dashboard/users/UserPage"
import CreateUserPage from "../pages/Dashboard/users/CreateUserPage"
import EditUserPage from "../pages/Dashboard/users/EditUserPage"
import RoomPage from "../pages/Customer/RoomPage"
import PrivateRoutes from "./PrivateRoutes"

function RouteIndex() {
  return (
    <Routes>
      {/* ======routes customer===== */}
      <Route path="/" Component={LandingPage} />
      <Route path="/login" Component={LoginPage} />
      <Route path="/register" Component={RegisterPage} />
      <Route path="/home" Component={HomePage} />
      <Route
        path="/ruangan/:slug"
        element={
          <PrivateRoutes>
            <RoomPage />
          </PrivateRoutes>
        }
      />
      <Route path="/payment/:kodePesanan" Component={PaymentPage} />
      <Route path="/success/:kodePesanan" Component={SuccessPage} />
      <Route path="/order" Component={OrderPage} />

      {/* <Route path="/ruang-meeting" Component={MeetingPage} />
      <Route path="/ruang-acara" Component={EventPage} />
      <Route path="/cospace" Component={CospacePage} /> */}

      {/*===== routes dashboard===== */}
      <Route path="/admin/dashboard" element={<DashboardPage />} />

      <Route path="/admin/bank" element={<BankPage />} />
      <Route path="/admin/bank/new" element={<CreateBankPage />} />
      <Route path="/admin/bank/:id" element={<EditBankPage />} />

      <Route path="/admin/banner" element={<BannerPage />} />
      <Route path="/admin/banner/new" element={<CreateBannerPage />} />
      <Route path="/admin/banner/:id" element={<EditBannerPage />} />

      <Route path="/admin/facility" element={<FacilityPage />} />
      <Route path="/admin/facility/new" element={<CreateFacilityPage />} />
      <Route path="/admin/facility/:id" element={<EditFacilityPage />} />

      <Route path="/admin/user" element={<UserPage />} />
      <Route path="/admin/user/new" element={<CreateUserPage />} />
      <Route path="/admin/user/:id" element={<EditUserPage />} />

    </Routes>
  )
}

export default RouteIndex
