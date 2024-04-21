import React from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer'
import trash from '../assets/trash.svg'

export default function Cart() {
    let cartData = useCart()
    let dispatch = useDispatchCart()
    if(cartData.length === 0){
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
            </div>
        )
    }

    let totalPrice = cartData.reduce((total, food) => total + food.price, 0)

    let handleCheckOut = async () => {
        const userEmail = localStorage.getItem("userEmail")
        let response = await fetch("https://foodish-service.onrender.com/api/orderdata", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: userEmail, order_data: cartData, order_date: new Date().toDateString()})
        });
        console.log(response);
        if(response.status === 200){
            await dispatch({type: "DROP"})
            await alert("Checked out successfully")
        }
        else{
            alert("Server Error")
        }
    }

  return (
    <div>
        <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
            <table className='table table-hover'> 
                <thead className='text-success fs-4'>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Option</th>
                        <th scope='col'>Quantity</th>
                        <th scope='col'>Amount</th>
                        <th scope='col'></th>
                    </tr>
                </thead>
                <tbody>
                    {cartData.map((food, index) => (
                        <tr>
                            <th scope='row'>{index + 1}</th>
                            <td>{food.name}</td>
                            <td>{food.size}</td>
                            <td>{food.qty}</td>
                            <td>{food.price}</td>
                            <td><button type='button' className='btn p-0'><img src={trash} alt='delete' onClick={() => {dispatch({type: "REMOVE", index: index})}} /></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div><h1 className='fs-2'>Total Price: ₹{totalPrice}/-</h1></div>
            <div className='btn bg-success mt-5' onClick={handleCheckOut}> Check Out</div>
        </div>
    </div>
  )
}
