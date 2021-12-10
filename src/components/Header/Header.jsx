import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import imgPerfil from '../../images/img.jpg'
import styles from './header.module.css'

export const Header = () => {

  const { isAuthenticated, handleLogout } = useContext(AuthContext)

  return (
    <>
      {isAuthenticated &&
        <header>

          <Link to="/home">
            <img src={imgPerfil} alt="Imagem de perfil" />
          </Link>
          <span>
            Nome do usuario
          </span>
          <Link to="/login" onClick={handleLogout}>
            Logout
          </Link>
        </header>
      }
    </>
  )
}
