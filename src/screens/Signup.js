import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", location: "" })
    let navigate = useNavigate()

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:4000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.location })
        })
        const json = await response.json()
        console.log(json)
        if (!json.success)
            alert("Enter valid credentials")
        if (json.success) {
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
                        <label htmlFor="inputName" className="form-label">Name</label>
                        <input type="text" name="name" value={credentials.name} onChange={onChange} className="form-control" id="nameinput" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputEmail" className="form-label">Email</label>
                        <input type="email" name="email" value={credentials.email} onChange={onChange} className="form-control" id="inputEmail" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPassword" className="form-label">Password</label>
                        <input type="password" name="password" value={credentials.password} onChange={onChange} className="form-control" id="inputPassword" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputLocation" className="form-label">Address</label>
                        <input type="text" name="location" value={credentials.location} onChange={onChange} className="form-control" id="inputLocation" />
                    </div>
                    <button type="submit" className="btn btn-success">Sign Up</button>
                    <Link to="/login" className='m-3 btn btn-danger'>Already a user?</Link>
                </form>
            </div>
        </>
    )
}
