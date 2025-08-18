import React, { useState } from 'react'
import bg from "../assets/authBG.jpg"
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
function SignUp () {
  const [showPassword,setShowPassword]=useState(false)
  const navigate=useNavigate()
  return (
    <div 
      className='w-full h-[100vh] bg-cover flex justify-center items-center' 
      style={{
        backgroundImage:`url(${bg})`,}}>
          <form className='w-[90%] h-[600px] max-w-[500px] bg-[#0000f700] backdrop-blur shadow-lg shadow-pink-950 flex flex-col items-center justify-center gap-[20px] px-[20px] rounded-[10%] '>
            <h1 className='text-white text-[30px] font-semibold mb-[30px] '>
              Register to <span className='text-pink-400'>Virtual Assistant</span>
            </h1>
            <input type="text" placeholder='Enter Your Name <3' className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-pink-200 px-[20px] py-[10px] rounded-full text-[18px]'/>
            <input type="text" placeholder='Email@gmail.com' className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-pink-200 px-[20px] py-[10px] rounded-full text-[18px]'/>
            <div className='w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative'>
              <input type={showPassword?"text":"password"} placeholder='password' className='w-full h-full rounded-full outline-none bg-transparent placeholder-pink-200 px-[20px] py-[10px]'/>
              {!showPassword && <FaEye className='absolute top-[18px] right-[20px] text-[white] w-[25px] h-[25px] cursor-pointer ' onClick={()=>setShowPassword(true)} />}
              {showPassword && <FaRegEyeSlash className='absolute top-[18px] right-[20px] text-[white] w-[25px] h-[25px] cursor-pointer ' onClick={()=>setShowPassword(false)} />}
            </div>
            <button className='min-w-[150px] h-[60px] bg-white rounded-2xl text-pink-600 mt-[30px] text-[19px] justify-center font-bold '>Sign Up</button>
            <p className='text-[white] text-[18px]' >Already have an account? <span className='text-pink-400 cursor-pointer' onClick={()=>navigate("/signin")}>Sign In</span></p>
          </form>
        </div>
  )
}

export default SignUp
