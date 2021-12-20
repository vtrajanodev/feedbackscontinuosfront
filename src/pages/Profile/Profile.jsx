import { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Loading } from '../../components/Loading/Loading'
import { AuthContext } from '../../context/AuthContext'
import { EmployeeContext } from '../../context/EmployeeContext'
import { api } from '../../services/api'
import styles from './profile.module.css'
import defaultImg from '../../images/defaultImage.png'
import { FaHome } from 'react-icons/fa'
import { BiLike } from 'react-icons/bi'

export const Profile = () => {

  const base64Img = 'data:image/*;base64,'
  const { employeeProfile, getEmployee, setLoading, loading } = useContext(EmployeeContext)
  const { getEmployeeInfos, token } = useContext(AuthContext)
  const { id } = useParams()
  console.log(employeeProfile)

  useEffect(() => {
    if (token) {
      api.defaults.headers.Authorization = token
      Promise.all([
        getEmployeeInfos(),
        getEmployee(id)
      ])
        .then(() => setLoading(false))
    }
  }, [])

  return (
    <>
      {loading &&
        <Loading />
      }
      <section className={styles.profileContainer} >
        {employeeProfile.map(employee => (
          <div className={styles.profileEmployeeContent}>
            <div>
              <img src={employee.fotoFuncionario ? base64Img + employee.fotoFuncionario : defaultImg} alt="imagem de perfil" />
            </div>
            <div className={styles.titles}>
              <div>
                <h2>{employee.nome}</h2>
                <p>{employee.email}</p>
              </div>
            </div>
          </div>
        ))}

        <div className={styles.profileFeedbacks}>
          <section className={styles.cardsList}>
            <h2>Feedbacks recebidos</h2>
            <div className={styles.containerCard}>
              {(!employeeProfile.length) ?
                <h4>Poxa! Parece que você ainda não tem feedbacks recebidos.</h4>
                :
                employeeProfile.map(feedback => (
                  <div className={styles.bgCard} key={feedback.idFeedback}>
                    <div>
                      <div className={styles.cardTitle}>
                        {feedback.recebidos.map(recebidos => (
                          <div key={recebidos.idFeedback}>
                            <img src={`${(recebidos.funcionarioOrigem.fotoFuncionario === '') || (feedback.anonimo === true) ? defaultImg : base64Img + recebidos.funcionarioOrigem.fotoFuncionario}`} alt=":(" />
                            <h3>{!recebidos.anonimo === true ? recebidos.funcionarioOrigem.nome : 'Anônimo'}</h3>
                            <div className={styles.cardContent}>
                              <p>{feedback.conteudo}</p>
                            </div>
                            <div className={styles.tags}>
                              {recebidos.tags.map(tag => (
                                <span key={tag.idTag}>{'#' + tag.nomeTag}</span>
                              ))}
                            </div>
                            <div className={styles.dateStyle}>
                              <span> {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'medium' }).format(
                                new Date(recebidos.dataFeedback)
                              )}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </section>
        </div>
      </section >
    </>
  )
}
