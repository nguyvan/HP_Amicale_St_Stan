import React from "react"

import Portal from "./portal"


const Modal = ({ message, onClose }) => (
  <Portal children={
    <div id="modal-container">
      <div className="modal">
        <div className="content">
          <h4>{message}</h4>
        </div>
        <div onClick={() => onClose()} className="close-button">Fermer</div>
      </div>
    </div>
  }/>
)


export default Modal