import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react/cjs/react.development'
import { CardFeedbackEnviado } from '../../components/CardFeedbackEnviado/CardFeedbackEnviado'
import { CardFeedbackRecebido } from '../../components/CardFeedbackRecebido/CardFeedbackRecebido'
import { Loading } from '../../components/Loading/Loading'
import { AuthContext } from '../../context/AuthContext'
import { FeedbackContext } from '../../context/FeedbackContext'
import logo from '../../images/img.jpg'
import { api } from '../../services/api'
import styles from './home.module.css'

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
      ])
        .then(() => setLoading(false))
    }
  }, [])

  return (
    <main>
      {loading && <Loading />}
      <div className={styles.mainHeader}>
        <div>
          Ola {employee.nome}, seja bem vindo!
        </div>
        <nav>
          <ul>
            <Link to="/home">
              <li>Página principal</li>
            </Link>
            <Link to="/enviar-feedback">
              <li>Enviar feedback</li>
            </Link>
          </ul>
        </nav>
      </div>

      <CardFeedbackRecebido styles={styles} feedbacksRecebidos={feedbacksRecebidos} logo={logo} />
      <CardFeedbackEnviado styles={styles} feedbacksEnviados={feedbacksEnviados} logo={logo} navigate={navigate} />
    </main>
  )
}
