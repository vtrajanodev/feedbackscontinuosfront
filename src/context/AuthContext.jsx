import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../services/api";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  const [employee, setEmployee] = useState({
    nome: '',
    email: '',
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.defaults.headers.common['Authorization'] = token
      setIsAuthenticated(true)
      getEmployeeInfos()
      setLoading(false)
    }
  }, [])

  const handleLogin = async (employee) => {
    try {
      const response = await api.post('/funcionario/login', employee)
      console.log(response)
      const token = response.data
      console.log(token)
      localStorage.setItem('token', token)
      api.defaults.headers.common['Authorization'] = token
      setIsAuthenticated(true)
      window.location.href = '/home'
      setLoading(false)
    } catch (err) {
      console.log(err)
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
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleLogout = () => {
    const logout = localStorage.removeItem('token')

    if (localStorage.getItem('token') === null) {
      setIsAuthenticated(false)
    }
    setLoading(false)

    return logout
  }
  return (
    <AuthContext.Provider value={{ handleLogin, isAuthenticated, handleLogout, setIsAuthenticated, employee, token, loading }}>
      {children}
    </AuthContext.Provider>
  );
}