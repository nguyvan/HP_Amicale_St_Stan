import React from "react"
import PropTypes from "prop-types"

import Underline from "../assets/underline.svg"

const PageHeader = ({ data }) => (
  <div id="page-header">
    <div className="container">
      <h1>{data}</h1>
      <Underline className="shape"/>
    </div>
  </div>
)

export default PageHeader

PageHeader.propTypes = {
  data: PropTypes.object.isRequired,
}
