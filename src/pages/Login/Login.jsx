import { Formik, Field, Form } from 'formik';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.png';
// import { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
import styles from '../styles/loginAndRegister.module.css';

export const Login = () => {
  return (
    <div className={styles.registerUserContainer}>
    <Formik
      initialValues={{
        user: '',
        password: '',
      }}
      onSubmit={async (values) => {
        
      }}
    >
      <Form>
      <div className={styles.content}>
          <div className={styles.signIn}>
            <img src={Logo} alt="logo" />
          </div>

        <div className={styles.registerForm}>
          <h1>Login</h1>
          <div>
            <Field id="user" name="user" placeholder="Usuário: " />
          </div>

          <div>
            <Field id="password" name="password" placeholder="Senha: " />
          </div>
          
          <div>
            <Link to="/cadastro-usuario">Não possuo cadastro</Link>
          </div>

          <div className={styles.buttonSubmit}>
            <button type="submit">Login</button>
          </div>
        </div>
      </div>
      </Form>
    </Formik>
  </div>
  );
}