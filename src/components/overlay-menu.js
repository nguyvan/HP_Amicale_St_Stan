import React from "react"

import Portal from "./portal"
import { Link } from "gatsby"


const OverlayMenu = ({pages, cta, contact, onNavigate}) => (
  <Portal children={
    <div id="overlay-menu-container">
        <div className="container">
            <ul>
              {pages.map((object, i) => (
                <li key={i}>
                  <Link to={object.path} onClick={() => onNavigate()}>
                    <h5>{object.texte}</h5>
                  </Link>
                </li>
              ))}
              <li>
                <a className="link" title={contact.texte} href={`mailto:${contact.path}`}><h5>{contact.texte}</h5></a>
              </li>
            </ul>
            <div className="cta">
              <Link to={cta.lien} onClick={() => onNavigate()}>{cta.texte}</Link>
            </div>
        </div>
    </div>
  }/>
)


export default OverlayMenu