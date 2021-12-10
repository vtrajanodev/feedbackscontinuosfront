import { Field, Form, Formik } from 'formik';
import { useContext } from 'react';
import { EmployeeContext } from '../../context/EmployeeContext';
import * as Yup from 'yup';
import Logo from '../../images/logo.png'
import styles from '../styles/loginAndRegister.module.css';
import { useNavigate } from 'react-router-dom';

export const RegisterUser = () => {

  const { handleRegisterEmployee } = useContext(EmployeeContext)
  const navigate = useNavigate()

  const validateSchema = Yup.object().shape({
    nome: Yup.string()
      .min(10, 'Nome muito curto!')
      .max(55, 'Campo com máximo de 55 caracteres')
      .required('Nome é um campo obrigatório'),
    email: Yup.string()
      .min(10, 'Email muito curto')
      .max(70, 'Email muito longo')
      .matches(/@dbccompany\.com.br$/, 'Dominio @dbccompany.com.br obrigatório')
      .required('Email é um campo obrigatório'),
    senha: Yup.string()
      .min(8, 'A senha deve conter pelo menos 8 caracteres')
      .required('Senha é um campo obrigatório'),
    senhaConfirm: Yup.string()
      .oneOf([Yup.ref('senha'), null], 'As senhas devem ser iguais'),
  });

  return (
    <div className={styles.registerUserContainer}>
      <Formik
        initialValues={{
          nome: '',
          email: '',
          senha: '',
          urlImagem: '',
          senhaConfirm: ''
        }}
        validationSchema={validateSchema}
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
                <div>
                  <img src={Logo} alt="logo" />
                </div>

                <div>
                  <h3>Sistema de Feedback Continuo da DBC Company</h3>
                  <p>Ja possui cadastro?</p>
                  <button onClick={() => navigate('/login')}>Clique aqui e faça login</button>
                </div>
              </div>

              <div className={styles.registerForm}>
                <h1>Faça seu cadastro</h1>
                <div>
                  <Field id="nome" name="nome" placeholder="Nome completo" maxLength='56' />
                  {(props.errors.nome && props.touched.nome) && (
                    <span>{props.errors.nome}</span>
                  )}
                </div>

                <div>
                  <Field id="email" name="email" placeholder="Email" />
                  {(props.errors.email && props.touched.email) && (
                    <span>{props.errors.email}</span>
                  )}
                </div>
                <div>
                  <Field id="senha" name="senha" placeholder="Senha" />
                  {(props.errors.senha && props.touched.senha) && (
                    <span>{props.errors.senha}</span>
                  )}
                </div>
                <div>
                  <Field id="senhaConfirm" name="senhaConfirm" placeholder="Confirmação de senha" />
                  {props.errors.senhaConfirm && (
                    <span>{props.errors.senhaConfirm}</span>
                  )}
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


