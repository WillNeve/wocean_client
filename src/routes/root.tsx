import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../auth";

import NavBar from "../components/NavBar/NavBar";

//components
import { ModalFade } from "../styles/Modals";

function Home() {
  const navigate = useNavigate();
  const { user, finishedLoadingUser } = useContext(UserContext);

  useEffect(() => {
    if (finishedLoadingUser) {
      if (user) {
        navigate('/dashboard')
      }
    }
  }, [navigate, user, finishedLoadingUser])

  return (
    <>
      <NavBar requestNavigate={navigate}/>
      <div className="w-full h-lvh text-left bg-gradient-to-tr from-slate-900 to-slate-800">
        <ModalFade>
          <h1 className='font-bold text-5xl mt-5 text-gray-200'>Nocean</h1>
          <p className='mt-2'>Streamline your note-taking</p>
          <div className="flex flex-col buttons">
            <a
              type="button"
              href='/signup'
              aria-label="Sign Up Button"
              className="
                      bg-blue-600
                      w-fit p-4 my-4
                      hover:bg-blue-500
                      rounded-md
                      border
                      border-gray-500
                      font-medium
                      text-gray-200
                      cursor-pointer
                      transition"
            >
              Create your account
            </a>
            <div className="flex flex-col">
              <p>Have an account?</p>
              <a
                type="button"
                href='/signin'
                aria-label="Sign Up Button"
                className="
                        w-fit p-2 py-1 my-2
                        hover:bg-blue-600
                        rounded-md
                        border
                        border-gray-500
                        font-medium
                        text-gray-200
                        cursor-pointer
                        transition"
              >
                Login
              </a>
            </div>
          </div>
        </ModalFade>
      </div>
    </>
  );
}

export default Home;
