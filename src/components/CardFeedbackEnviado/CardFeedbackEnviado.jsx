import defaultImage from '../../images/defaultImage.png'

export const CardFeedbackEnviado = ({ styles, navigate, feedbacksEnviados }) => {

  const base64Img = 'data:image/*;base64,'

  return (
    <div>
      <section className={styles.cardsList}>
        <h1>Feedbacks enviados</h1>
        {
          !feedbacksEnviados.length ?
            <div className={styles.withoutFeedbackEnviado}>
              <button onClick={() => navigate('/enviar-feedback')}>Envie seu primeiro feedback</button>
            </div>
            :
            feedbacksEnviados.map(feedback => (
              <div key={feedback.idFeedback}>
                <div className={styles.card}>
                  <div>
                    <img src={`${(feedback.funcionarioOrigem.fotoFuncionario === '') || (feedback.anonimo === true) ? defaultImage : base64Img + feedback.funcionarioOrigem.fotoFuncionario}`} alt=":(" />
                  </div>
                  <div>
                    <div className={styles.cardTitle}>
                      <h3>{!feedback.anonimo === true ? feedback.funcionarioOrigem.nome : 'Anônimo'}</h3>
                      <span> {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'medium' }).format(
                        new Date(feedback.dataFeedback)
                      )}</span>
                    </div>
                    <div className={styles.cardContent}>
                      <p>{feedback.conteudo}</p>
                    </div>
                    <div className={styles.tags}>{feedback.tags.map(tag => (
                      <span key={tag.idTag}>{tag.nomeTag}</span>
                    ))}</div>
                  </div>

                </div>
              </div>
            ))}
      </section>
    </div>
  )
}
