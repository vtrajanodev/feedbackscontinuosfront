import { createContext } from "react";
import { useState } from "react";
import { api } from "../services/api";

export const FeedbackContext = createContext()

export const FeedbackContextProvider = ({ children }) => {

  const [feedbacksRecebidos, setFeedbacksRecebidos] = useState([])
  const [feedbacksEnviados, setFeedbacksEnviados] = useState([])
  const [tagsList, setTagsList] = useState([])
  const [loading, setLoading] = useState(true)

  const getFeedbacksRecebidos = async () => {
    const { data } = await api.get('/feedbacks/recebidos')
    setFeedbacksRecebidos(data)
  }

  const getFeedbacksEnviados = async () => {
    const { data } = await api.get('feedbacks/enviados')
    setFeedbacksEnviados(data)
  }

  const getTags = async () => {
    const { data } = await api.get('/tags/lista-tags')
    setTagsList(data)
  }

  const postFeedback = async (values) => {
    try {
      await api.post('/feedbacks/postar', values)
      alert('Feedback enviado com sucesso!')
      window.location.href = '/home'
    } catch (err) {
      console.log('deu erro =>' + err)
    }
  }

  const handleEditVisibleStatus = async (feedback) => {

    if (feedback.visivel) {
      await api.put(`/feedbacks/alterar-visivel/${feedback.idFeedback}`)
    } else {
      await api.put(`/feedbacks/alterar-visivel/${feedback.idFeedback}`)
    }
    getFeedbacksRecebidos()
  }


  return (
    <FeedbackContext.Provider value={{ feedbacksRecebidos, feedbacksEnviados, tagsList, postFeedback, handleEditVisibleStatus, getFeedbacksRecebidos, getFeedbacksEnviados, getTags, loading, setLoading }}>
      {children}
    </FeedbackContext.Provider>
  );
}