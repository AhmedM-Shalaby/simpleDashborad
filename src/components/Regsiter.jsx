import React, { useState } from "react";
import { Link } from "react-router-dom";

export function Regsiter() {
const [regsiterToken,setRegsiterToken] = useState({
	email:"",
	password :""
})
const[dataUser,setDataUser] = useState([])

	const handelchange =(e)=>{

	}
  const handelSumit = (e) => {
    e.preventDefault();
  };
  return (
    <form className="form mt-5" onSubmit={handelSumit}>
      <p className="title">Register </p>
      <p className="message">Signup now and get full access to our app. </p>
      <div className="flex">
        <label>
          <input onChange={handelchange} name="Firstname" placeholder="" type="text" className="input" />
          <span>Firstname</span>
        </label>
        <label>
          <input onChange={handelchange} name="Lastname" placeholder="" type="text" className="input" />
          <span>Lastname</span>
        </label>
      </div>
      <label>
        <input onChange={handelchange} name="Password" placeholder="" type="password" className="input" />
        <span>Password</span>
      </label>
      <label>
        <input onChange={handelchange} name="confirmPassword" placeholder="" type="password" className="input" />
        <span>Confirm password</span>
      </label>
      <button className="submit">Submit</button>
      <p className="signin">
        Already have an acount ? <Link to="/login"> Signin</Link>{" "}
      </p>
    </form>
  );
}
