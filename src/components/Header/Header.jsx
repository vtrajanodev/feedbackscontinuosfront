import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import imgPerfil from '../../images/img.jpg';
import styles from './header.module.css';
import { HiOutlineLogout } from 'react-icons/hi';
import FeedbacksLogo from '../../images/feedbackslogo.png';

export const Header = () => {

  const { employee } = useContext(AuthContext)
  const { token, handleLogout } = useContext(AuthContext)

  return (
    <>
      {token &&
        <header>
          <Link to="/home">
            <img src={FeedbacksLogo} alt="Feedbacks_Logo" width="150px"/>
          </Link>
          <div className={styles.user}>
              <Link to="/home">
                <img width="30px" src={imgPerfil} alt="Imagem de perfil" />
              </Link>
              <span>
                {employee.nome}
              </span>
              <Link to="/login" onClick={handleLogout}>
                <HiOutlineLogout/>
              </Link>
          </div>
        </header>
      }
    </>
  )
}