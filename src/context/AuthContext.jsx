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
    fotoFuncionario: ''
  })

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (token) {
      api.defaults.headers.Authorization = token
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = async (employee) => {
    try {
      const response = await api.post('/funcionario/login', employee)
      console.log(response.data)
      const token = response.data
      sessionStorage.setItem('token', token)
      api.defaults.headers.common['Authorization'] = token
      setIsAuthenticated(true)
      navigate('/home')
    } catch (err) {
      alert('Campos login e/ou senha incorretos.')
    }
  }

  const getEmployeeInfos = async () => {
    try {
      const { data } = await api.get('/funcionario/usuario')
      setEmployee({
        nome: data.nome,
        email: data.email,
        id: data.idFuncionario,
        fotoFuncionario: data.fotoFuncionario
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('token')
    sessionStorage.clear()

    if (sessionStorage.getItem('token') === null) {
      setIsAuthenticated(false)
    }
    window.location.href = '/login'
  }
  return (
    <AuthContext.Provider value={{ handleLogin, isAuthenticated, handleLogout, setIsAuthenticated, employee, token, getEmployeeInfos }}>
      {children}
    </AuthContext.Provider>
  );
}