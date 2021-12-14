import { createContext } from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { api } from "../services/api";

export const FeedbackContext = createContext()

export const FeedbackContextProvider = ({ children }) => {

  const [feedbacksRecebidos, setFeedbacksRecebidos] = useState([])
  const [feedbacksEnviados, setFeedbacksEnviados] = useState([])
  const [tagsList, setTagsList] = useState([])
  const [loading, setLoading] = useState(true)

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
      alert('Feedback enviado com sucesso!')
      window.location.href = '/home'
    } catch (err) {
      console.log('deu erro =>' + err)
      console.log(values)
    }
  }

  const handleEditVisibleStatus = async (feedback) => {

    if (feedback.visivel) {
      const { data } = await api.put(`/feedbacks/alterar-visivel/${feedback.idFeedback}`)
        .then(getFeedbacksRecebidos())
      console.log(data)
    } else {
      const { data } = await api.put(`/feedbacks/alterar-visivel/${feedback.idFeedback}`)
      console.log(data)
    }
  }


  return (
    <FeedbackContext.Provider value={{ feedbacksRecebidos, feedbacksEnviados, tagsList, postFeedback, handleEditVisibleStatus, getFeedbacksRecebidos }}>
      {children}
    </FeedbackContext.Provider>
  );
}