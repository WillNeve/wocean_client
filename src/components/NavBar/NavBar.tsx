import { useContext, ReactNode, useState } from "react";
import { UserContext } from "../../auth";

//icons
import { RiMenu3Line } from "react-icons/ri";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";


//styles
import './navbar.css'
import { useLocation } from "react-router-dom";

interface NavButtonProps {
  children: ReactNode,
  route: string
}

const NavButtonCTA: React.FC<NavButtonProps> = ({children, route}) => {
  return (
    <a href={route} className='border border-gray-200 text-whitebright hover:bg-wave-200 hover:text-gray-600 hover:font-medium cursor-pointer px-2 p-1 rounded-md'>{children}</a>
  );
}

interface NavBarProps {
  requestNavigate?: (arg: string) => void
}

const NavBar: React.FC<NavBarProps> = ({requestNavigate}) =>  {
  const { user, setUser } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  }

  const handleLogOut = () => {
    if (setUser) {
      setUser(null);
    }
    if (requestNavigate) {
      requestNavigate('/')
    }
  }

  return (
    <div className='sticky z-20 top-0 left-0 w-full px-4 py-2
                    border-b-[1px] border-b-whiteDark bg-wave-700
                   text-whitebright'>
      <div className='flex mx-auto justify-between items-center w-full px-4 max-w-5xl'>
        <a href='/' className="masked text-2xl font-bold flex items-center gap-x-2">
          <p>🌊</p><h2>Wocean</h2>
        </a>
        <ul className='flex gap-x-4 justify-normal items-center'>
          {user ? (
            <>
              <li className='hidden min-[400px]:block'>
                <NavButtonCTA route="/notes/new">New Note</NavButtonCTA>
              </li>
              <button type='button'
              aria-label='NavMobileMenu Button'
              onClick={handleMenuToggle}
              className='p-2 hover:bg-wave-200 hover:text-gray-600 rounded-md'>
              <RiMenu3Line className='cursor-pointer text-xl'/>
            </button>
            </>
          ) : (
            (location.pathname === '/signin' ? (
              <li>
                <NavButtonCTA route="/signup">Create your account</NavButtonCTA>
              </li>
            ) : (
              <li>
                <NavButtonCTA route="/signin">Log In</NavButtonCTA>
              </li>
            ))

          )}
        </ul>
      </div>
      <div className="menuWrapper absolute flex justify-end bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-full max-w-5xl px-4 h-[40px] pointer-events-none">
        <div className={`NavMenu ${menuOpen ? 'active' : ''}
                        w-fit min-w-[200px] h-fit flex flex-col items-end mr-1 p-4 bg-white text-gray-600 rounded-b-lg border border-gray-600 border-t-gray-200`}
                        >
          <a href="/dashboard" className={`bg-wave-200 hover:bg-wave-300 flex gap-x-4 items-center p-2  border border-gray-600 rounded-md`}>
            <MdOutlineSpaceDashboard className='text-md'/>
            <p>Dashboard</p>
          </a>
          <button type='button'
                  aria-label='Log Out Button'
                  onClick={handleLogOut}
                  className={`font-normal hover:bg-red-500/50 hover:text-whitebright flex gap-x-4 items-center mt-4 p-1 px-2 rounded-md`}
                  >
            <FiLogOut className='text-sm'/><p>Log Out</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
