import {useState, useEffect} from 'react';

import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
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
              <p className="text-gray-300/60 text-xs">{clients[step].position}</p>
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
          <div key={index} className={`w-[10px] h-[10px] rounded-full border ${index === step ? 'bg-waveLight-300' : ''}`}></div>
          );
        })}
      </div>
    </div>
  );
}

export default TestimonialsCarousel;
