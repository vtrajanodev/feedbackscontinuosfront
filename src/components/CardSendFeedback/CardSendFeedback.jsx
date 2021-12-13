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
                  overlayClassName={styles.reactModalOverlay}
                  className={styles.reactModalContent}
                >
                  <h4>Envie o seu feedback para nomeDoUsuario</h4>

                  <form>
                    <div className={styles.feedbackInfo}>
                      <p>
                        Envie elogios ou criticas construtivas que possam auxiliar na evolução do desempenho de seus colegas.
                      </p>
                    </div>
                    <div className={styles.feedbackContent}>
                      <p>Selecione o tipo do seu feedback</p>

                      <div className={styles.feedbackType}>
                        <span>Icone</span>
                        <span>Icone</span>
                      </div>

                      <div>
                        <label htmlFor="feedbackTags">Selecione uma tag: </label> <br />
                        <select name="feedbackTags" id="feedbackTags">
                          <option value="tag1">Tag1</option>
                          <option value="tag2">Tag2</option>
                          <option value="tag3">Tag3</option>
                          <option value="tag4">Tag4</option>
                        </select>
                      </div>

                      <div>
                        <textarea name="feedbackTextArea" id="feedbackTextArea"></textarea>
                      </div>
                      <button type="submit">Enviar</button>
                    </div>

                  </form>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
