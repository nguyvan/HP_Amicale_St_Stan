import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql, Link } from "gatsby"

const Entreprises = ({ data }) => (
  <div id="entreprises">
    <span>{data.titre}</span>
    <div className="items">
      {data.logos.map((object, i) => (
        <img srcSet={object.file.url} alt={object.description} className="logo" key={i}/>
      ))}
    </div>
  </div>
)

export default ({ data }) => (
  <StaticQuery
    query={graphql`
      query EntreprisesQuery {
        allContentfulEntreprises {
          nodes {
            titre
            logos {
              description
              file {
                url
              }
            }
          }
        }
      }
    `}
    render={data => (
      <Entreprises data={data.allContentfulEntreprises.nodes[0]} />
    )}
  />
)

Entreprises.propTypes = {
  data: PropTypes.object.isRequired,
}
