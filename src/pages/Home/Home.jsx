import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react/cjs/react.development'
import { CardFeedbackEnviado } from '../../components/CardFeedbackEnviado/CardFeedbackEnviado'
import { CardFeedbackRecebido } from '../../components/CardFeedbackRecebido/CardFeedbackRecebido'
import { Loading } from '../../components/Loading/Loading'
import { AuthContext } from '../../context/AuthContext'
import { FeedbackContext } from '../../context/FeedbackContext'
import { api } from '../../services/api'
import styles from './home.module.css'
import { FaHome } from 'react-icons/fa';
import { BiLike } from 'react-icons/bi';

export const Home = () => {

  const { employee, getEmployeeInfos } = useContext(AuthContext)
  const { feedbacksRecebidos, feedbacksEnviados, getFeedbacksRecebidos, getFeedbacksEnviados, getTags, setLoading, loading } = useContext(FeedbackContext)

  const navigate = useNavigate()

  useEffect(() => {
    const token = sessionStorage.getItem('token')

    if (token) {
      api.defaults.headers.Authorization = token
      Promise.all([getEmployeeInfos(),
      getFeedbacksRecebidos(),
      getFeedbacksEnviados(),
      getTags()
      ]).then(() => setLoading(false))
    }
  }, [])

  return (
    <main>
      {loading && <Loading />}
      <div className={styles.mainHeader}>
            <Link to="/home">
            Boas-vindas, {employee.nome}!
            </Link>
        <nav>
          <ul>
            <Link to="/home">
              <span>< FaHome /></span> 
              <li>Home</li>
            </Link>
            <Link to="/enviar-feedback">
              <span>< BiLike /></span> 
              <li>Enviar</li>
            </Link>
          </ul>
        </nav>
      </div>

      <CardFeedbackRecebido styles={styles} feedbacksRecebidos={feedbacksRecebidos} />
      <CardFeedbackEnviado styles={styles} feedbacksEnviados={feedbacksEnviados} navigate={navigate} />
    </main>
  )
}