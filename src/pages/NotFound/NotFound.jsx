import { useNavigate } from 'react-router'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import logo from '../../images/404.png'
import styles from  './notfound.module.css'

export const NotFound = () => {
  
  const navigate = useNavigate()

  const { isAuthenticated } = useContext(AuthContext)


  const handleBackToPage = () => {
    if (isAuthenticated) {
      navigate('/home')
    }else{
      navigate('/login')
    }
  }

  return (
    <div className={styles.notFound}>
      <img src={logo} alt="not found" />
      <h1>Página não encontrada :(</h1>
      <div className={styles.row}>
        <p>Verifique o endereço digitado</p>
        <button onClick={handleBackToPage}>Voltar para o site</button>
      </div>
    </div>
  )
}
