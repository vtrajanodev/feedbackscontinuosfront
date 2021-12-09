import { BrowserRouter, Route, Routes } from "react-router-dom"
import { RegisterUser } from './pages/RegisterUser/RegisterUser'


export const LinkRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastro-usuario" element={<RegisterUser />}/>
      </Routes>
    </BrowserRouter>
  )
}
