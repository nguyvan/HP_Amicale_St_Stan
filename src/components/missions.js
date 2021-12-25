import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql, Link } from "gatsby"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import PrimaryCta from "./primary-cta"

const Missions = ({ data }) => (
  <div id="missions">
    <div className="col-text">
      <h2 dangerouslySetInnerHTML={{ __html: data.titre }} />
      <div className="content">{renderRichText(data.corps)}</div>
      <div className="signature">
        <img srcSet={data.signature.file.url} alt={data.signature.description} className="img"/>
        <span dangerouslySetInnerHTML={{ __html: data.president }} />
      </div>
      <div className="cta-container">
        <PrimaryCta link={data.cta.lien} text={data.cta.texte}/>
      </div>
    </div>
    <div className="cards">
      {data.cards.map((object, i) => (
        <div className={`card ${object.titre.toLowerCase()}`} key={i}>
          <img srcSet={object.icone.file.url} alt={object.icone.description} className="icon"/>
          <h5>{object.titre}</h5>
          <span>{object.description}</span>
        </div>
      ))}
      <img srcSet={data.background.file.url} alt={data.background.description} className="background"/>
    </div>
  </div>
)

export default ({ data }) => (
  <StaticQuery
    query={graphql`
      {
        allContentfulMission {
          nodes {
            president
            titre
            background {
              description
              file {
                url
              }
            }
            cards {
              titre
              description
              icone {
                file {
                  url
                }
                description
              }
            }
            signature {
              description
              file {
                url
              }
            }
            corps {
              raw
            }
            cta {
              texte
              lien
              couleur
            }
          }
        }
      }
    `}
    render={data => <Missions data={data.allContentfulMission.nodes[0]} />}
  />
)

Missions.propTypes = {
  data: PropTypes.object.isRequired,
}
