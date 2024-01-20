import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../auth";

//components
import NavBar from "../components/NavBar/NavBar";

const PromiseStatement = () => {
  return (
    <div className='relative flex flex-col w-full max-w-4xl mx-auto text-gray-200 mt-[80px] px-4'>
      <div className="why flex flex-col min-[650px]:flex-row gap-4 mx-auto">
        <div className="text max-w-[400px]">
          <h2 className="font-semibold text-gray-200/80"> - Why use us?</h2>
          <p className="text-3xl">With Wocean editor, we have <strong className="font-bold">revolutionalised</strong> the notetaking process.</p>
        </div>
        <div className="relative w-full max-w-[500px] min-[650px]:w-[30%] min-[650px]:max-w-[250px] min-[650px]:skew-y-1
                        flex-grow rounded-lg overflow-hidden
                        shadow-2xl min-[650px]:shadow-lg shadow-waveLight-500/50">
          <div className="absolute left-0 top-0 z-20 w-full h-full
                          bg-gradient-to-br from-waveLight-400/10 to-wave-900/40"></div>
          <img src="https://res.cloudinary.com/dep2nnxvb/image/upload/v1705690232/Screenshot_2024-01-19_184804_rgu6nx.png" alt="image of wocean note editor"
              className="relative w-full h-full"/>
        </div>
      </div>
    </div>
  );
}

const Hero = () => {
  return (
    <div className="relative w-full mx-auto">
      <div className="heroGlow"></div>
      <h2 className='font-bold text-5xl mt-[100px] mb-5 text-gray-200 text-center'>
        <em className="bg-gradient-to-r from-waveLight-300 to-waveLight-600 text-transparent bg-clip-text">Streamline</em> your notetaking.
      </h2>
      <div className="flex flex-col buttons items-center text-gray-200">
        <a
          type="button"
          href='/signup'
          aria-label="Sign Up Button"
          className="
                  relative
                  w-fit p-4 my-4
                  rounded-md
                  border
                  text-gray-200
                  border-gray-200
                  font-medium
                  cursor-pointer
                  transition overflow-hidden

                  after:content-['']
                  after:absolute
                  after:-left-3 after:top-[70%]
                  after:origin-right
                  after:rotate-[12deg]
                  after:-translate-x-full after:-translate-y-1/2
                  after:w-[250%]
                  after:h-[200%]
                  after:bg-gradient-to-r from-wave-900 to-wave-800
                  after:z-[-1]
                  after:transition-all

                  hover:after:left-[110%] hover:after:top-[82%]"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}

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
      <div className="content px-2">
        <Hero/>
        <PromiseStatement/>
      </div>
    </>
  );
}

export default Home;
