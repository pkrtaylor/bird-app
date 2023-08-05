import Link from 'next/link'


const Landing = ({ children }) => {
  return (
    <>
      <div className="text-white bg-bgImage bg-cover bg-right min-h-screen flex justify-center items-center flex-col">
        <div className="flex justify-center items-center flex-col">
            <h1 className="text-[26px] font-serif text-center md:text-[32px] xl:text-[36px] ">Welcome to the Bird App</h1>
            <small>Warning: once you enter time may fly away</small>
        </div>
        <div className="flex w-[300px] justify-between mt-5">
          <Link legacyBehavior href="/auth/login">
            <a className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group h-[49px] w-[132px]">
              <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#1a8cd8] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white text-center">Login</span>
            </a>
          </Link>

          <Link legacyBehavior href="auth/register"><a className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group h-[49px] w-[132px]">
            <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#1a8cd8] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
            <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white text-center">Sign Up</span>
          </a></Link>
        </div>
      </div>
      {children}
    </>

  )
}

export default Landing