import { Field, Form, Formik } from 'formik';
import { useContext } from 'react';
import { EmployeeContext } from '../../context/EmployeeContext';
import styles from '../styles/loginAndRegister.module.css';

export const RegisterUser = () => {

  const { handleRegisterEmployee } = useContext(EmployeeContext)

  return (
    <div className={styles.registerUserContainer}>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          picture: '' 
        }}
        onSubmit={async (
          values,
          { setSubmitting }
        ) => {
          await handleRegisterEmployee(values)
          setSubmitting(false);
        }}
      >
        {props => (
          <Form>
            <div className={styles.content}>
              <div className={styles.signIn}>
                <h2>Mensagem</h2>
                <button>botão faça login</button>
              </div>

              <div className={styles.registerForm}>
                <h1>Faça seu cadastro</h1>
                <div>
                  <Field id="name" name="name" placeholder="Nome completo" />
                </div>

                <div>
                  <Field id="email" name="email" placeholder="Email" />
                </div>

                <div>
                  <Field id="password" name="password" placeholder="Senha" />
                </div>

                <div className={styles.fileLabel}>
                  <label htmlFor="picture">Imagem de perfil</label>
                  <Field type="file" id="picture" name="picture" placeholder="email@exemplo.com" />
                </div>
                <div className={styles.buttonSubmit}>
                  <button type="submit">Cadastrar</button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}


