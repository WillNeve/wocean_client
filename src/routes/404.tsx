import { BiSolidConfused } from "react-icons/bi";

const NotFound = () => {
  return (
    <div className='bg-sky-900 rounded-md text-whitebright w-fit flex flex-col items-center justify-center
                      p-4 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                      border border-gray-200'>
      <h1><em className="text-red-400 font-bold">404:</em> The page you are looking for was not found</h1>
      <BiSolidConfused className='text-4xl' />
    </div>
  )
}

export default NotFound;
