import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const token = sessionStorage.getItem('token')
  const navigate = useNavigate()

  const [employee, setEmployee] = useState({
    nome: '',
    email: '',
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.defaults.headers.Authorization = token
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = async (employee) => {
    try {
      const response = await api.post('/funcionario/login', employee)
      console.log(response)
      const token = response.data
      console.log(token)
      sessionStorage.setItem('token', token)
      api.defaults.headers.common['Authorization'] = token
      setIsAuthenticated(true)
      navigate('/home')
    } catch (err) {
      alert('Login e/ou senha incorretos')

    }
  }

  const getEmployeeInfos = async () => {
    try {
      const { data } = await api.get('/funcionario/usuario')
      setEmployee({
        nome: data.nome,
        email: data.email,
        id: data.idFuncionario
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleLogout = () => {
    const logout = sessionStorage.removeItem('token')

    if (localStorage.getItem('token') === null) {
      setIsAuthenticated(false)
    }

    return logout
  }
  return (
    <AuthContext.Provider value={{ handleLogin, isAuthenticated, handleLogout, setIsAuthenticated, employee, token, getEmployeeInfos }}>
      {children}
    </AuthContext.Provider>
  );
}