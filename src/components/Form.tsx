import { FaInfoCircle } from "react-icons/fa";

interface FormGroupProps {
  name: string,
  errors?: string[]
}

export const FormGroup: React.FC<FormGroupProps> = ({name, errors}) => {
  return (
    <div className="flex flex-col my-2">
    <label htmlFor={name} className="">{name.charAt(0).toUpperCase() + name.slice(1)}</label>
    <input type={/^password/.test(name) ? 'password' : 'text'} name={name} className="p-1 shadow shadow-gray-900/10 rounded-sm outline-none overflow-hidden text-gray-900 font-medium"/>
    <div className="flex flex-col text-red-300 gap">
      {errors?.map((message, key) => (
        <p key={key} className="flex items-center gap-x-2 text-sm my-1"><FaInfoCircle />{message}</p>
      ))}
    </div>
  </div>
  );
}
