import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RegisterUser } from '../pages/RegisterUser/RegisterUser';
import { Login } from '../pages/Login/Login';
import { EmployeeContextProvider } from "../context/EmployeeContext";
import { AuthContextProvider } from "../context/AuthContext";
import { Header } from "../components/Header/Header";
import { Home } from "../pages/Home/Home";
import { FeedbackContextProvider } from "../context/FeedbackContext";


export const LinkRoutes = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <EmployeeContextProvider>
          <FeedbackContextProvider>
            <Header />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro-usuario" element={<RegisterUser />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </FeedbackContextProvider>
        </EmployeeContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  )
}
