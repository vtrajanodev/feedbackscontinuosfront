import { useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Loading } from '../../components/Loading/Loading'
import { AuthContext } from '../../context/AuthContext'
import { EmployeeContext } from '../../context/EmployeeContext'
import { api } from '../../services/api'
import defaultImg from '../../images/defaultImage.png'
import { FaHome } from 'react-icons/fa'
import { BiLike } from 'react-icons/bi'
import styles from './profile.module.css'

export const Profile = () => {

  const base64Img = 'data:image/*;base64,'
  const navigate = useNavigate()
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
    } else {
      navigate('/login')
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
              <div className={styles.sendFeedback}>
                <div>
                  <h2>{employee.nome}</h2>
                  <p>{employee.email}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section >

      <section className={styles.cardsContainer}>
        <div className={styles.profileTitles}>
          <p>Feedbacks recebidos</p>
          <div>
            <nav>
              <ul>
                <Link to="/home" >
                  <span>
                    <FaHome />
                  </span>
                  <li>Home</li>
                </Link>

                <Link to="/enviar-feedback">
                  <span>
                    <BiLike />
                  </span>
                  <li>Enviar</li>
                </Link>
              </ul>
            </nav>
          </div>
        </div>

        <div>
          {
            employeeProfile.map(feedback => (
              <div key={feedback.idFeedback}>
                <div className={styles.cardsList}>
                  {
                    !feedback.recebidos.length ?
                      <h4>Este funcionário ainda não recebeu nenhum feedback.</h4>
                      :
                      feedback.recebidos.map(recebidos => (
                        <div key={recebidos.idFeedback} className={styles.card}>
                          <div className={styles.cardTitle}>
                            <img src={`${(recebidos.funcionarioOrigem.fotoFuncionario === '') || (recebidos.anonimo === true) ? defaultImg : base64Img + recebidos.funcionarioOrigem.fotoFuncionario}`} alt=":(" />
                            <h3>{!recebidos.anonimo === true ? recebidos.funcionarioOrigem.nome : 'Anônimo'}</h3>
                          </div>

                          <div className={styles.cardContent}>
                            <p>{recebidos.conteudo}</p>
                          </div>
                          <div className={styles.tags}>
                            {recebidos.tags.map(tag => (
                              <span key={tag.idTag}>{'#' + tag.nomeTag}</span>
                            ))}
                          </div>
                          <div className={styles.dateStyle}>
                            <small> {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'medium' }).format(
                              new Date(recebidos.dataFeedback)
                            )}</small>
                          </div>
                        </div>
                      ))}
                </div>

              </div>
            ))
          }
        </div>
      </section>

    </>
  )
}