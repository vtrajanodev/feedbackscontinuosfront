import { useContext } from "react"
import { FeedbackContext } from "../../context/FeedbackContext"
import defaultImage from '../../images/defaultImage.png'

export const CardFeedbackRecebido = ({ styles, feedbacksRecebidos, logo }) => {

  const { handleEditVisibleStatus } = useContext(FeedbackContext)
  const base64Img = 'data:image/*;base64,'

  return (
    <>
      <section className={styles.cardsList}>
        <h1>Feedbacks recebidos</h1>
        {!feedbacksRecebidos.length ?
          <h4>Poxa! Parece que você ainda não tem feedbacks recebidos.</h4>
          :
          feedbacksRecebidos.map(feedback => (
            <div key={feedback.idFeedback}>
              <div className={feedback.visivel ? styles.card : styles.cardInvisible}>
                <div>
                  <img src={`${feedback.funcionarioOrigem.fotoFuncionario === '' ? defaultImage : base64Img + feedback.funcionarioOrigem.fotoFuncionario }`} alt=":(" />
                </div>
                <div>
                  <div className={styles.cardTitle}>
                    <h3>{feedback.funcionarioOrigem.nome}</h3>
                    <span> {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'medium' }).format(
                      new Date(feedback.dataFeedback)
                    )}</span>
                  </div>
                  <div className={styles.cardContent}>
                    <p>{feedback.conteudo}</p>
                    <button onClick={() => handleEditVisibleStatus(feedback)}>{feedback.visivel ? 'Tornar invisível' : 'Tornar visivel'}</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </section>
    </>
  )
}
