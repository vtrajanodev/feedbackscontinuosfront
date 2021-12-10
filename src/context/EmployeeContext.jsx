import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { AuthContext } from "./AuthContext";

export const EmployeeContext = createContext()

export const EmployeeContextProvider = ({ children }) => {


  const [employee, setEmployee] = useState({
    nome: '',
    email: '',
  })

  const navigate = useNavigate()


  const getEmployeeInfos = async () => {
    const { data } = await api.get('/funcionario/usuario')    
    setEmployee({
      nome: data.nome,
      email: data.email
    })
  }

  const handleRegisterEmployee = async (employee) => {
    const response = await api.post('/funcionario/cadastro', employee)

    navigate('/')
    console.log(response.data)
  }

  return (
    <EmployeeContext.Provider value={{ handleRegisterEmployee, getEmployeeInfos, employee }}>
      {children}
    </EmployeeContext.Provider>
  );
}