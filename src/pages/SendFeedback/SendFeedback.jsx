import { Link } from 'react-router-dom'
import { CardSendFeedback } from '../../components/CardSendFeedback/CardSendFeedback'
import styles from './sendfeedback.module.css'

export const SendFeedback = () => {

  return (
    <section className={styles.sendFeedbackContainer}>
      <div className={styles.sendFeedbackHeader}>
        <p>Envie feedback sobre um colaborador</p>
        <Link to="/home">Home</Link>
      </div>
      <CardSendFeedback styles={styles} />
    </section>
  )
}
