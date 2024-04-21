import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

export default function Login() {
  let navigate = useNavigate()
  const [credentials, setCredentials] = useState({ email: "", password: "" })

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch("http://localhost:4000/api/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    })
    const json = await response.json()
    console.log(json)
    if (!json.success)
      alert("Enter valid credentials")
    if(json.success){
      localStorage.setItem("userEmail", credentials.email)
      localStorage.setItem("authToken", json.authToken)
      navigate('/')
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className='container'>
        <form onSubmit={handleOnSubmit}>
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">Email</label>
            <input type="email" name="email" value={credentials.email} onChange={onChange} className="form-control" id="inputEmail" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <input type="password" name="password" value={credentials.password} onChange={onChange} className="form-control" id="inputPassword" />
          </div>
          <button type="submit" className="btn btn-success">Login</button>
          <Link to="/signup" className='m-3 btn btn-danger'>New User</Link>
        </form>
      </div>
    </>
  )
}
