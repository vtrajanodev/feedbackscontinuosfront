import { createContext } from "react";
import { useState } from "react";
import { api } from "../services/api";

export const EmployeeContext = createContext()

export const EmployeeContextProvider = ({ children }) => {

  const [employeeList, setEmployeeList] = useState([])
  const [employeeProfile, setEmployeeProfile] = useState([])
  const [loading, setLoading] = useState(true)

  const handleRegisterEmployee = async (employee) => {
    try {
      await api.post('/funcionario/cadastro', employee)
    } catch (err) {
      console.log(err)
    }
  }

  const getAllEmployees = async () => {
    setLoading(true)
    const { data } = await api.get('/funcionario')
    setEmployeeList(data)
    setLoading(false)
  }

  const getEmployee = async (id) => {
    setLoading(true)
    const { data } = await api.get(`/funcionario/${id}`)
    setEmployeeProfile([data])
    setLoading(false)
  }


  const handlePostEmployeeImage = async (img) => {
    const upload = new FormData();
    upload.append('foto', img);
    const { data } = await api.post('foto-perfil/upload-foto', upload)
    api.defaults.headers.common['Content-Type'] = 'multipart/form-data'
    console.log(data)
  }

  return (
    <EmployeeContext.Provider value={{ handleRegisterEmployee, employeeList, loading, setLoading, handlePostEmployeeImage, getAllEmployees, getEmployee, employeeProfile }}>
      {children}
    </EmployeeContext.Provider>
  );
}