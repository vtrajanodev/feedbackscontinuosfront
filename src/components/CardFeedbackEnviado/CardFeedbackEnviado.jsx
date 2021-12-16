import defaultImage from '../../images/defaultImage.png'

export const CardFeedbackEnviado = ({ styles, navigate, feedbacksEnviados, logo }) => {
  
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
                    <img src={`${feedback.funcionarioOrigem.fotoFuncionario === '' ? defaultImage : base64Img + feedback.funcionarioOrigem.fotoFuncionario  }`} alt="Imagem perfil card" width={50} height={50}/>
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
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </section>
    </div>
  )
}
