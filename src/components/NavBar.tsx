// //icon
import { MdOutlineEventNote } from "react-icons/md";
import { UserContext } from "../auth";
import { useContext } from "react";

const NavBar = () =>  {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    if (setUser) {
      setUser(null);
    }
  }

  return user ? (
    <div className='sticky top-0 left-0 w-full p-2 px-6 md:px-12
                    border-b
                  border-gray-500
                  bg-indigo-900 text-gray-200'>
      <div className='flex mx-auto justify-between items-center w-full max-w-screen-xl'>
        <MdOutlineEventNote className='text-2xl'/>
        <ul className='flex gap-x-4 justify-normal'>
          {user ? (
            <>
              <li>
                <a href="/" className='border text-gray-200 bg-indigo-600 border-gray-600 hover:border-gray-400 cursor-pointer p-1 rounded-md'>New Note</a>
              </li>
              <li>
                <a href="/" className='border text-gray-200 bg-indigo-700 border-gray-600 hover:border-gray-400 cursor-pointer p-1 rounded-md'>My Notes</a>
              </li>
              <li>
                <a href="/" onClick={handleSignOut} className='border text-gray-200 bg-indigo-700 border-gray-600 hover:border-gray-400 cursor-pointer p-1 rounded-md'>Log Out</a>
              </li>
            </>
          ) : (
            <li>
              <a href="/signin" className='border text-gray-200 bg-indigo-600 border-gray-600 hover:border-gray-400 cursor-pointer p-1 rounded-md'>Log In</a>
            </li>
          )}
        </ul>
      </div>
    </div>
  ) : false;
}

export default NavBar;
