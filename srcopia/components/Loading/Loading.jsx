import logo from '../../images/Spinner.svg'
import styles from './loading.module.css'


export const Loading = () => {
  return (
    <>
      <div className={styles.loadingContainer}>
        <img src={logo} alt="loading..." />
      </div>
    </>
  )
}
