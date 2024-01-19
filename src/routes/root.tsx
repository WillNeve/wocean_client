import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../auth";

//components
import NavBar from "../components/NavBar/NavBar";

function Home() {
  const navigate = useNavigate();
  const { user, finishedLoadingUser } = useContext(UserContext);

  useEffect(() => {
    if (finishedLoadingUser) {
      if (user) {
        navigate('/notes')
      }
    }
  }, [navigate, user, finishedLoadingUser])

  return (
    <>
      <NavBar requestNavigate={navigate}/>
      <div className="w-full h-lvh text-left bg-none">
      <h1 className='font-bold text-5xl mt-[100px] mb-5 text-gray-200 text-center'>
        <em className="bg-gradient-to-r from-waveLight-300 to-waveLight-600 text-transparent bg-clip-text">Streamline</em> your notetaking.
        </h1>
        <div className="flex flex-col buttons items-center text-gray-200">
              <a
                type="button"
                href='/signup'
                aria-label="Sign Up Button"
                className="
                        bg-waveLight-500
                        w-fit p-4 my-4
                        hover:bg-waveLight-600
                        rounded-md
                        border
                        text-gray-800
                        border-gray-200
                        font-medium
                        cursor-pointer
                        transition"
              >
                Create your account
              </a>
              <div className="flex flex-col items-center">
                <p className="text-gray-200">Have an account?</p>
                <a
                  type="button"
                  href='/signin'
                  aria-label="Sign Up Button"
                  className="
                          w-fit p-2 py-1 my-2
                          hover:bg-waveLight-500
                          hover:text-gray-600
                          rounded-md
                          border
                          border-gray-200
                          font-medium
                          cursor-pointer
                          transition"
                >
                  Login
                </a>
              </div>
            </div>
      </div>
    </>
  );
}

export default Home;
