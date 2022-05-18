import "./App.css";

import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import ProtectedRoute from "./components/Layout/ProtectedRoute";

import Homepage from "./components/Homepage";
import NotFound from "./components/Notfound";
import Login from "./components/Login";
import Users from "./components/Users";
import NewUser from "./components/NewUser";
import User from "./components/User";
import EditUser from "./components/EditUser";
import NewMedicine from "./components/NewMedicine";

import { Outlet } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { UsersProvider } from "./context/UsersProvider";

function BasicLayout() {
  return (
    <>
      <div className="app">
        <div className="header">
          <Header />
        </div>
        <div className="app-content">
          <Outlet />
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UsersProvider>
          <Routes>
            <Route path="/" element={<BasicLayout />}>
              <Route index element={<Homepage />} />
              <Route path="/login" element={<Login />} />
            </Route>

            <Route path="/CRM" element={<ProtectedRoute />}>
              <Route index element={<Users />} />
              <Route path="new-user" element={<NewUser />}></Route>
              <Route path="new-medicine" element={<NewMedicine/>}></Route>
              <Route path=":id" element={<User />}></Route>
              <Route path="edit/:id" element={<EditUser />}></Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </UsersProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;