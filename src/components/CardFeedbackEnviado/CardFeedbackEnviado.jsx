import defaultImage from '../../images/defaultImage.png'

export const CardFeedbackEnviado = ({ styles, navigate, feedbacksEnviados }) => {

  const base64Img = 'data:image/*;base64,'

  return (
    <div>
      <section className={styles.cardsList}>
        <h2>Feedbacks enviados</h2>
        <div className={styles.containerCard}>
        {
          !feedbacksEnviados.length ?
            <div className={styles.withoutFeedbackEnviado}>
              <button onClick={() => navigate('/enviar-feedback')}>Envie seu primeiro feedback</button>
            </div>
            :
            feedbacksEnviados.map(feedback => (
              <div className={styles.bgCard} key={feedback.idFeedback}>
                <div className={styles.card}>
                  <div>
                    <div className={styles.cardTitle}>
                    <img src={`${feedback.funcionarioDestino.fotoFuncionario === '' ? defaultImage : base64Img + feedback.funcionarioDestino.fotoFuncionario}`} alt=":(" />
                    <h3>{feedback.funcionarioDestino.nome}</h3>
                    </div>
                    <div className={styles.cardContent}>
                      <p>{feedback.conteudo}</p>
                    </div>
                    <div className={styles.tags}>{feedback.tags.map(tag => (
                      <span key={tag.idTag}>{'#' + tag.nomeTag}</span>
                    ))}</div>
                  </div>
                </div>
                <div className={styles.dateStyle}> 
                  <small> {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'medium' }).format(
                      new Date(feedback.dataFeedback)
                    )}</small> 
                </div>
              </div>
            ))}
          </div>
      </section>
    </div>
  )
}
