import { useContext } from "react"
import { FeedbackContext } from "../../context/FeedbackContext"
import defaultImage from '../../images/defaultImage.png'

export const CardFeedbackRecebido = ({ styles, feedbacksRecebidos }) => {

  const { handleEditVisibleStatus } = useContext(FeedbackContext)
  const base64Img = 'data:image/*;base64,'

  return (
    <>
      <section className={styles.cardsList}>
        <h2>Feedbacks recebidos</h2>
        <div className={styles.containerCard}>
          {!feedbacksRecebidos.length ?
            <h4>Você ainda não recebeu nenhum feedback</h4>
            :
            feedbacksRecebidos.map(feedback => (
              <div className={styles.bgCard} key={feedback.idFeedback}>
                <div className={feedback.visivel ? styles.card : styles.cardInvisible}>
                  <div className={styles.cardTitle}>
                    <img src={`${(feedback.funcionarioOrigem.fotoFuncionario === '') || (feedback.anonimo === true) ? defaultImage : base64Img + feedback.funcionarioOrigem.fotoFuncionario}`} alt=":(" />
                    <h3>{!feedback.anonimo === true ? feedback.funcionarioOrigem.nome : 'Anônimo'}</h3>
                  </div>
                  <div className={styles.cardContent}>
                    <p>{feedback.conteudo}</p>
                  </div>
                  <div className={styles.tags}>
                    {feedback.tags.map(tag => (
                      <span key={tag.idTag}>{'#' + tag.nomeTag}</span>
                    ))}
                  </div>
                </div>
                <div className={styles.status}>
                  <button onClick={() => handleEditVisibleStatus(feedback)}>{feedback.visivel ? 'Tornar invisível' : 'Tornar visivel'}</button>
                </div>
                <div className={styles.dateStyle}>
                  <small> {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'medium' }).format(
                    new Date(feedback.dataFeedback)
                  )}
                  </small>
                </div>
              </div>
            ))
          }
        </div>
      </section>
    </>
  )
}