import { Formik, Field, Form } from 'formik';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.png';
import styles from '../styles/loginAndRegister.module.css';

export const Login = () => {


  const { handleLogin } = useContext(AuthContext)
  return (
    <div className={styles.registerUserContainer}>
      <Formik
        initialValues={{
          email: '',
          senha: '',
        }}
        onSubmit={async (values) => {
          await handleLogin(values)
        }}
      >
        <Form>
          <div className={styles.content}>
            <div className={styles.signIn}>
              <div>
                <img src={Logo} alt="logo" />
              </div>
              <div className={styles.handleNavigateToRegister}>
                <h3>Sistema de Feedbacks</h3>
                <Link to="/cadastro-usuario">Não possuo cadastro</Link>
              </div>
            </div>
            <div className={styles.registerForm}>
              <h1>Acesse sua conta</h1>
              <div>
                <Field id="email" name="email" placeholder="Usuário: " />
              </div>

              <div>
                <Field id="senha" name="senha" placeholder="Senha: " />
              </div>
              <div>
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