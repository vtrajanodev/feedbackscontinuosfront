import { Formik, Field, Form } from 'formik';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import styles from '../styles/loginAndRegister.module.css';
import { BiUserCircle } from 'react-icons/bi';
import { RiLockPasswordLine } from 'react-icons/ri';

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
              <div className={styles.handleNavigateToRegister}>
                <h3>Sistema de Feedbacks</h3>
                <Link to="/cadastro-usuario">Não possuo cadastro</Link>
              </div>
            </div>
            <div className={styles.registerForm}>
              <h1>Acesse sua conta</h1>
              <div>
                <Field id="email" name="email" placeholder="Usuário: " />
                < BiUserCircle />
              </div>

              <div>
                <Field id="senha" name="senha" placeholder="Senha: " />
                < RiLockPasswordLine />
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