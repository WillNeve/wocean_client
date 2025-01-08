import { BiSolidConfused } from "react-icons/bi";

const NotFound = () => {
  return (
    <div className='gradient-brighten rounded-md text-gray-300 w-fit flex flex-col items-center gap-y-1 justify-center
                      p-4 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                      border border-gray-500'>
      <h1><em className="text-red-400 font-bold">404:</em> The page you are looking for was not found</h1>
      <BiSolidConfused className='text-4xl' />
      <a href="/"
         className="p-1 border border-gray-500 rounded hover:opacity-85">
        Back to home
      </a>
    </div>
  )
}

export default NotFound;
