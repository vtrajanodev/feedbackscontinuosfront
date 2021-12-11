import { Navigate, Route, Routes } from "react-router-dom";
import { RegisterUser } from '../pages/RegisterUser/RegisterUser';
import { Login } from '../pages/Login/Login';
import { Header } from "../components/Header/Header";
import { Home } from "../pages/Home/Home";
import { NotFound } from "../pages/NotFound/NotFound";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";



export const LinkRoutes = () => {

  const { token } = useContext(AuthContext)

  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={
            token ?
              <Navigate to="/home" />
              :
              <Login />
          } /> 
        <Route path="/cadastro-usuario" element={<RegisterUser />} />
        <Route path="/home" element=
          {
            !token ?
              <Navigate to="/login" />
              :
              <Home />
          } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
