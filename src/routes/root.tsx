import { useContext, useEffect, useState } from "react";
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
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi";


type clientInfo = {
  name: string,
  position: string,
  testimony: string,
  imageUrl: string
}

const clients: clientInfo[] = [
  {
    name: 'Joseph Grills',
    position: 'Wocean Powered Writer @writing.io',
    testimony: 'Wocean has enabled me to store anything from thoughts to minutes with ease. The user experience is something else.',
    imageUrl: 'https://images.unsplash.com/photo-1522556189639-b150ed9c4330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'Becky Forest',
    position: 'Product Manager @neptune.dev',
    testimony: 'The increased productivity after making the switch to wocean\'s systems has been astronomical!',
    imageUrl: 'https://images.unsplash.com/photo-1554727242-741c14fa561c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
];

const TestimonialsCarousel = () => {
  const [step, setStep] = useState<number>(0);
  const [stepLocks, setStepLocks] = useState<number>(0);
  const [activeTimeout, setActiveTimeout] = useState<NodeJS.Timeout | null>(null);

  const changeStep = (change: number, manual: boolean) => {
    if (!manual && stepLocks > 0) return;

    const newStep = step + change;
    if (newStep < 0) {
      setStep(clients.length - 1);
    } else if (newStep > clients.length - 1) {
      setStep(0);
    } else {
      setStep(newStep);
    }
  }

  useEffect(() => {
    if (activeTimeout !== null) {
      clearTimeout(activeTimeout);
    }

    const newTimeout = setTimeout(() => {
      changeStep(1, false);
    }, 5000);
    setActiveTimeout(newTimeout);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, stepLocks])


  return (
    <div className="flex flex-col w-full min-[750px]:w-[30%] flex-grow max-w-[450px] self-end">
      <div className="relative users flex justify-end mt-4 w-full h-full">
        <div className="relative flex flex-col justify-between shadow-2xl shadow-waveLight-500/10 rounded-lg p-4 w-full  min-h-[175px] min-[750px]:min-h-[195px]
                      overflow-hidden  border border-gray-600">

          <button type='button'
                  aria-label="previous testimonial"
                  className="absolute top-0 left-0 h-full w-[20%] z-30
                             hover:bg-gray-900/30 text-gray-500/0 hover:text-gray-500 flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    setStepLocks(stepLocks + 1);
                    changeStep(-1, true);
                    setTimeout(() => {
                      setStepLocks((prevValue) => prevValue - 1);
                    }, 5000);
                  }}>
            <HiChevronLeft className="text-5xl"/>
          </button>
          <div className="absolute left-0 top-0 z-20 w-full h-full
            bg-gradient-to-br from-waveLight-400/10 to-wave-900/10 pointer-events-none"></div>
          <div className="relative mt-2">
            <FaQuoteLeft className='absolute text-xl left-0 top-0 text-waveLight-400/20'/>
            <p className="text-justify">{clients[step].testimony}</p>
            <FaQuoteRight className='absolute text-xl right-0 bottom-0 text-waveLight-400/20'/>
          </div>
          <div className="flex gap-x-2 items-end mt-2 h-fit">
            <div className="h-full min-h-[50px] w-auto aspect-square relative">
              <div className="absolute w-full h-full rounded-tr-[40%] overflow-hidden">
                <img src={clients[step].imageUrl}
                    alt="picture of a wocean user (stock image)"
                    className="w-full h-full object-cover object-top"/>
              </div>
            </div>
            <div className="relative h-fit">
              <p className="font-normal text-sm">{clients[step].name}</p>
              <p className="text-gray-200/60 text-xs">{clients[step].position}</p>
            </div>
          </div>
          <button type='button'
                  aria-label="next testimonial"
                  className="absolute top-0 right-0 h-full w-[20%] z-30
                  hover:bg-gray-900/30 text-gray-500/0 hover:text-gray-500 flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    setStepLocks(stepLocks + 1);
                    changeStep(1, true);
                    setTimeout(() => {
                      setStepLocks((prevValue) => prevValue - 1);
                    }, 5000);
                  }}>
            <HiChevronRight className="text-5xl"/>
          </button>
        </div>
      </div>
      <div className="flex self-center items-center gap-x-4 mt-4">
        {clients.map((_c, index) => {
          return (
          <div className={`w-[10px] h-[10px] rounded-full border ${index === step ? 'bg-waveLight-300' : ''}`}></div>
          );
        })}
      </div>
    </div>
  );
}


const Testimonials = () => {
  return (
    <div className="relative w-full justify-between items-center flex flex-col min-[750px]:flex-row max-w-landing gap-4 gap-x-8 mx-auto text-gray-200 mt-[80px] ">
      <div className="w-full min-[750px]:w-[70%] flex flex-col items-end min-[750px]:order-2 max-w-[400px] max-[750px]:self-end">
        <h2 className="font-semibold text-gray-200/80"> - Who uses us?</h2>
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
          <p className="text-xs text-gray-400">Not actually copyrighted 😅. Produced and maintained by{' '}
          <div className="inline-block">
            <a href="https://github.com/willneve/"
              target="_blank"
              className="flex w-fit items-center gap-x-1 text-transparent
                          bg-gradient-to-r from-wave-300 to-wave-100 bg-clip-text">
              William Neve
            </a>
          </div>
          </p>
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
