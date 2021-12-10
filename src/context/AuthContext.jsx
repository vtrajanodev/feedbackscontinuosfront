import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.defaults.headers.common['Authorization'] = token
      setIsAuthenticated(true)
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
      navigate('/home')
    } catch (err) {
      alert(err)
    }
  }

  const handleLogout = () => {
    const logout = localStorage.removeItem('token')

    if (localStorage.getItem('token') === null) {
      setIsAuthenticated(false)
    }
      
    return logout
  }

  return (
    <AuthContext.Provider value={{ handleLogin, isAuthenticated, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}