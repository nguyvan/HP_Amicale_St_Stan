import React from "react"
import Layout from "../components/layout"

export default function Error(props) {

  const path = props.location ? props.location.pathname : null;

  return (
    <Layout path={path}>
      <div id="error-page">
        <h3 className="error-message">Cette page n'existe pas encore.</h3>
      </div>
    </Layout>
  )
}
