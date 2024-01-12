import { BiSolidConfused } from "react-icons/bi";

const NotFound = () => {
  return (
    <div className='bg-blue-900 rounded-md text-gray-200 w-fit flex flex-col items-center justify-center p-4 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
      <h1><em>404:</em> The page you are looking for was not found</h1>
      <BiSolidConfused className='text-4xl' />
    </div>
  )
}

export default NotFound;
