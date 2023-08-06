import Image from 'next/image'
import Landing from '../../components/Landing'
import { XIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../../actions/auth'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const register_success = useSelector(state => state.auth.register_success)
  //to bring in redux state use the useSelector and
  const loading = useSelector(state => state.auth.loading)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const [focus, setFocus] = useState({
    email: false,
    first_name: false,
    last_name: false,
    username:false,
    password: false,
    re_password: false

  })
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    re_password: '',
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
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault();
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(register(email, first_name, last_name, username, password, re_password))
    }
  }
  if (typeof window !== 'undefined' && isAuthenticated) {
    router.push('/')
  }
  if (register_success) {
    router.push('/auth/login')
  }
  return (
    
      <div className="relative text-white flex justify-center items-center h-screen">
        <div className="w-[800px] bg-white text-black rounded-md flex flex-col mt-[100px]">
          <div className='h-10 w-10 cursor-pointer hover:bg-[#1d9bf0] hover:bg-opacity-10 flex
          items-center justify-center rounded-full transition ease-out self-start '>
            <XIcon className='h-6 w-6' />
          </div>
          <div className='self-center'>
            <Image src="https://icon-library.com/images/twitter-icon-eps/twitter-icon-eps-10.jpg" width={40} height={40} />
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
                  onFocus={()=>{setFocus(prev =>({...prev, first_name:true}))}}
                  onBlur={()=>{!first_name.trim() && setFocus(prev =>({...prev, first_name:false}))}}
                />
                <label className={ focus['first_name'] ? "authLabelFocus" : "authLabel"}>First Name</label>
              </div>
              <div className="relative mx-5 mb-5">
                <input
                  className="authInput"
                  type='text'
                  name='last_name'
                  onChange={onChange}
                  value={last_name}
                  onFocus={()=>{setFocus(prev =>({...prev, last_name:true}))}}
                  onBlur={()=>{!last_name.trim() && setFocus(prev =>({...prev, last_name:false}))}}
                />
                <label className={ focus['last_name'] ? "authLabelFocus" : "authLabel"}>Last Name</label>
              </div>
              <div className="relative mx-5 mb-5">
                <input
                  className="authInput"
                  type='email'
                  name='email'
                  onChange={onChange}
                  value={email}
                  onFocus={()=>{setFocus(prev =>({...prev, email:true}))}}
                  onBlur={()=>{!email.trim() && setFocus(prev =>({...prev, email:false}))}}
                />
                <label className={ focus['email'] ? "authLabelFocus" : "authLabel"}>Email</label>
              </div>
              <div className="relative mx-5 mb-5">
                <input
                  className="authInput"
                  type='text'
                  name='username'
                  onChange={onChange}
                  value={username}
                  onFocus={()=>{setFocus(prev =>({...prev, username:true}))}}
                  onBlur={()=>{!username.trim() && setFocus(prev =>({...prev, username:false}))}}
                />
                <label className={ focus['username'] ? "authLabelFocus" : "authLabel"}>Username</label>
              </div>
              <div className="relative mx-5 mb-5">
                <input
                  className="authInput"
                  type='text'
                  name='password'
                  onChange={onChange}
                  value={password}
                  onFocus={()=>{setFocus(prev =>({...prev, password:true}))}}
                  onBlur={()=>{!password.trim() && setFocus(prev =>({...prev, password:false}))}}
                />
                <label  className={ focus['password'] ? "authLabelFocus" : "authLabel"}>Password</label>
              </div>
              <div className="relative mx-5 mb-5">
                <input
                  className="authInput"
                  type='text'
                  name='re_password'
                  onChange={onChange}
                  value={re_password}
                  onFocus={()=>{setFocus(prev =>({...prev, re_password:true}))}}
                  onBlur={()=>{!re_password.trim() && setFocus(prev =>({...prev, re_password:false}))}}
                />
                <label className={ focus['re_password'] ? "authLabelFocus" : "authLabel"}>Confirm Password</label>
              </div>


            </div>
            <button type='submit' className='bg-black text-white h-[38px] w-[300px] rounded-[20px] mt-10 '>Sign up</button>
          </form>
          <div className="self-center h-[58px] w-[300px]">
            <p className="text-sm pl-[.5px] text-[#536471]">Dont have an account? <Link href='/auth/login' className="text-[#1a8cd8] cursor-pointer">Login</Link></p>
          </div>
        </div>
      </div>
   

  )
}

export default Register