import React, { useContext, useState } from 'react'
import bg from "../assets/authBG.jpg"
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/userContext';
import axios from "axios"

function SignIn () {
  const [showPassword,setShowPassword]=useState(false)
  const navigate=useNavigate()
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const {serverUrl}=useContext(userDataContext)
  const [err,setErr]=useState("")
  
 // Inside your handleSignIn function
const handleSignIn = async (e) => {
  e.preventDefault();
  setErr("")
  try {
    let result = await axios.post(
      `${serverUrl}/api/auth/SignIn`,
      { email, password },
      { withCredentials: true }
    );
    console.log("SignIn successful:", result.data); // only log the user data
    // redirect after SignIn
    navigate("/signin"); 
  } catch (error) {
    setErr(error.response.data.message)
    if (error.response) {
      console.error("SignIn failed:", error.response.data.message);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
  }
};
  return (
    <div 
      className='w-full h-[100vh] bg-cover flex justify-center items-center' 
      style={{
        backgroundImage:`url(${bg})`}}>
          <form className='w-[90%] h-[600px] max-w-[500px] bg-[#0000f700] backdrop-blur shadow-lg shadow-pink-200 flex flex-col items-center justify-center gap-[20px] px-[20px] rounded-[10%]' onSubmit={handleSignIn}>
            <h1 className='text-white text-[30px] font-semibold mb-[30px] '>
              SignIn to <span className='text-pink-200'>Virtual Assistant</span>
            </h1>
            <input type="text" placeholder='Email@gmail.com' className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-pink-200 px-[20px] py-[10px] rounded-full text-[18px]' required onChange={(e)=>setEmail(e.target.value)} value={email}/>
            <div className='w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative'>
              <input type={showPassword?"text":"password"} placeholder='password' className='w-full h-full rounded-full outline-none bg-transparent placeholder-pink-200 px-[20px] py-[10px]' required onChange={(e)=>setPassword(e.target.value)} value={password}/>
              {!showPassword && <FaEye className='absolute top-[18px] right-[20px] text-[white] w-[25px] h-[25px] cursor-pointer ' onClick={()=>setShowPassword(true)} />}
              {showPassword && <FaRegEyeSlash className='absolute top-[18px] right-[20px] text-[white] w-[25px] h-[25px] cursor-pointer ' onClick={()=>setShowPassword(false)} />}
            </div>
            {err.length>0 && <p className='text-red-500 font-bold text-[20px]'>
              *{err}
              </p>}
            <button type="submit" className='min-w-[150px] h-[60px] bg-white rounded-2xl text-pink-600 mt-[30px] text-[19px] justify-center font-bold'>
  Sign In
</button>

            <p className='text-[white] text-[18px]' >Want to create a new account? <span className='text-pink-400 cursor-pointer' onClick={()=>navigate("/signup")}>Sign Up</span></p>
          </form>
        </div>
  )
}

export default SignIn


