import React, {FormEvent, useContext, useState} from "react";
import { UserContext, UserType } from "../../../contexts/auth";

interface IEditAccountView {
  user: UserType,
}

interface PropsFormGroup {
  name: string,
  type?: string,
  dataName?: string,
  autocomplete?: string,
}

const FormGroup: React.FC<PropsFormGroup> = ({name, type, dataName, autocomplete}) => {

  return (
    <div className="flex flex-col gap-y-1 my-2">
      <label htmlFor={dataName ? dataName : name}
             className="">
        {name}:
      </label>
      <input type={type ? type : 'text'}
             name={dataName ? dataName : name}
             autoComplete={autocomplete ? autocomplete : 'off'}
             className="bg-transparent outline-none p-1 border border-gray-500 rounded focus:border-gray-300"/>
    </div>
  );
}

const EditAccountView: React.FC<IEditAccountView> = ({user}) => {
  const [viewName, setViewName] = useState('password');

  const updateUserName = (e: FormEvent) => {
    // patch request
    e.preventDefault();
  }

  const updatePassword = (e: FormEvent) => {
    // patch request
    e.preventDefault();
  }

  return (
    <div className="font-light">
      <h3 className="text-sm">Update your details:</h3>
      <div className="flex flex-col p-2 mt-2 gap-y-2 border border-gray-600 bg-gray-500/10 rounded-md max-w-[320px]">
        <div className="w-fit mx-auto top flex items-center gap-x-2">
          <button type='button'
                  onClick={() => setViewName('username')}
                  className={`${viewName === 'username' ? 'bg-gray-400/40' : ''} p-1 border border-gray-600 rounded`}>
            Username
          </button>
          <button type='button'
                  onClick={() => setViewName('password')}
                  className={`${viewName === 'password' ? 'bg-gray-400/40' : ''} p-1 border border-gray-600 rounded`}>
            Password
          </button>
        </div>

        <div className={`${viewName === 'username' ? '' : 'hidden'}`}>
          <form action={`/users/${user.id}`}
                onSubmit={updateUserName}>
            <p className="mt-2">Username: <strong className="bg-wave-700 ml-1 p-1 py-[1px] border border-waveLight-800 rounded">{ user.username }</strong></p>
            <FormGroup name="New Username" dataName="username_new"/>
            <button type='submit'
                    className="p-1 px-2 mt-1 border border-gray-600 rounded hover:bg-gradient-to-r hover:border-gray-500">
              Change Username
            </button>
          </form>
        </div>

        <div className={`${viewName === 'password' ? '' : 'hidden'}`}>
          <form action={`/users/${user.id}`}
                onSubmit={updatePassword}>
            <FormGroup name="Old password" dataName="password_old"/>
            <FormGroup name="New password" dataName="password_new"/>
            <FormGroup name="Confirm new password"/>
            <button type='submit'
                    className="p-1 px-2 mt-1 border border-gray-600 rounded hover:bg-gradient-to-r hover:border-gray-500">
              Change Password
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

const DangerZones = () => {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="bg-red-400/20 w-full h-fit p-2 rounded-md border border-red-900">
        <h3 className="font-light text-red-300">Danger Zone</h3>
        <ul className="mt-2">
          <button type="button"
                  className="p-1 border border-gray-600 hover:opacity-85 rounded-md font-light">
            Log Out 😢
          </button>
        </ul>
      </div>

      <div className="bg-red-400/20 w-full h-fit p-2 rounded-md border border-red-900">
        <h3 className="font-light text-red-300">Even More Danger Zone</h3>
        <ul className="mt-2">
          <button type="button"
                  className="p-1 border border-gray-600 hover:opacity-85 rounded-md font-light">
            Delete your account 🫨
          </button>
        </ul>
      </div>
    </div>
  );
}


const Account = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <h2 className="text-xl">Account</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-gray-800/20 rounded-md p-2 border border-gray-600">
          <h3>General</h3>
          <EditAccountView user={user as UserType} />
        </div>
      <DangerZones/>
      </div>
    </div>
  )
}

export default Account;
