import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) {
      api.defaults.headers.common['Authorization'] = token
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = async (employee) => {
    try {
      const { data } = await api.post('/funcionario/login', employee)
      const token = data
      console.log(token)
      localStorage.setItem('token', token)
      api.defaults.headers.common['Authorization'] = token
      setIsAuthenticated(true)
      navigate('/')
    } catch (err) {
      alert(err)
    }
  }


  return (
    <AuthContext.Provider value={{handleLogin}}>
      {children}
    </AuthContext.Provider>
  );
}