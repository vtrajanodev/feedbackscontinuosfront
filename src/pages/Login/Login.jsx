import { Formik, Field, Form } from 'formik';
// import { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
import styles from './login.module.css';

export const Login = () => {
  return (
    <div className={styles.content}>
    <h1>Login</h1>
    <Formik
      initialValues={{
        user: '',
        password: '',
      }}
      onSubmit={async (values) => {
        
      }}
    >
      <Form>
        <label htmlFor="user">Usuário: </label>
        <Field id="user" name="user" placeholder="Digite seu usuário" />

        <label htmlFor="password">Senha: </label>
        <Field id="password" name="password" placeholder="*******" />

        <button type="submit">Login</button>
      </Form>
    </Formik>
  </div>
  );
}