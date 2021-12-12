
export const CardFeedbackEnviado = ({ styles, feedbacksEnviados, logo }) => {
  return (
    <div>
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
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
