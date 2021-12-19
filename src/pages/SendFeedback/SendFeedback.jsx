import { Link, Navigate } from 'react-router-dom'
import { useContext, useEffect } from 'react/cjs/react.development'
import { CardSendFeedback } from '../../components/CardSendFeedback/CardSendFeedback'
import { Loading } from '../../components/Loading/Loading'
import { EmployeeContext } from '../../context/EmployeeContext'
import { api } from '../../services/api'
import styles from './sendfeedback.module.css'

export const SendFeedback = () => {

  const { loading, getEmployee, setLoading } = useContext(EmployeeContext)

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (token) {
      api.defaults.headers.Authorization = token
      Promise.all([getEmployee()])
        .then(() => setLoading(false))
    } else {
      <Navigate to="/login" />
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
          <Link to="/home">Home</Link>
        </div>
        <CardSendFeedback styles={styles} />
      </section>
    </>
  )
}
