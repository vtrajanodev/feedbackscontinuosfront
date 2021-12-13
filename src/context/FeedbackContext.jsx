import { createContext } from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { api } from "../services/api";

export const FeedbackContext = createContext()

export const FeedbackContextProvider = ({ children }) => {

  const [feedbacksRecebidos, setFeedbacksRecebidos] = useState([])
  const [feedbacksEnviados, setFeedbacksEnviados] = useState([])
  const [tagsList, setTagsList] = useState([])


  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.defaults.headers.common['Authorization'] = token
      getFeedbacksRecebidos()
      getFeedbacksEnviados()
      getTags()
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

  const getTags = async () => {
    const { data } = await api.get('/tags/lista-tags')
    console.log(data)
    setTagsList(data)
  }

  const postFeedback = async (values) => {
    console.log(values)
    try {
      const { data } = await api.post('/feedbacks/postar', values)
      console.log(data)
    } catch (err) {
      console.log('deu erro =>' + err)
      console.log(values)

    }
  }


  return (
    <FeedbackContext.Provider value={{ feedbacksRecebidos, feedbacksEnviados, tagsList, postFeedback }}>
      {children}
    </FeedbackContext.Provider>
  );
}