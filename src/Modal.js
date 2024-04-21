import React from 'react'
import { Badge } from 'react-bootstrap'
import ReactDOM from 'react-dom'

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    backgroundColor : 'rgb(34,34,34)',
    transform: 'translate(-50%, -50%)',
    zIndex: 10,
    height: '80%',
    width: '80%'
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 10
}

export default function Modal({children, onClose}) {
  return ReactDOM.createPortal(
    <div>
        <div style={OVERLAY_STYLES} />
        <div style={MODAL_STYLES}>
            <Badge pill className='btn bg-danger fs-4' style={{marginLeft: "90%", marginTop: "-50px"}} onClick={onClose}>X</Badge>
            {children}
        </div>
    </div>,
    document.getElementById('cart-root')
  )
}
