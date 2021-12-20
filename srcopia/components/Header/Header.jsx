import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import imgPerfil from '../../images/defaultImage.png';
import styles from './header.module.css';
import { HiOutlineLogout } from 'react-icons/hi';
import FeedbacksLogo from '../../images/feedbackslogo.png';

export const Header = () => {

  const base64Img = 'data:image/*;base64,'
  const { employee } = useContext(AuthContext)
  const { token, handleLogout } = useContext(AuthContext)

  return (
    <>
      {token &&
        <header>
          <div className='container'>
            <div className={styles.contentFlex}>
              <Link to="/home">
                <img src={FeedbacksLogo} alt="Feedbacks_Logo" width="150px"/>            
              </Link>
              <span>
              </span>
              <div className={styles.user}>
              <Link to="/home">
                <img src={ employee.fotoFuncionario ? base64Img + employee.fotoFuncionario : imgPerfil} alt="Imagem de perfil" />
              </Link>
              <span>
                {employee.nome}
              </span>
                  <Link to="/login" onClick={handleLogout}>
                    <HiOutlineLogout/>
                    <p>Sair</p>
                  </Link>
              </div>
            </div>
          </div>
        </header>
      }
    </>
  )
}