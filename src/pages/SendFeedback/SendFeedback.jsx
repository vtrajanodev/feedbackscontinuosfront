import { Link } from 'react-router-dom'
import { useContext } from 'react/cjs/react.development'
import { CardSendFeedback } from '../../components/CardSendFeedback/CardSendFeedback'
import { Loading } from '../../components/Loading/Loading'
import { EmployeeContext } from '../../context/EmployeeContext'
import styles from './sendfeedback.module.css'

export const SendFeedback = () => {

  const { loading } = useContext(EmployeeContext)

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
