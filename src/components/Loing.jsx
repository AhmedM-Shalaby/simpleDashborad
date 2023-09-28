import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate =useNavigate()
  const [dataUser,setDataUser] = useState({
    name: "",
    password:""
  })
  const [isErrors,setIsErrors] = useState({
    viledname:false,
    viledPass:false
  })
  const [msgError,setMsgError] = useState({
    nameError:"",
    passError:""
  })
  const handelchange=(e)=>{
setDataUser({
  ...dataUser,
  [e.target.name]:e.target.value
})

  }
  const blurInput=()=>{
    const patternRag = /([a-z]{7})([A-Z]{3})/ 
    console.log(1000000000);
    setIsErrors({
      ...isErrors,
      viledname:patternRag.test(dataUser.name),
      viledPass: dataUser.password.length >= 7
     })
     setMsgError({
      nameError:'this Name is Not Vaild',
      passError: 'this Name is Not Vaild'
    }
    )
  }
  const hanelSumit = (e)=>{
    e.preventDefault(); 
    if (isErrors.viledname && isErrors.viledPass) {
      navigate("/")
    }
  }
  return (
    <div className='container mt-5'>
    <form className="form" onSubmit={hanelSumit}>
        <p className="form-title">Sign in to your account</p>
        <div className="input-container">
          <input type="text"onChange={handelchange} onBlur={blurInput}  name='name'value={dataUser.name} placeholder="Enter name"/>
          {msgError.nameError && msgError.nameError}
      </div>
      <div className="input-container">
          <input type="password"onChange={handelchange} onBlur={blurInput} name='password'value={dataUser.password}  placeholder="Enter password"/>
        </div>
          <button type="submit" className="submit">
        Sign in
      </button>
      <p className="signup-link">
        No account ? 
        <Link to="/Regsiter"> Sign up</Link>
      </p>
    </form>
    </div>
  )
}
