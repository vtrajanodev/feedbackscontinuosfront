import { Link } from 'react-router-dom'
import logo from '../../images/img.jpg'
import styles from './home.module.css'

export const Home = () => {
  return (
    <main>
      <div className={styles.mainHeader}>
        <div>
          Ola, usuário. Bem vindo!
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
            <h3>Nome do usuário</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem delectus facere, sed porro ratione sint at iusto sequi minima autem.</p>
          </div>
        </div>

        <div className={styles.card}>
          <div>
            <img src={logo} alt="Imagem perfil card" />
          </div>
          <div className={styles.cardContent}>
            <div>
              <h3>Nome do usuário</h3>
            </div>
            <div>
              <button></button>
            </div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem delectus facere, sed porro ratione sint at iusto sequi minima autem.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
