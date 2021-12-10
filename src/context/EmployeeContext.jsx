import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export const EmployeeContext = createContext()

export const EmployeeContextProvider = ({ children }) => {

  const navigate = useNavigate()

  const handleRegisterEmployee = async (employee) => {
    try {
      const response = await api.post('/funcionario/cadastro', employee)
      navigate('/login')
      console.log(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <EmployeeContext.Provider value={{ handleRegisterEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
}