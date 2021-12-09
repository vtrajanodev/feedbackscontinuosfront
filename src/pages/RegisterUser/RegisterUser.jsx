import { Field, Form, Formik } from 'formik';
import styles from './registerUser.module.css'

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
            <div>
              <div>
                <label htmlFor="name">Nome Completo: </label>
                <Field id="name" name="name" placeholder="John Doe" />
              </div>

              <div>
                <label htmlFor="email">Email: </label>
                <Field id="email" name="email" placeholder="exemplo@dbccompany.com.br" />
              </div>

              <div>
                <label htmlFor="password">Senha: </label>
                <Field id="password" name="password" placeholder="*******" />
              </div>

              <div>
                <label htmlFor="picture">Foto de perfil </label>
                {/* <Field as="file" id="picture" name="picture" placeholder="email@exemplo.com" /> */}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}


