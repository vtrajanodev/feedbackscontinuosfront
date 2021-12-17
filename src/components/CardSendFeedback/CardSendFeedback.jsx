import { useContext } from "react"
import { useState } from "react"
import { EmployeeContext } from "../../context/EmployeeContext"
import Modal from 'react-modal'
import defaultImage from '../../images/defaultImage.png'
import { Field, Form, Formik } from "formik"
import { FeedbackContext } from "../../context/FeedbackContext"

Modal.setAppElement('#root')
export const CardSendFeedback = ({ styles }) => {

  const [targetEmployee, setTargetEmployee] = useState()
  const { employeeList } = useContext(EmployeeContext)
  const { tagsList, postFeedback } = useContext(FeedbackContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const base64Img = 'data:image/*;base64,'

  const handleOpenNewSendFeedbackModal = (employee) => {
    setTargetEmployee(employee)
    setIsModalOpen(true)
    console.log(employee)
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
              <img id="profileImage" src={`${employee.fotoFuncionario === '' ? defaultImage : base64Img + employee.fotoFuncionario}`} alt=':(' width="50px" heigth="50px" />
            </div>
            <div className={styles.cardContent}>
              <div>
                <h3>{employee.nome}</h3>
                <p>{employee.email}</p>
              </div>
              <div>
                <button onClick={() => handleOpenNewSendFeedbackModal(employee)} >Enviar um feedback</button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseNewSendFeedbackModal}
        overlayClassName={styles.reactModalOverlay}
        className={styles.reactModalContent}
      >
        <h4>Envie o seu feedback para nomeDoUsuario</h4>

        <Formik
          initialValues={{
            anonimo: false,
            conteudo: '',
            listaTags: [
              {
                idTag: 1
              }
            ],
            anonimo: false
          }}
          // validationSchema={validateSchema}
          onSubmit={async (
            values,
            { setSubmitting }
          ) => {
            await postFeedback({ ...values, idFuncionarioDestino: targetEmployee.idFuncionario })
            handleCloseNewSendFeedbackModal()
            setSubmitting(false);
          }}
        >
          {props => (
            <Form>
              <div className={styles.feedbackInfo}>
                <p>
                  Envie elogios ou criticas construtivas que possam auxiliar na evolução do desempenho de seus colegas.
                </p>
              </div>
              <div className={styles.feedbackContent}>

                <div>
                  <label htmlFor="feedbackTags">Selecione uma tag: </label> <br />
                  <Field as="select" name="feedbackTags" id="feedbackTags">
                    {tagsList.map(tag => (
                      <option name={tag.idTag} key={tag.idTag}>{tag.nomeTag}</option>
                    ))}
                  </Field>
                </div>

                <div>
                  <Field as="textarea" name="conteudo" id="conteudo"></Field>
                </div>
                <div className={styles.sendFeedbackButton}>
                  <button type="submit">Enviar</button>
                  <label htmlFor="anonimo">
                    <Field type="checkbox" name="anonimo" id="anonimo" />
                    Enviar como anônimo ?
                    {props.values.anonimo}
                  </label>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  )
}
