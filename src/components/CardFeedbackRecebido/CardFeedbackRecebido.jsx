import { useContext } from "react"
import { useEffect, useState } from "react/cjs/react.development"
import { FeedbackContext } from "../../context/FeedbackContext"
import { Loading } from "../Loading/Loading"

export const CardFeedbackRecebido = ({ styles, feedbacksRecebidos, logo }) => {

  const { handleEditVisibleStatus, loading } = useContext(FeedbackContext)

  return (
    <>
    {loading && <Loading />}
      <section className={styles.cardsList}>
        <h1>Feedbacks recebidos</h1>
        {feedbacksRecebidos.map(feedback => (
          <div key={feedback.idFeedback}>
            <div className={feedback.visivel ? styles.card : styles.cardInvisible}>
              <div>
                <img src={logo} alt="Imagem perfil card" />
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
        ))}
      </section>
    </>
  )
}
