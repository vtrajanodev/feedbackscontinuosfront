import { Link } from 'react-router-dom'
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
    </main>
  )
}
