import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export const EmployeeContext = createContext()

export const EmployeeContextProvider = ({ children }) => {

  const navigate = useNavigate()

  const handleRegisterEmployee = async (employee) => {
    const response = await api.post('/funcionario/cadastro' , employee)

    navigate('/')

    console.log(response.data)
  }

  return (
    <EmployeeContext.Provider value={{handleRegisterEmployee}}>
      {children}
    </EmployeeContext.Provider>
  );
}