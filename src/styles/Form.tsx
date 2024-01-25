import { FaInfoCircle } from "react-icons/fa";

interface FormGroupProps {
  name: string,
  errors?: string[]
}

export const FormGroup: React.FC<FormGroupProps> = ({name, errors}) => {
  const autoComplete = (name: string) => {
    switch (name) {
      case 'username':
        return 'username';
        break;
      case 'email':
        return 'email';
        break;
      case 'password':
        return 'current-password'
        break;
    }
  }



  return (
    <div className="flex flex-col my-2">
    <label htmlFor={name} className="">{name.charAt(0).toUpperCase() + name.replace('_', ' ').slice(1)}</label>
    <input type={/^password/.test(name) ? 'password' : 'text'}
           name={name}
           id={name}
           className="p-1 bg-transparent border border-gray-500 shadow-sm shadow-gray-200/20 rounded-sm outline-none overflow-hidden text-gray-300 font-medium"
           autoComplete={autoComplete(name)}
           />
    <div className="flex flex-col text-red-300 gap">
      {errors?.map((message, key) => (
        <p key={key} className="flex items-center gap-x-2 text-sm my-1"><FaInfoCircle />{message}</p>
      ))}
    </div>
  </div>
  );
}
