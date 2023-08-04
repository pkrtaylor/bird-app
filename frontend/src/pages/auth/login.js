import Image from 'next/image'
import Landing from '../../components/Landing'
import { XIcon } from '@heroicons/react/outline'
import {useState, useEffect, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { login, reset_register_success } from '../../actions/auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Alert from '../../components/Alert'


const Login = () => {

  const formRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter(); 
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  //to bring in redux state use the useSelector and
  const loading = useSelector(state => state.auth.loading)
  const [focus, setFocus] = useState({
    username:false,
    password: false
  })
  
  const [formData, setFormData] = useState({

      
      username : '',
      password : '',
     
  })

  const {
   
      username,
      password,
    
  } = formData
  //when the component mounts we want to make a request to the reset_register_success
  useEffect(()=>{
          if(dispatch && dispatch !== null && dispatch !== undefined){
              dispatch(reset_register_success());
          }
  }, [dispatch])

  //when we are inputting stuff inside the inpt fields in the form e.target.name will target one of the values in the formData state
  //then we have the spread operator on the formData so that we dont touch amything else, we only working on that one current value 
  const onChange = (e) => setFormData({...formData, [e.target.name] : e.target.value})

  const onSubmit = (e) =>{
      e.preventDefault();
      console.log(1)
      if(dispatch && dispatch !== null && dispatch !==  undefined){
          dispatch(login(username, password))
          console.log('onSubmit fucntion ran')
      } 
      
  }
  //lets have more prottection to make sure router even exists
  //the first condition makes sure router exits 
  if(typeof window !== 'undefined' && isAuthenticated)
  {
      router.push('/')
  }
  return (
    
    <div className="relative text-white flex justify-center items-center h-screen">
      
      
      <div className="w-[600px] bg-white text-black rounded-md flex flex-col ">
          <div className='h-10 w-10 cursor-pointer hover:bg-[#1d9bf0] hover:bg-opacity-10 flex
          items-center justify-center rounded-full transition ease-out self-start '>
            <Link href="/">
            <XIcon className='h-6 w-6'/>
            </Link>
          </div>
          <div className='self-center'>
          <Image src="https://icon-library.com/images/twitter-icon-eps/twitter-icon-eps-10.jpg" width={40} height={40}/>
          </div>
            <form className="flex flex-col items-center py-10 self-center" ref={formRef} onSubmit={onSubmit}>
                <h3 className="mb-10 text-3xl font-bold">Sign in to Twitter</h3>
                <div className="space-y-5">
                    <div className="relative">
                      <input
                      className="authInput"
                      type='text'
                      name='username'
                      onChange={onChange}
                      value={username}
                      required
                      onFocus={()=>{setFocus(prev =>({...prev, username:true}))}}
                      onBlur={()=>{!username.trim() && setFocus(prev =>({...prev, username:false}))}}
                    
                     
                      />
                      <label className={ focus['username'] ? "authLabelFocus" : "authLabel"}>Username</label>
                    </div>
                    <div className="relative">
                      <input
                      className="authInput"
                      type='text'
                      name='password'
                      onChange={onChange}
                      value={password}
                      required
                      onFocus={()=>{setFocus(prev =>({...prev, password:true}))}}
                      onBlur={()=>{!password.trim() && setFocus(prev =>({...prev, password:false}))}}
                      
                      />
                      <label className={ focus['password'] ? "authLabelFocus" : "authLabel"}>Password</label>
                    </div>
                </div>
                  <button type='submit' className='bg-black text-white h-[38px] w-[300px] rounded-[20px] mt-10 '>Login</button>
            </form>
            <div className="self-center h-[58px] w-[300px]">
              <p className="text-sm pl-[.5px] text-[#536471]">Dont have an account? <a href='/auth/register' className="text-[#1a8cd8] cursor-pointer">Sign up</a></p>
            </div>
      </div>
    </div>
    
   
  )
}

export default Login