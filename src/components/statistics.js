import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

const Statistics = ({ data }) => (
  <div id="statistics">
    {data.map((object, i) => (
      <Statistic data={object} key={i}/>
    ))}
  </div>
)

const Statistic = ({ data }) => (
  <div className="column">
    <img src={data.icone.file.url} alt={data.icone.description} className="icon"/>
    <span className="value">{data.valeur}</span>
    <span>{data.description}</span>
  </div>
)

export default ({ data }) => (
  <StaticQuery
    query={graphql`
      {
        allContentfulStatistique {
          nodes {
            valeur
            description
            icone {
              description
              file {
                url
                }
              }
          }
        }
      }
    `}
    render={data => <Statistics data={data.allContentfulStatistique.nodes} />}
  />
)

Statistics.propTypes = {
  data: PropTypes.array.isRequired,
}
