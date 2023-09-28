import React from 'react'

export default function Error(props) {
const {statusText,status,code} = props.Errors ? props.Errors:false
  return (
    <div className='contaiener text-center mt-5'>
      <h1 className='text-danger fw-bold'>{status || "Not Fond Page"}</h1>
      <h1>{statusText ||false}</h1> 
      <p>{code  || "404"}</p>
    </div>
  )
}

