import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { EmployeeContext } from '../../context/EmployeeContext'
import logo from '../../images/img.jpg'
import { api } from '../../services/api'
import styles from './home.module.css'

export const Home = () => {

  const { employee, getEmployeeInfos } = useContext(EmployeeContext)
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.defaults.headers.common['Authorization'] = token
    }
    getEmployeeInfos()
  }, [])

  return (
    <main>
      <div className={styles.mainHeader}>
        <div>
          Ola {employee.nome} Bem vindo!
        </div>
        <nav>
          <ul>
            <Link to="/home">
              <li>Página principal</li>
            </Link>
            <Link to="/feedback">
              <li>Enviar feedback</li>
            </Link>
          </ul>
        </nav>
      </div>

      <section className={styles.cardsList}>
        <h1>Feedbacks recebidos</h1>
        <div className={styles.card}>
          <div>
            <img src={logo} alt="Imagem perfil card" />
          </div>
          <div className={styles.cardContent}>
            <h3>{employee.nome}</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem delectus facere, sed porro ratione sint at iusto sequi minima autem.</p>
          </div>
        </div>

        <div className={styles.card}>
          <div>
            <img src={logo} alt="Imagem perfil card" />
          </div>
          <div className={styles.cardContent}>
            <div>
              <h3>{employee.nome}</h3>
            </div>
            <div>
            </div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem delectus facere, sed porro ratione sint at iusto sequi minima autem.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
