import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext()
const CartDispatchContext = createContext()

const reducer = (state, action) => {
    switch(action.type){
        case "ADD":
            return [...state, {id: action.id, name: action.name, img: action.img, qty: action.qty, size: action.size, price: action.price}]
        case "REMOVE":
            let newArray = [...state]
            newArray.splice(action.index, 1)
            return newArray
        case "UPDATE":
            state[action.index].qty = action.qty
            state[action.index].price = action.price
            return state
        case "DROP":
            return []
        default:
            return "No Action Found"
    }
}

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, [])

  return (
    <CartDispatchContext.Provider value={dispatch}>
        <CartStateContext.Provider value={state}>
            {children}
        </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  )
}

export const useCart = () => useContext(CartStateContext)
export const useDispatchCart = () => useContext(CartDispatchContext)