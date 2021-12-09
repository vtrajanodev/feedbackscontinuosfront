import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RegisterUser } from '../pages/RegisterUser/RegisterUser/RegisterUser';
import { Login } from '../pages/Login/Login';


export const LinkRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/cadastro-usuario" element={<RegisterUser />}/>
      </Routes>
    </BrowserRouter>
  )
}
