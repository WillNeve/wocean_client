import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../auth";

//components
import { ModalFade } from "../components/Modals";

function Home() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  if (user) {
    navigate('/dashboard')
  } else {
    return (
      <div className="w-full h-lvh bg-gradient-to-tr from-slate-900 to-slate-800">
        <ModalFade>
          <h1 className='font-bold text-5xl mt-5 text-gray-200'>Nocean</h1>
          <p className='mt-2'>Streamline your note-taking</p>
          <div className="flex flex-col buttons items-center">
            <a
              type="button"
              href='/signup'
              aria-label="Sign Up Button"
              className="
                      bg-indigo-600
                      w-fit p-4 m-4
                      hover:bg-indigo-500
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
            <div className="flex items-center">
              <p>Have an account?</p>
              <a
                type="button"
                href='/signin'
                aria-label="Sign Up Button"
                className="
                        bg-indigo-700
                        w-fit p-2 m-2
                        hover:bg-indigo-600
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
    );
  }
}

export default Home;
