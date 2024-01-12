import { useContext, ReactNode, useState } from "react";
import { UserContext } from "../../auth";

//icons

import { RiMenu3Line } from "react-icons/ri";

//styles
import styles from './navbar.module.css'

interface NavButtonProps {
  children: ReactNode,
  route: string
}

const NavButtonCTA: React.FC<NavButtonProps> = ({children, route}) => {
  return (
    <a href={route} className='border border-gray-500 text-gray-200 hover:bg-blue-600 cursor-pointer p-1 rounded-md'>{children}</a>
  );
}

interface NavBarProps {
  requestNavigate: (arg: string) => void
}

const NavBar: React.FC<NavBarProps> = ({requestNavigate}) =>  {
  const { user, setUser } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  }

  const handleLogOut = () => {
    if (setUser) {
      setUser(null);
    }
    requestNavigate('/')
  }

  return user ? (
    <div className='sticky top-0 left-0 w-full p-2 px-6 md:px-12
                    border-b
                  border-gray-500
                  bg-blue-900 text-gray-200'>
      <div className='flex mx-auto justify-between items-center w-full max-w-screen-xl'>
        <a href={user ? '/dashboard' : '/'} aria-label="Back to Home" className="w-[30px]">
          <img src="/waves.png" alt="Wocean logo" className="w-full" />
        </a>
        <ul className='flex gap-x-4 justify-normal items-center'>
          {user ? (
            <>
              <li>
                <NavButtonCTA route="/test">New Note</NavButtonCTA>
              </li>
              <button type='button'
              aria-label='NavMobileMenu Button'
              onClick={handleMenuToggle}
              className='p-2 hover:bg-blue-600 rounded-md'>
              <RiMenu3Line className='cursor-pointer text-xl'/>
            </button>
            </>
          ) : (
            <li>
              <NavButtonCTA route="/signin">Log In</NavButtonCTA>
            </li>
          )}
        </ul>
      </div>
      <div className={`${menuOpen ? `${styles.menu} ${styles.active}` : `${styles.menu}`}
                       w-fit min-w-[200px] flex flex-col items-end p-4 bg-slate-900 text-gray-300 rounded-b-lg border border-gray-500`}
                       >
        <button type='button' aria-label='Log Out Button' onClick={handleLogOut}>Log Out</button>
      </div>
    </div>
  ) : false;
}

export default NavBar;
