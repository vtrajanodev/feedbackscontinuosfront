import imgPerfil from '../../images/img.jpg'
import styles from './header.module.css'

export const Header = () => {

  return (
    <header>
      <div>
        <img src={imgPerfil} alt="Imagem de perfil" />
      </div>
      <div>
        Nome do usuario
      </div>
    </header>
  )
}
