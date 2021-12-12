import { useContext } from 'react'
import { EmployeeContext } from '../../context/EmployeeContext'
import logo from '../../images/img.jpg'
import styles from './sendfeedback.module.css'


export const SendFeedback = () => {

  const { employeeList } = useContext(EmployeeContext)
  return (
    <section className={styles.sendFeedbackContainer}>
      <div className={styles.sendFeedbackHeader}>
        <p>Envie feedback sobre um colaborador</p>
      </div>

      <div className={styles.cardList}>
      <h1>Feedbacks recebidos</h1>
        {employeeList.map(employee => (
          <div key={employee.idFuncionario}>
            <div className={styles.card}>
              <div>
                <img src={logo} alt="Imagem perfil card" />
              </div>
              <div>
                <div className={styles.cardTitle}>
                  <h3>{employee.nome}</h3>
                  {/* <span>{employee.dataemployee}</span> */}
                </div>
                <div className={styles.cardContent}>
                  <p>{employee.conteudo}</p>
                  <button>Enviar um feedback</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
