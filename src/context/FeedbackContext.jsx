import { createContext } from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { api } from "../services/api";

export const FeedbackContext = createContext()

export const FeedbackContextProvider = ({ children }) => {

  const [feedbacksRecebidos, setFeedbacksRecebidos] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.defaults.headers.common['Authorization'] = token
      getFeedbacksRecebidos()
    }
  }, [])

  const getFeedbacksRecebidos = async () => {
    const { data } = await api.get('/feedbacks/recebidos')
    console.log(data)
    setFeedbacksRecebidos(data)
  }

 
  return (
    <FeedbackContext.Provider value={{ feedbacksRecebidos }}>
      {children}
    </FeedbackContext.Provider>
  );
}