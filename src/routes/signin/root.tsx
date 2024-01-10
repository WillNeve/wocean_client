import React, { FormEvent, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// components
import { ButtonForm } from "../../styles/Buttons";
// icons
import { FaInfoCircle } from "react-icons/fa";
//auth
import { UserContext } from "../../auth";

interface FormGroupProps {
  name: string,
  errors?: string[]
}

const FormGroup: React.FC<FormGroupProps> = ({name, errors}) => {
  return (
    <div className="flex flex-col my-2">
    <label htmlFor={name} className="">{name.charAt(0).toUpperCase() + name.slice(1)}</label>
    <input type={/^password/.test(name) ? 'password' : 'text'} name={name} className="p-1 rounded-sm outline-none text-gray-900 font-medium"/>
    <div className="flex flex-col text-red-300 gap">
      {errors?.map((message, key) => (
        <p key={key} className="flex items-center gap-x-2 text-sm my-1"><FaInfoCircle />{message}</p>
      ))}
    </div>
  </div>
  );
}

const SignIn = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext)

  const formRef = useRef(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [fieldErrors, setFieldErrors] = useState<validationErrors>({ username: [], email: [], password: [] })

  type validationErrors = {
    username: string[],
    email: string[],
    password: string[]
  };

  const appendValidationMessages = (errors: validationErrors) => {
    console.log(errors);
    const {username, email, password} = errors;
    setFieldErrors({ username: username, email: email, password: password })
  }

  const authorizeUser = async (e: FormEvent) => {
    e.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      buttonRef.current?.classList.add('loading')

      const resp = await  fetch(`${import.meta.env.VITE_SERVER_URL}/signin`, {
        method: 'POST',
        body: formData
      });

      buttonRef.current?.classList.remove('loading')

      if (resp.status === 200) { // what is authorized status ?
        const data = await resp.json();
        console.log(data);
        if (setUser) {
          setUser({id: data.user.id, username: data.user.username, email: data.user.email, token: data.user.token})
        }
        navigate("/");
      } else if (resp.status === 422) {
        const data = await resp.json();
        appendValidationMessages(data.errors);
      } else {
        // something more fatal occured - tell user?
      }
    }
  }

  return (
    <div className="md:min-w-96 mx-auto my-5 p-6 shadow-sm shadow-gray-100/10 w-fit border border-gray-600 rounded-md bg-indigo-900 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <h1 className="text-xl font-medium">Log in to your account</h1>
      <form action="#" ref={formRef} onSubmit={authorizeUser}>
        <FormGroup name={'email'} errors={fieldErrors.email}/>
        <FormGroup name={'password'} errors={fieldErrors.password}/>
        <ButtonForm ref={buttonRef} aria-label='Create account button' className='mx-0 py-2'>Log in</ButtonForm>
      </form>
    </div>
  )
}

export default SignIn;
