import React from "react"

import { Link } from "gatsby"


const PrimaryCta = ({ text, link }) => (
  <Link to={link} id="primary-cta" className="button button--animated"><span>{text}</span></Link>
)


export default PrimaryCta