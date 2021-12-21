import { useContext } from "react"
import { useState } from "react"
import { EmployeeContext } from "../../context/EmployeeContext"
import Modal from 'react-modal'
import defaultImage from '../../images/defaultImage.png'
import { Field, Form, Formik } from "formik"
import { FeedbackContext } from "../../context/FeedbackContext"
import { Link } from 'react-router-dom';
import * as Yup from 'yup';


Modal.setAppElement('#root')
export const CardSendFeedback = ({ styles }) => {

  const [targetEmployee, setTargetEmployee] = useState()
  const { employeeList, getEmployee } = useContext(EmployeeContext)
  const { tagsList, postFeedback } = useContext(FeedbackContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTag, setSelectedTag] = useState([])
  const base64Img = 'data:image/*;base64,'


  const handleOpenNewSendFeedbackModal = (employee) => {
    setTargetEmployee(employee)
    setIsModalOpen(true)
  }

  const handleCloseNewSendFeedbackModal = () => {
    setIsModalOpen(false)
    setSelectedTag([])
  }

  const validateSchema = Yup.object().shape({
    conteudo: Yup.string()
      .min(10, 'Você precisa enviar um feedback com pelo menos 10 caracteres')
      .max(400, 'Campo com máximo de 400 caracteres')
      .required('Conteúdo obrigatório')
  });

  const deleteTag = (idTag) => {
    const tagRemovida = selectedTag.filter(tags => tags.idTag !== idTag)
    setSelectedTag(tagRemovida)
  }

  return (
    <div className={styles.cardList}>
      <h2>Enviar feedback</h2>
      {employeeList.map(employee => (
        <div key={employee.idFuncionario}>
          <div className={styles.card}>
            <div>
              <img id="profileImage" src={`${employee.fotoFuncionario === '' ? defaultImage : base64Img + employee.fotoFuncionario}`} alt=':(' width="50px" heigth="50px" />
            </div>
            <div className={styles.cardContent}>
              <div>
                <Link to={`/profile/${employee.idFuncionario}`} onClick={() => getEmployee(employee.idFuncionario)}>
                  <h3>{employee.nome}</h3>
                </Link>
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
        {targetEmployee &&
          <h4>Envie o seu feedback para {targetEmployee.nome}</h4>
        }

        <Formik
          initialValues={{
            anonimo: false,
            conteudo: '',
            listaTags: [],
          }}
          validationSchema={validateSchema}
          onSubmit={async (
            values,
            { setSubmitting }
          ) => {
            await postFeedback({ ...values, idFuncionarioDestino: targetEmployee.idFuncionario, listaTags: selectedTag })
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
                  <Field as="select" name="idTag" id="feedbackTags" onChange={(e) => {

                    !selectedTag.includes(JSON.stringify(e.target.value)) ? setSelectedTag([...selectedTag, JSON.parse(e.target.value)]) : setSelectedTag(JSON.parse(selectedTag))
                  }}>
                    <option defaultValue={selectedTag} selected >Selecione uma ou mais tags</option>

                    {tagsList.map(tag => (
                      <option value={JSON.stringify(tag)} name={tag.idTag} key={tag.idTag}>{tag.nomeTag}</option>
                    ))}
                  </Field>

                  {selectedTag.map((tag, index) => (
                    selectedTag.includes(tag) &&
                    <span onClick={() => deleteTag(tag.idTag)} className={styles.tagX} key={index}>{'#' + tag.nomeTag}</span>
                  ))}
                </div>

                <div>
                  <Field as="textarea" name="conteudo" id="conteudo" maxLength={400}></Field>
                  {(props.errors.conteudo && props.touched.conteudo) && (
                    <small className={styles.erroSpan}>{props.errors.conteudo}</small>
                  )}
                  <p>{props.values.conteudo.length}/400</p>
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
