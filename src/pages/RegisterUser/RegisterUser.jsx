import { Field, Form, Formik } from 'formik';
import styles from '../styles/loginAndRegister.module.css';

export const RegisterUser = () => {
  return (
    <div className={styles.registerUserContainer}>
      <Formik
        initialValues={{

        }}
        onSubmit={async (
          values,
          { setSubmitting }
        ) => {
          setSubmitting(false);
        }}
      >
        {props => (
          <Form>
            <div className={styles.content}>
              <div className={styles.signIn}>
                <div>
                  <Field id="name" name="name" placeholder="Nome completo" />
                </div>

                <div>
                  <Field id="email" name="email" placeholder="Email" />
                </div>

                <div>
                  <Field id="password" name="password" placeholder="Senha" />
                </div>

                <div>
                  <Field type="file" id="picture" name="picture" placeholder="email@exemplo.com" />
                </div>
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
                  <button>Cadastrar</button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}


