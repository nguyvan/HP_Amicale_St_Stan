import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql, Link } from "gatsby"

import Circle from "../assets/circle-background.svg"

const Reasons = ({ data }) => (
  <div id="reasons">
    <div className="tag-container">
      <h5>{data.tag}</h5>
    </div>
    <h3>
      {data.cards.length} {data.titre}
    </h3>
    <div className="items">
      {data.cards.map((object, i) => (
        <Link to="/nous-rejoindre">
          <Reason data={object} key={i} />
        </Link>
      ))}
    </div>
  </div>
)

const Reason = ({ data }) => (
  <div id="reason">
    <img srcSet={data.icone.file.url} alt="" className="icon"/>
    <h4>{data.titre}</h4>
    <p>{data.description}</p>
    <Circle className="circle" />
  </div>
)

export default ({ data }) => (
  <StaticQuery
    query={graphql`
      query ReasonsQuery {
        allContentfulRaisons {
          nodes {
            tag
            titre
            cards {
              description
              titre
              icone {
                file {
                  url
                }
              }
            }
          }
        }
      }
    `}
    render={data => <Reasons data={data.allContentfulRaisons.nodes[0]} />}
  />
)

Reasons.propTypes = {
  data: PropTypes.object.isRequired,
}
