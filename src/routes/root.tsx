//components
import { ButtonCTA } from '../styles/Buttons';

function Root() {
  return (
    <div className="App w-full h-lvh bg-gradient-to-tr from-slate-900 to-slate-800">
      <div className="fixed w-fit text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className='font-bold text-5xl mt-5 text-gray-200'>Nocean</h1>
        <p className='mt-2'>Start taking notes like never before</p>
        <ButtonCTA>
        Create your account
        </ButtonCTA>
      </div>
    </div>
  );
}

export default Root;
