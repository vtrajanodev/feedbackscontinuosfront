
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import logo from '../../images/Spinner.svg'
import styles from './loading.module.css'


export const Loading = () => {

  const { loading } = useContext(AuthContext)

  return (
    <>
      {loading && (
        <div className={styles.loadingContainer}>
          <img src={logo} alt="loading..." />
        </div>
      )}
    </>
  )
}
