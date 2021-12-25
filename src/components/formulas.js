import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql, Link } from "gatsby"

import Img from "gatsby-image"
import SecondaryCta from "./secondary-cta"

const Formulas = ({ data }) => (
  <div id="formulas">
    <h2>{data.titre}</h2>
    <h5 dangerouslySetInnerHTML={{ __html: data.description }} />
    <div className="items">
      {data.options.map((object, i) => (
        <Formula data={object} key={i}/>
      ))}
    </div>
  </div>
)

const Formula = ({ data }) => (
  <div id="formula">
    <Link to="/nous-rejoindre" className="img-container">
      <Img fluid={data.personne.fluid} alt={data.personne.description} className="img"/>
    </Link>
    <div className="text">
      <Link to="/nous-rejoindre">
        <h4>{data.titre}</h4>
      </Link>
      <p>{data.description}</p>
    </div>
    <div className="cta-container">
      <SecondaryCta text={data.secondaryCta.texte} link={data.secondaryCta.lien} hoverText={data.pricing} />
    </div>
  </div>
)

export default ({ data }) => (
  <StaticQuery
    query={graphql`
      {
        allContentfulFormules {
          nodes {
            description
            titre
            options {
              titre
              description
              pricing
              secondaryCta {
                texte
                lien
              }
              personne {
                fluid(maxWidth: 347, quality: 100){
                  ...GatsbyContentfulFluid_withWebp
                }
                description
              }
            }
          }
        }
      }
    `}
    render={data => <Formulas data={data.allContentfulFormules.nodes[0]} />}
  />
)

Formulas.propTypes = {
  data: PropTypes.object.isRequired,
}
