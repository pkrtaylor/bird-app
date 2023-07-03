import Image from 'next/image'
import Landing from '../../components/Landing'
import { XIcon } from '@heroicons/react/outline'
import { useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { register } from '../../actions/auth'
import {useRouter} from 'next/router'

const Register = () => {
  const dispatch = useDispatch();
    const router = useRouter();
    const register_success = useSelector(state => state.auth.register_success)
    //to bring in redux state use the useSelector and
    const loading = useSelector(state => state.auth.loading)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const [formData, setFormData] = useState({
        email: '',
        first_name : '',
        last_name : '',
        username : '',
        password : '',
        re_password : '',
    })

    const {
        email,
        first_name,
        last_name,
        username,
        password,
        re_password
    } = formData

    //when we are inputting stuff inside the inpt fields in the form e.target.name will target one of the values in the formData state
    //then we have the spread operator on the formData so that we dont touch amything else, we only working on that one current value 
    const onChange = (e) => setFormData({...formData, [e.target.name] : e.target.value})

    const onSubmit = (e) =>{
        e.preventDefault();
        if(dispatch && dispatch !== null && dispatch !==  undefined){
            dispatch(register(email, first_name, last_name, username, password, re_password))
        } 
    }
    if(typeof window !== 'undefined' && isAuthenticated){
        router.push('/')
    }
    if(register_success){
        router.push('/auth/login')
    }
  return (
    <Landing>
    <div className="fixed inset-0 bg-opacity-25 backdrop-blur-sm text-white flex justify-center items-center">
      <div className="w-[800px] bg-white text-black rounded-md flex flex-col ">
          <div className='h-10 w-10 cursor-pointer hover:bg-[#1d9bf0] hover:bg-opacity-10 flex
          items-center justify-center rounded-full transition ease-out self-start '>
            <XIcon className='h-6 w-6'/>
          </div>
          <div className='self-center'>
          <Image src="https://icon-library.com/images/twitter-icon-eps/twitter-icon-eps-10.jpg" width={40} height={40}/>
          </div>
          <h3 className="mb-5 mt-3 text-3xl font-bold self-center">Create a Twitter Account</h3>
            <form className="flex flex-col items-center py-5 self-center" onSubmit={onSubmit}>
                <div className="flex flex-wrap justify-center">
                    <div className="relative mx-5 mb-5 ">
                      <input
                      className="authInput"
                      type='text'
                      name='first_name'
                      onChange={onChange}
                      value={first_name}
                      />
                      <label className="authLabel">First Name</label>
                    </div>
                    <div className="relative mx-5 mb-5">
                      <input
                      className="authInput"
                      type='text'
                      name='last_name'
                      onChange={onChange}
                      value={last_name}
                      />
                      <label className='authLabel'>Last Name</label>
                    </div>
                    <div className="relative mx-5 mb-5">
                      <input
                      className="authInput"
                      type='email'
                      name='email'
                      onChange={onChange}
                      value={email}
                      />
                      <label className='authLabel'>Email</label>
                    </div>
                    <div className="relative mx-5 mb-5">
                      <input
                      className="authInput"
                      type='text'
                      name='username'
                      onChange={onChange}
                      value={username}
                      />
                      <label className='authLabel'>Username</label>
                    </div>
                    <div className="relative mx-5 mb-5">
                      <input
                      className="authInput"
                      type='text'
                      name='password'
                      onChange={onChange}
                      value={password}
                      />
                      <label className='authLabel'>Password</label>
                    </div>
                    <div className="relative mx-5 mb-5">
                      <input
                      className="authInput"
                      type='text'
                      name='re_password'
                      onChange={onChange}
                      value={re_password}
                      />
                      <label className='authLabel'>Confirm Password</label>
                    </div>
                    
                    
                </div>
                  <a href="#_" className=" mt-12 relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-black border-2 border-black rounded-full hover:text-white group hover:bg-gray-50">
                  <span className="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                  <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </span>
                  <span className="relative">Sign up</span>
                  </a>
            </form>
            <div className="self-center h-[58px] w-[300px]">
              <p className="text-sm pl-[.5px] text-[#536471]">Dont have an account? <a href='/auth/login' className="text-[#1a8cd8] cursor-pointer">Login</a></p>
            </div>
      </div>
    </div>
    </Landing>
   
  )
}

export default Register