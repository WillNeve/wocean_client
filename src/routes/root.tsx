import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/auth";

//components
import NavBar from "../components/NavBar/NavBar";
import TestimonialsCarousel from "../components/TestimonialCarousel/TestimonialCarousel";

const PromiseStatement = () => {
  return (
    <div className='relative flex flex-col w-full max-w-4xl mx-auto text-gray-300 mt-[80px]'>
      <div className="why w-full flex flex-col min-[750px]:flex-row max-w-landing justify-between gap-4 mx-auto">
        <div className="text max-w-[400px]">
          <h2 className="font-semibold text-gray-300/80"> - Why use us?</h2>
          <p className="text-3xl">With Wocean editor, we have <strong className="font-bold">revolutionalised</strong> the notetaking process.</p>
        </div>
        <div className="relative w-full max-w-[500px] min-[750px]:w-[30%] min-[750px]:max-w-[250px]
                        flex-grow rounded-lg overflow-hidden
                        shadow-2xl shadow-waveLight-500/10 border border-gray-600">
          <div className="absolute left-0 top-0 z-20 w-full h-full
                          bg-gradient-to-br from-waveLight-400/10 to-wave-900/40 pointer-events-none"></div>
          <img src="https://res.cloudinary.com/dep2nnxvb/image/upload/v1705690232/Screenshot_2024-01-19_184804_rgu6nx.png" alt="image of wocean note editor"
              className="relative w-full h-full"/>
        </div>
      </div>
    </div>
  );
}
import { FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi";




const Testimonials = () => {
  return (
    <div className="relative w-full justify-between items-center flex flex-col min-[750px]:flex-row max-w-landing gap-4 gap-x-8 mx-auto text-gray-300 mt-[80px] ">
      <div className="w-full min-[750px]:w-[70%] flex flex-col items-end min-[750px]:order-2 max-w-[400px] max-[750px]:self-end">
        <h2 className="font-semibold text-gray-300/80"> - Who uses us?</h2>
        <p className="text-3xl text-right">Join <strong className="relative overflow-visible font-bold">millions<em className="font-thin">*</em></strong> of others who have chosen wocean to help them consolidate their thoughts.</p>
      </div>
      <TestimonialsCarousel/>
    </div>
  );
}

const Hero = () => {
  return (
    <div className="relative w-full mx-auto">
      <div className="heroGlow"></div>
      <h2 className='font-bold text-5xl mt-[100px] mb-5 text-gray-300 text-center'>
        <em className="bg-gradient-to-r from-waveLight-300 to-waveLight-600 text-transparent bg-clip-text">Streamline</em> your notetaking.
      </h2>
      <div className="flex flex-col buttons items-center text-gray-300">
        <a
          type="button"
          href='/signup'
          aria-label="Sign Up Button"
          className="
                  relative
                  w-fit p-4 my-4
                  rounded-md
                  border
                  text-gray-300
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
    <footer className='p-4 pb-6 w-full border-t border-gray-600 max-w-5xl mx-auto mt-[80px] text-gray-300'>
      <div className="w-full max-w-landing mx-auto">
        <div className="lists flex flex-wrap gap-x-20 gap-y-5 mx-auto w-fit max-w-[100%]">
          <div className="contact">
            <h3 className="text-1xl masked font-bold flex items-center gap-x-2">
              <div>🌊</div><div>Wocean</div>
            </h3>
            <ul className="text-sm w-fit">
              <li className="block text-gray-300 hover:opacity-85 w-fit h-fit rounded-md">
                <a href="https://github.com/willneve/wocean_client/" target="_blank" className="w-fit h-fit p-2 pl-0 flex items-center gap-x-1"><FiGithub/><p>GitHub</p></a>
              </li>
              <li className="block text-gray-300 hover:opacity-85 w-fit h-fit rounded-md">
                <a href="https://www.linkedin.com/in/william-neve-66a13819a/" target="_blank" className="w-fit h-fit p-2 pl-0 flex items-center gap-x-1"><FiLinkedin/><p>LinkedIn</p></a>
              </li>
              <li className="block text-gray-300 hover:opacity-85 w-fit h-fit rounded-md">
                <a href="#" target="_blank" className="w-fit h-fit p-2 pl-0 flex items-center gap-x-1"><FiInstagram/><p>Instagram</p></a>
              </li>
            </ul>
          </div>
          <div className="support">
            <h3 className="text-1xl masked font-bold flex items-center gap-x-2">
              Support
            </h3>
            <ul className="text-sm">
              <li className="block text-gray-300 hover:opacity-85 w-fit h-fit rounded-md">
                <a href="#" className="w-fit h-fit p-2 pl-0 flex items-center gap-x-1">FAQs</a>
              </li>
              <li className="block text-gray-300 hover:opacity-85 w-fit h-fit rounded-md">
                <a href="#" className="w-fit h-fit p-2 pl-0 flex items-center gap-x-1">Submit a Ticket</a>
              </li>
            </ul>
          </div>
          <div className="Guide">
            <h3 className="text-1xl masked font-bold flex items-center gap-x-2">
              Guide
            </h3>
            <ul className="text-sm">
              <li className="block text-gray-300 hover:opacity-85 w-fit h-fit rounded-md">
                <a href="#" className="w-fit h-fit p-2 pl-0 flex items-center gap-x-1">Your first note</a>
              </li>
              <li className="block text-gray-300 hover:opacity-85 w-fit h-fit rounded-md">
                <a href="#" className="w-fit h-fit p-2 pl-0 flex items-center gap-x-1">File system</a>
              </li>
              <li className="block text-gray-300 hover:opacity-85 w-fit h-fit rounded-md">
                <a href="#" className="w-fit h-fit p-2 pl-0 flex items-center gap-x-1">Going further</a>
              </li>
            </ul>
          </div>

        </div>
        <div className="mt-6 w-fit mx-auto text-center">
          <p className="text-sm">&copy; Copyright Wocean {new Date().getFullYear()}. All rights reserved.</p>
          <div className="flex items-center text-xs text-gray-400 gap-x-1">
            <p>Not actually copyrighted 😅. Produced and maintained by{' '}</p>
            <a href="https://github.com/willneve/"
              target="_blank"
              className="flex w-fit items-center gap-x-1 text-transparent
                          bg-gradient-to-r from-wave-300 to-wave-100 bg-clip-text">
              William Neve
            </a>
          </div>
        </div>
      </div>
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
        <Testimonials/>
        <Footer/>
      </div>
    </>
  );
}

export default Home;
