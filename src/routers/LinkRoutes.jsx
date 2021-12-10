import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RegisterUser } from '../pages/RegisterUser/RegisterUser';
import { Login } from '../pages/Login/Login';
import { EmployeeContextProvider } from "../context/EmployeeContext";
import { AuthContextProvider } from "../context/AuthContext";
import { Header } from "../components/Header/Header";


export const LinkRoutes = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <EmployeeContextProvider>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro-usuario" element={<RegisterUser />} />
          </Routes>
        </EmployeeContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  )
}
