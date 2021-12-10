import { createContext } from "react";
import { api } from "../services/api";

export const EmployeeContext = createContext()

export const EmployeeContextProvider = ({ children }) => {

  const handleRegisterEmployee = async (employee) => {
    const response = await api.post('/funcionario/cadastro' , employee)

    console.log(response.data)
  }

  return (
    <EmployeeContext.Provider value={{handleRegisterEmployee}}>
      {children}
    </EmployeeContext.Provider>
  );
}