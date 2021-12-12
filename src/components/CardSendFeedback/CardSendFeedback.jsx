import { useContext } from "react"
import { useState } from "react"
import { EmployeeContext } from "../../context/EmployeeContext"
import Modal from 'react-modal'
import logo from '../../images/img.jpg'

Modal.setAppElement('#root')

export const CardSendFeedback = ({ styles }) => {

  const { employeeList } = useContext(EmployeeContext)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenNewSendFeedbackModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseNewSendFeedbackModal = () => {
    setIsModalOpen(false)

  }

  return (
    <div className={styles.cardList}>
      <h1>Enviar feedback</h1>
      {employeeList.map(employee => (
        <div key={employee.idFuncionario}>
          <div className={styles.card}>
            <div>
              <img src={logo} alt="Imagem perfil card" />
            </div>
            <div className={styles.cardContent}>
              <div>
                <h3>{employee.nome}</h3>
                <p>{employee.email}</p>
              </div>
              <div>
                <button onClick={handleOpenNewSendFeedbackModal} >Enviar um feedback</button>
                <Modal
                  isOpen={isModalOpen}
                  onRequestClose={handleCloseNewSendFeedbackModal}
                >
                  <h2>Oi sou um modal</h2>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
