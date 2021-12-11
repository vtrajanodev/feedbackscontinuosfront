import { useContext } from 'react'
import { Link } from 'react-router-dom'
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
            <Link to="/feedback">
              <li>Enviar feedback</li>
            </Link>
          </ul>
        </nav>
      </div>

      <CardFeedbackRecebido styles={styles} feedbacksRecebidos={feedbacksRecebidos} logo={logo}/>

      <section className={styles.cardsList}>
        <h1>Feedbacks enviados</h1>
        {feedbacksEnviados.map(feedback => (
          <div key={feedback.idFeedback}>
            <div className={styles.card}>
              <div>
                <img src={logo} alt="Imagem perfil card" />
              </div>
              <div>
                <div className={styles.cardTitle}>
                  <h3>{feedback.funcionarioOrigem.nome}</h3>
                  <span>{feedback.dataFeedback}</span>
                </div>
                <div className={styles.cardContent}>
                  <p>{feedback.conteudo}</p>
                  <button>Tornar invisivel</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}
