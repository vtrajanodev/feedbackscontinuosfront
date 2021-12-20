import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react/cjs/react.development'
import { CardSendFeedback } from '../../components/CardSendFeedback/CardSendFeedback'
import { Loading } from '../../components/Loading/Loading'
import { EmployeeContext } from '../../context/EmployeeContext'
import { FeedbackContext } from '../../context/FeedbackContext'
import { api } from '../../services/api'
import styles from './sendfeedback.module.css'
import { FaHome } from 'react-icons/fa'
import { BiLike } from 'react-icons/bi'

export const SendFeedback = () => {

  const { loading, getEmployee, setLoading } = useContext(EmployeeContext)
  const { getTags } = useContext(FeedbackContext)
  const navigate = useNavigate()


  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (token) {
      api.defaults.headers.Authorization = token
      Promise.all([getEmployee(),
      getTags()
      ])
        .then(() => setLoading(false))
    } else {
      navigate('/login')
    }
  }, [])

  return (
    <>
      {loading &&
        <Loading />
      }
      <section className={styles.sendFeedbackContainer}>
        <div className={styles.sendFeedbackHeader}>
          <p>Envie feedback sobre um colaborador</p>
          <nav>
          <ul>
            <Link to="/home">
              <span>< FaHome /></span> 
              <li>Home</li>
            </Link>
            <Link to="/enviar-feedback" >
              <span>< BiLike /></span> 
              <li>Enviar</li>
            </Link>
          </ul>
          </nav>
        </div>
        <CardSendFeedback styles={styles} />
      </section>
    </>
  )
}
