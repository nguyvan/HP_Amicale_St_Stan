import React from "react"

import { Link } from "gatsby"


const SecondaryCta = ({ text, link, externalLink, hoverText }) => {

  if(externalLink) {
    return (
      <a href={externalLink} id="secondary-cta" className="button button--animated"><span className="display-text">{text}</span><span className="hover-text">{hoverText ? hoverText : text}</span></a>
    )
  }

  return (
    <Link to={link} id="secondary-cta" className="button button--animated"><span className="display-text">{text}</span><span className="hover-text">{hoverText ? hoverText : text}</span></Link>
  )
}



export default SecondaryCta