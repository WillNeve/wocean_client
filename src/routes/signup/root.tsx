import React, { FormEvent, useRef } from "react";

interface FormGroupProps {
  name: string,
}

const FormGroup: React.FC<FormGroupProps> = ({name}) => {
  return (
    <div className="flex flex-col">
    <label htmlFor={name}>{name.charAt(0).toUpperCase() + name.slice(1)}</label>
    <input type="text" name={name} className="p-1 outline-none text-gray-900 font-medium"/>
  </div>
  );
}

const SignUp = () => {
  const formRef = useRef(null);

  const createUser = async (e: FormEvent) => {
    e.preventDefault();
    console.log('querying API');

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const resp = await  fetch(`http://localhost:${import.meta.env.VITE_SERVER_PORT}/users`, {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      const data = await resp.json();
      console.log(data);

    }
  }


  return (
    <div className="w-fit mx-auto my-5 p-6 border border-gray-600">
      <form action="#" ref={formRef} onSubmit={createUser}>
        <FormGroup name={'username'}/>
        <FormGroup name={'email'}/>
        <FormGroup name={'password'}/>
        <FormGroup name={'password_confirmation'}/>
        <button type="submit" className="p-1 my-2 rounded-sm bg-indigo-600">Create Account</button>
      </form>
    </div>
  )
}

export default SignUp;
