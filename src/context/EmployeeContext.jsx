import { createContext } from "react";
import { useState } from "react";
import { api } from "../services/api";

export const EmployeeContext = createContext()

export const EmployeeContextProvider = ({ children }) => {

  const [employeeList, setEmployeeList] = useState([])
  const [loading, setLoading] = useState(true)

  const handleRegisterEmployee = async (employee) => {
    try {
      const response = await api.post('/funcionario/cadastro', employee)
      console.log(response.data)
    } catch (err) {
    }
  }

  const getAllEmployees = async () => {
    const { data } = await api.get('/funcionario')
    setEmployeeList(data)
  }

 

  const handlePostEmployeeImage = async (img) => {
    const upload = new FormData();
    upload.append('foto', img);
    const { data } = await api.post('foto-perfil/upload-foto', upload)
    api.defaults.headers.common['Content-Type'] = 'multipart/form-data'
    console.log(data)
  }

  return (
    <EmployeeContext.Provider value={{ handleRegisterEmployee, employeeList, loading, setLoading, handlePostEmployeeImage, getAllEmployees }}>
      {children}
    </EmployeeContext.Provider>
  );
}