import { FormEvent, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// components
import { FormGroup } from "../../components/Form";
import { ButtonForm } from "../../styles/Buttons";
import { FiAlertOctagon } from "react-icons/fi";
// icons
//auth
import { UserContext } from "../../auth";



const SignUp = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext)

  const formRef = useRef(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [fieldErrors, setFieldErrors] = useState<validationErrors>({ username: [], email: [], password: [] })
  const [errorMessage, setErrorMessage] = useState<string | boolean>(false)

  type validationErrors = {
    username: string[],
    email: string[],
    password: string[]
  };

  const appendValidationMessages = (errors: validationErrors) => {
    const {username, email, password} = errors;
    setFieldErrors({ username: username, email: email, password: password })
  }

  const appendGeneralMessage = (message: string) => {
    setErrorMessage(message);
  }

  const createUser = async (e: FormEvent) => {
    e.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      buttonRef.current?.classList.add('loading')

      const resp: Response | string = await Promise.race([
        fetch(`${import.meta.env.VITE_SERVER_URL}/register`, {
          method: 'POST',
          body: formData
        }).catch(() => 'Server is unresponsive'),
        new Promise<string>((resolve) => {
          setTimeout(() => {
            resolve('Server is unresponsive');
          }, 5000);
        })
      ])

      buttonRef.current?.classList.remove('loading')

      if (resp instanceof Response) {
        if (resp.status === 201) {
          const data = await resp.json();
          if (setUser) {
            setUser({id: data.user.id, username: data.user.username, email: data.user.email, token: data.user.token})
          }
          navigate("/");
        } else if (resp.status === 422) {
          const data = await resp.json();
          appendValidationMessages(data.errors);
        } else {
          // something more fatal occured - tell user?
          appendGeneralMessage(`Something went wrong (${resp.status})`)
        }
      } else {
        appendGeneralMessage(resp)
      }
    }
  }

  return (
    <div className="md:min-w-96 mx-auto my-5 p-6 shadow-sm shadow-gray-100/10 w-fit border border-gray-600 rounded-md bg-indigo-900 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <h1 className="text-xl font-medium">Create your account</h1>
      <form action="#" ref={formRef} onSubmit={createUser}>
        {errorMessage ?
        (<div className="text-red-300 font-medium flex items-center gap-x-2"><FiAlertOctagon className='mb-[1px]'/>{errorMessage}</div>)
        : ''}
        <FormGroup name={'username'} errors={fieldErrors.username}/>
        <FormGroup name={'email'} errors={fieldErrors.email}/>
        <FormGroup name={'password'} errors={fieldErrors.password}/>
        <FormGroup name={'password_confirmation'} errors={fieldErrors.password}/>
        <ButtonForm ref={buttonRef} aria-label='Create account button' className='mx-0 py-2'>Create Account</ButtonForm>
      </form>
    </div>
  )
}

export default SignUp;
