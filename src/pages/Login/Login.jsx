import { Formik, Field, Form } from 'formik';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
// import { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
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
            <h1>Login</h1>
          </div>
        <div className={styles.registerForm}>
          <h1>Login</h1>
          <div>
            <Field id="email" name="email" placeholder="Usuário: " />
          </div>

          <div>
            <Field id="senha" name="senha" placeholder="Senha: " />
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