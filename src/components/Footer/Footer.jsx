import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "./footer.module.css";


export const Footer = () => {

  const { token } = useContext(AuthContext)

  return (
    <>
    {token && 
      <footer>
        <div className={styles.footercontainer}>
          <small>&copy; Copyright FeedBackStreetBoys {"&"} SpiceGirl</small>
        </div>
      </footer>
    }
    </>
  )
}