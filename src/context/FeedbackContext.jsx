import { createContext } from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { api } from "../services/api";

export const FeedbackContext = createContext()

export const FeedbackContextProvider = ({ children }) => {

  const [feedbacksRecebidos, setFeedbacksRecebidos] = useState([])
  const [feedbacksEnviados, setFeedbacksEnviados] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.defaults.headers.common['Authorization'] = token
      getFeedbacksRecebidos()
      getFeedbacksEnviados()
    }
  }, [])

  const getFeedbacksRecebidos = async () => {
    const { data } = await api.get('/feedbacks/recebidos')
    console.log(data)
    setFeedbacksRecebidos(data)
  }

  const getFeedbacksEnviados = async () => {
    const { data } = await api.get('feedbacks/enviados')
    console.log(data)
    setFeedbacksEnviados(data)
  }

 
  return (
    <FeedbackContext.Provider value={{ feedbacksRecebidos, feedbacksEnviados }}>
      {children}
    </FeedbackContext.Provider>
  );
}