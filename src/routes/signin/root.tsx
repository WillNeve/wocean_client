import { FormEvent, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// components
import { FormGroup } from "../../styles/Form";
import { ButtonForm } from "../../styles/Buttons";
import Window from "../../components/Window/Window";
import { ModalPopup } from "../../styles/Modals";
//auth
import { UserContext } from "../../contexts/auth";
// icons
import { FiAlertOctagon } from 'react-icons/fi';

type fieldErrors = {
  username: string[],
  email: string[],
  password: string[]
};

const SignIn = () => {
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext)

  const formRef = useRef(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [fieldErrors, setFieldErrors] = useState<fieldErrors>({ username: [], email: [], password: [] })
  const [errorMessage, setErrorMessage] = useState<string | boolean>(false);


  const appendGeneralMessage = (message: string) => {
    setErrorMessage(message);
  }

  const appendValidationMessages = (errors: fieldErrors) => {
    const {username, email, password} = errors;
    setFieldErrors({ username: username, email: email, password: password })
  }

  const authorizeUser = async (e: FormEvent) => {
    e.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      buttonRef.current?.classList.add('loading')

      const resp: Response | string = await Promise.race([
        fetch(`${import.meta.env.VITE_SERVER_URL}/signin`, {
          method: 'POST',
          body: formData
        }).catch(() => 'Server is unresponsive'),
        new Promise<string>((resolve) => {
          setTimeout(() => {
            resolve('Server is unresponsive');
          }, 10000);
        })
      ])

      buttonRef.current?.classList.remove('loading')

      if (resp instanceof Response) {
        if (resp.status === 200) {
          const data = await resp.json();
          if (setUser) {
            setUser({id: data.user.id, username: data.user.username, email: data.user.email, token: data.user.token})
          }
          navigate("/");
        } else if (resp.status === 422) {
          const data = await resp.json();
          appendValidationMessages(data.errors);
        } else {
          appendGeneralMessage(`Something went wrong (${resp.status})`)
        }
      } else {
        // no response (server offline)
        appendGeneralMessage(resp)
      }
    }
  }

  return (
    <>
      <Window requestNavigate={navigate} noFrame={true}>
      <ModalPopup>
        <h1 className="text-xl font-medium">Log in to your account</h1>
        <form action="#" ref={formRef} onSubmit={authorizeUser}>
          {errorMessage ?
            (<div className="text-red-300 flex items-center gap-x-2"><FiAlertOctagon className='mb-[1px]'/>{errorMessage}</div>)
            : ''}
          <FormGroup name={'email'} errors={fieldErrors.email}/>
          <FormGroup name={'password'} errors={fieldErrors.password}/>
          <ButtonForm ref={buttonRef} aria-label='Create account button' className='mx-0 py-2'>Log in</ButtonForm>
        </form>
      </ModalPopup>
      </Window>
    </>
  )
}

export default SignIn;
