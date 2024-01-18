import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../auth";


//components
import { ModalClear } from "../styles/Modals";
import NavBar from "../components/NavBar/NavBar";

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
      <div className="w-full h-lvh text-left">
        <ModalClear>
          <div className="w-100 py-2 pl-6 bg-gradient-to-r from-wave-700 to-wave-600">
            <h1 className='font-bold text-5xl mt-5 mb-5 text-white'>🌊 Wocean</h1>
          </div>
          <div className="bg-white p-6">
            <p className='mt-2'>Streamline your note-taking</p>
            <div className="flex flex-col buttons">
              <a
                type="button"
                href='/signup'
                aria-label="Sign Up Button"
                className="
                        bg-waveLight-600
                        w-fit p-4 my-4
                        hover:bg-waveLight-600
                        rounded-md
                        border
                        border-gray-600
                        font-medium
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
                          hover:bg-waveLight-600
                          rounded-md
                          border
                          border-gray-500
                          font-medium
                          cursor-pointer
                          transition"
                >
                  Login
                </a>
              </div>
            </div>
          </div>
        </ModalClear>
      </div>
    </>
  );
}

export default Home;
