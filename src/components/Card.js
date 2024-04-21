import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer'

export default function Card(props) {

    let priceOptions = Object.keys(props.options)
    let foodItem = props.foodItem
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")
    let dispatch = useDispatchCart()
    let cartData = useCart()
    let priceRef = useRef()

    const handleAddToCart = async () => {
        let index = undefined, count = 0
        for (const item of cartData) {
            if (item.id === foodItem._id && item.size === size) {
                index = count;
                break;
            }
            ++count
        }

        if (index !== undefined) {
            await dispatch({ type: "UPDATE", index: index, price: finalPrice, qty: qty })
        }
        else {
            await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, img: foodItem.img, price: finalPrice, qty: qty, size: size })
        }
    }
    let finalPrice = qty * parseInt(props.options[size])

    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    return (
        <div>
            <div>
                <div className="card mt-3" style={{ width: "18rem", height: "360px" }}>
                    <div style={{height: '190px'}}>
                        <img src={foodItem.img} className="card-img-top" alt={foodItem.name} style={{ height: '190px', objectFit: 'fill' }} />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{foodItem.name}</h5>
                        {/* <div style={{ height: '32px' }}><p className="card-text" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{props.description}</p></div> */}
                        {/* <Link to="/" className="btn btn-primary">Go somewhere</Link> */}
                        <div className='container w-100 p-0' style={{ height: "38px" }}>
                            <select className='m-2 h-100 bg-success rounded' style={{ width: "25%" }} onChange={(e) => setQty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })}
                            </select>
                            <select className='m-2 h-100 bg-success rounded' style={{ width: "25%" }} ref={priceRef} onChange={(e) => setSize(e.target.value.toLowerCase())}>
                                {
                                    priceOptions.map((option) => {
                                        return (<option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>)
                                    })
                                }
                            </select>
                            <div className='d-inline ms-2 h-100 fs-5'>₹{finalPrice}/-</div>
                        </div>
                        <hr />
                        <button className='btn btn-success justify-center' onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
