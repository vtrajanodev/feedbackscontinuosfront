import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { api } from "../services/api";

export const EmployeeContext = createContext()

export const EmployeeContextProvider = ({ children }) => {

  const [employeeList, setEmployeeList] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.defaults.headers.common['Authorization'] = token
      Promise.all([getEmployee()]).then(() => setLoading(false))
    }
  }, [])

  const handleRegisterEmployee = async (employee) => {
    try {
      const response = await api.post('/funcionario/cadastro', employee)
      navigate('/login')
      console.log(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const getEmployee = async () => {
    const { data } = await api.get('/funcionario/funcionarios')
    console.log(data)
    setEmployeeList(data)
  }

 

  return (
    <EmployeeContext.Provider value={{ handleRegisterEmployee, employeeList, loading }}>
      {children}
    </EmployeeContext.Provider>
  );
}