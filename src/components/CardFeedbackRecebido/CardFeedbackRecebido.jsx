
export const CardFeedbackRecebido = ({ styles, feedbacksRecebidos, logo }) => {
  return (
    <>
      <h1>Feedbacks recebidos</h1>
      <section className={styles.cardsList}>
        {feedbacksRecebidos.map(feedback => (
          <div key={feedback.idFeedback}>
            <div className={styles.card}>
              <div>
                <img src={logo} alt="Imagem perfil card" />
              </div>
              <div className={styles.cardContent}>
                <h3>{feedback.funcionarioOrigem.nome}</h3>
                <p>{feedback.conteudo}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
