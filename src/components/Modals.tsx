export const SignUpModal = () => {
  return (
    <div className="fixed w-fit text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h1 className='font-bold text-5xl mt-5 text-gray-200'>Nocean</h1>
      <p className='mt-2'>Start taking notes like never before</p>
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
    </div>
  );
}
