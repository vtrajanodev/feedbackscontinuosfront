import { Navigate, Route, Routes } from "react-router-dom";
import { RegisterUser } from '../pages/RegisterUser/RegisterUser';
import { Login } from '../pages/Login/Login';
import { Header } from "../components/Header/Header";
import { Home } from "../pages/Home/Home";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { SendFeedback } from "../pages/SendFeedback/SendFeedback";
import { useEffect } from "react/cjs/react.development";
import { api } from "../services/api";



export const LinkRoutes = ({ }) => {

  const { token } = useContext(AuthContext)

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (token) {
      api.defaults.headers.common['Authorization'] = token
    }
  }, [])

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
        <Route path="/enviar-feedback" element={<SendFeedback />} />
        <Route path="*" element={
          !token ?
            <Navigate to="/login" />
            :
            <Navigate to="/home" />
        } />
      </Routes>
    </>
  )
}
