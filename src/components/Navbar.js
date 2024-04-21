import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Badge } from 'react-bootstrap'
import Modal from '../Modal'
import Cart from '../screens/Cart'
import { useCart } from './ContextReducer'

export default function NavBar() {

  const [cartView, setCartView] = useState(false)
  let cartData = useCart()

  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    navigate('/login')
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-2 fst-italic fw-bold" to="/">Foodish</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              {localStorage.getItem("authToken") ?
                (
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/myorders">My Orders</Link>
                  </li>
                ) : ""
              }
            </ul>
            <div className="d-flex">
              {
                !localStorage.getItem("authToken") ?
                  (
                    <div>
                      <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                      <Link className="btn bg-white text-success mx-1" to="/signup">Sign up</Link>
                    </div>
                  ) :
                  (
                    <div>
                      <div className="btn bg-white text-success mx-2" onClick={() => setCartView(true)}>
                        My Cart {" "}
                        {
                          cartData.length === 0 ? "" : <Badge pill bg="danger" > {cartData.length} </Badge>
                        }
                      </div>
                      {cartView ? <Modal onClose={() => setCartView(false)} ><Cart /></Modal> : ""}
                      <div className="btn bg-danger text-white mx-1" onClick={handleLogout}>Logout</div>
                    </div>)
              }
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
