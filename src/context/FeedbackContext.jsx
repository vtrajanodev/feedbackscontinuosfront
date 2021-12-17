import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { api } from "../services/api";

export const FeedbackContext = createContext()

export const FeedbackContextProvider = ({ children }) => {

  const [feedbacksRecebidos, setFeedbacksRecebidos] = useState([])
  const [feedbacksEnviados, setFeedbacksEnviados] = useState([])
  const [tagsList, setTagsList] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

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
      setTimeout(() => {
        navigate('/home')
      }, 1000);
      navigate('/home')
    } catch (err) {
      console.log('deu erro =>' + err)
    }
  }

  const handleEditVisibleStatus = async (feedback) => {
    
    if (feedback.visivel) {
      const { data } = await api.put(`/feedbacks/alterar-visivel/${feedback.idFeedback}`)
      console.log(data)
    } else {
      const { data } = await api.put(`/feedbacks/alterar-visivel/${feedback.idFeedback}`)
      console.log(data)
    }
    getFeedbacksRecebidos()
  }


  return (
    <FeedbackContext.Provider value={{ feedbacksRecebidos, feedbacksEnviados, tagsList, postFeedback, handleEditVisibleStatus, getFeedbacksRecebidos, getFeedbacksEnviados, getTags, loading, setLoading }}>
      {children}
    </FeedbackContext.Provider>
  );
}