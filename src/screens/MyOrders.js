import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import NavBar from '../components/Navbar'

export default function MyOrders() {

    const [orderData, setOrderData] = useState([])

    let fetched_order_data = async () => {
        await fetch("http://localhost:4000/api/myorderdata", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: localStorage.getItem("userEmail") })
        }).then(async (res) => {
            let response = await res.json()
            await setOrderData(response)
        })
    }

    useEffect(() => { fetched_order_data() }, [])

    return (
        <div>
            <div>
                <NavBar />
            </div>

            <div className="container overflow-hidden">
                <div className='row'>
                    {
                        orderData !== undefined ? orderData.reverse().map((orders) => {
                            return (
                                <div className='col-12 col-md-6 col-lg-3'>{
                                    orders ? orders.map((data, index) => {
                                        return (
                                            <div key={index}>
                                                {data.Order_Date ? <div className='m-auto mt-3 fb-w'>
                                                    {data.Order_Date}
                                                    <hr />
                                                </div> :
                                                    <div className="card mt-3" style={{ width: "18rem", height: "300px" }}>
                                                        <img src={data.img} className="card-img-top" alt={data.name} style={{ height: '200px', objectFit: 'fill' }} />
                                                        <div className="card-body">
                                                            <h5 className="card-title">{data.name}</h5>
                                                            <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                <span className='m-1'>{data.size}</span>
                                                                <span className='m-1'>{data.qty}</span>
                                                                <div className='d-inline ms-2 h-100 fs-5'>₹{data.price}/-</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        )
                                    }) : " "}
                                </div>
                            )
                        }) : <div>Your order history is empty</div>
                    }
                </div>
            </div>

            <div>
                <Footer />
            </div>
        </div>
    )
}
