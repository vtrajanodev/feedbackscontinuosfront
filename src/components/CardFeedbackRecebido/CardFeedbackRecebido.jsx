
export const CardFeedbackRecebido = ({ styles, feedbacksRecebidos, logo }) => {
  return (
    <>
      <section className={styles.cardsList}>
        <h1>Feedbacks recebidos</h1>
        {feedbacksRecebidos.map(feedback => (
          <div key={feedback.idFeedback}>
            <div className={styles.card}>
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
                  <button>Tornar invisivel</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
