import { Field, Form, Formik } from 'formik';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useContext } from 'react';
import { EmployeeContext } from '../../context/EmployeeContext';
// import * as Yup from 'yup';
import Logo from '../../images/logo.png'
import styles from '../styles/loginAndRegister.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useState } from 'react/cjs/react.development';
import { GoCloudUpload } from 'react-icons/go';

export const RegisterUser = () => {

  const [fileUpload, setFileUpload] = useState()
  const { handleRegisterEmployee, handlePostEmployeeImage } = useContext(EmployeeContext)
  const { handleLogin } = useContext(AuthContext)
  const navigate = useNavigate()


  // const validateSchema = Yup.object().shape({
  //   nome: Yup.string()
  //     .min(10, 'Nome muito curto!')
  //     .max(55, 'Campo com máximo de 55 caracteres')
  //     .required('Nome é um campo obrigatório'),
  //   email: Yup.string()
  //     .min(10, 'Email muito curto')
  //     .max(70, 'Email muito longo')
  //     .matches(/@dbccompany\.com.br$/, 'Dominio @dbccompany.com.br obrigatório')
  //     .required('Email é um campo obrigatório'),
  //   senha: Yup.string()
  //     .min(8, 'A senha deve conter pelo menos 8 caracteres')
  //     .required('Senha é um campo obrigatório'),
  //   senhaConfirm: Yup.string()
  //     .oneOf([Yup.ref('senha'), null], 'As senhas devem ser iguais'),
  // });


  const onChangeUpload = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.readAsDataURL(file);
    
    reader.onload = () => {
      setFileUpload(file)
    }
  }

  return (
    <div className={styles.registerUserContainer}>
      <Formik
        initialValues={{
          nome: '',
          email: '',
          senha: '',
          foto: '',
          senhaConfirm: ''
        }}
        // validationSchema={validateSchema}
        onSubmit={async (
          values,
          { setSubmitting }
        ) => {
          const login = {
            email: values.email,
            senha: values.senha
          }
          await handleRegisterEmployee(values)
          await handleLogin(login)
          await handlePostEmployeeImage(fileUpload)
          setSubmitting(false);
        }}
      >
        {props => (
          <Form>
            <div className={styles.content}>
              <div className={styles.signIn}>

                <div className={styles.handleNavigateToLogin}>
                  <h3>Sistema de Feedbacks</h3>
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
                  <PasswordStrengthBar password={props.values.senha} className={styles.bar} shortScoreWord={'Muito curta'} scoreWords={['fraca', 'moderada', 'forte', 'ideal']} minLength={3} maxLength={16} scoreWordClassName='classe'/>
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
                  <label htmlFor="file">Foto de perfil</label>
                  <Field type="file" id="file" name="foto" accept="image/*" onChange={(event) => onChangeUpload(event)} />
                  <span>< GoCloudUpload /></span>
                </div>
                <div className={styles.buttonSubmit}>
                  <button type="submit">Cadastrar</button>
                </div>
                 <small>
                 <Link to="/login">Clique e faça seu login</Link>
                 </small> 
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}


