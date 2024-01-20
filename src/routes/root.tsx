import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../auth";

//components
import NavBar from "../components/NavBar/NavBar";

const PromiseStatement = () => {
  return (
    <div className='relative flex flex-col w-full max-w-4xl mx-auto text-gray-200 mt-[80px]'>
      <div className="why w-full flex flex-col min-[750px]:flex-row max-w-landing justify-between gap-4 mx-auto">
        <div className="text max-w-[400px]">
          <h2 className="font-semibold text-gray-200/80"> - Why use us?</h2>
          <p className="text-3xl">With Wocean editor, we have <strong className="font-bold">revolutionalised</strong> the notetaking process.</p>
        </div>
        <div className="relative w-full min-[750px]:w-[30%] min-[750px]:max-w-[250px]
                        flex-grow rounded-lg overflow-hidden
                        shadow-2xl shadow-waveLight-500/20">
          <div className="absolute left-0 top-0 z-20 w-full h-full
                          bg-gradient-to-br from-waveLight-400/10 to-wave-900/40"></div>
          <img src="https://res.cloudinary.com/dep2nnxvb/image/upload/v1705690232/Screenshot_2024-01-19_184804_rgu6nx.png" alt="image of wocean note editor"
              className="relative w-full h-full"/>
        </div>
      </div>
    </div>
  );
}
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";


const Testimonial = () => {
  return (
    <div className="relative flex flex-col min-[600px]:flex-row w-full max-w-4xl mx-auto text-gray-200 mt-[80px]">
      <div className="who w-full justify-between flex flex-col min-[750px]:flex-row max-w-landing gap-4 mx-auto">
        <div className="w-full flex flex-col items-end min-[750px]:order-2 max-w-[400px]">
          <h2 className="font-semibold text-gray-200/80"> - Who uses us?</h2>
          <p className="text-3xl text-right">Join <strong className="relative overflow-visible font-bold">millions<em className="font-thin">*</em></strong> of others who choose wocean to consolidate their thoughts</p>
        </div>
        <div className="users flex justify-end mt-4 w-full min-[750px]:w-[30%] min-[750px]:max-w-[350px] flex-grow">
          <div className="relative flex max-w-[450px] min-[750px]:max-w-[350px] flex-col shadow-2xl shadow-waveLight-500/20 rounded-lg p-4 w-full
                          bg-wave-900 overflow-hidden">
            <div className="absolute left-0 top-0 z-20 w-full h-full
              bg-gradient-to-br from-waveLight-400/20 to-wave-900/20"></div>
            <div className="relative mt-2">
              <FaQuoteLeft className='absolute text-xl left-0 top-0 text-waveLight-400/20'/>
              <p className="text-justify">Wocean has enabled me to store anything from thoughts to minutes with ease. The user experience is something else.</p>
              <FaQuoteRight className='absolute text-xl right-0 bottom-0 text-waveLight-400/20'/>
            </div>
            <div className="flex gap-x-2 items-end">
              <div className="relative w-[40px] h-auto aspect-square rounded-tr-[40%] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="picture of a wocean user (stock image)"
                    className="w-full h-full object-cover object-top"/>
              </div>
              <div className="flex flex-col h-fit">
                <p className="font-normal text-sm">Joseph Grillz</p>
                <p className="text-gray-200/60 text-xs">Wocean Powered Writer @Writing.io</p>
              </div>
            </div>
          </div>
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

const Footer = () => {
  return (
    <footer className='p-4 max-w-5xl mx-auto mt-[80px] text-gray-300'>
      {/* <ul>
        <li>Footer Link</li>
        <li>Footer Link</li>
        <li>Footer Link</li>
        <li>Footer Link</li>
      </ul> */}
    </footer>
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
      <div className="content px-6">
        <Hero/>
        <PromiseStatement/>
        <Testimonial/>
        <Footer/>
      </div>
    </>
  );
}

export default Home;
