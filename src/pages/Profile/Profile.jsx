import { useContext } from 'react'
import { useEffect } from 'react/cjs/react.development'
import { AuthContext } from '../../context/AuthContext'
import { EmployeeContext } from '../../context/EmployeeContext'
import { api } from '../../services/api'
import styles from './profile.module.css'

export const Profile = () => {

  const base64Img = 'data:image/*;base64,'
  const { employeeProfile } = useContext(EmployeeContext)
  const { getEmployeeInfos, token } = useContext(AuthContext)
  console.log(employeeProfile)

  useEffect(() => {
    if (token) {
      api.defaults.headers.Authorization = token
      getEmployeeInfos()
    }
  }, [])

  return (
    <section className={styles.profileContainer}>
      <div className={styles.profileEmployeeContent}>
        <div>
          <img src={base64Img + employeeProfile.fotoFuncionario} alt="imagem de perfil" />
        </div>
        <div>
          <h2>{employeeProfile.nome}</h2>
          <p>{employeeProfile.email}</p>
        </div>
      </div>

      <div className={styles.profileFeedbacks}>
        <h2>Feedbacks recebidos</h2>
      </div>
    </section>
  )
}
