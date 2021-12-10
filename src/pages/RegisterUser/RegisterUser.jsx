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
          nome: '',
          email: '',
          senha: '',
          urlImagem: '' 
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
                  <Field id="nome" name="nome" placeholder="Nome completo" />
                </div>

                <div>
                  <Field id="email" name="email" placeholder="Email" />
                </div>

                <div>
                  <Field id="senha" name="senha" placeholder="Senha" />
                </div>

                <div className={styles.fileLabel}>
                  <label htmlFor="urlImagem">Imagem de perfil</label>
                  <Field type="file" id="urlImagem" name="urlImagem" placeholder="email@exemplo.com" />
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


