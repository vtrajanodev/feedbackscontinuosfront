import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CardFeedbackEnviado } from '../../components/CardFeedbackEnviado/CardFeedbackEnviado'
import { CardFeedbackRecebido } from '../../components/CardFeedbackRecebido/CardFeedbackRecebido'
import { AuthContext } from '../../context/AuthContext'
import { FeedbackContext } from '../../context/FeedbackContext'
import logo from '../../images/img.jpg'
import styles from './home.module.css'

export const Home = () => {

  const { employee } = useContext(AuthContext)
  const { feedbacksRecebidos, feedbacksEnviados } = useContext(FeedbackContext)


  return (
    <main>
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
      <CardFeedbackEnviado styles={styles} feedbacksEnviados={feedbacksEnviados} logo={logo}/>

    </main>
  )
}
