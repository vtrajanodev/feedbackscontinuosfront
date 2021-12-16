import { Link } from 'react-router-dom'
import { useContext, useEffect } from 'react/cjs/react.development'
import { date } from 'yup'
import { CardSendFeedback } from '../../components/CardSendFeedback/CardSendFeedback'
import { Loading } from '../../components/Loading/Loading'
import { EmployeeContext } from '../../context/EmployeeContext'
import { api } from '../../services/api'
import styles from './sendfeedback.module.css'

export const SendFeedback = () => {

  const { loading, getEmployee, setLoading, getEmployeePhoto, img } = useContext(EmployeeContext)

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (token) {
      api.defaults.headers.Authorization = token
      Promise.all([getEmployee(), getEmployeePhoto()]).then(() => setLoading(false))
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
        <img id="profileImage" src={`data:image/jpg;base64,${img}`} alt='imagem que nem funciona'/>
        <CardSendFeedback styles={styles} />
      </section>
    </>
  )
}
