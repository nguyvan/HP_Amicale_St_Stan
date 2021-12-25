import React from "react"
import Layout from "../components/layout"
import Reasons from "../components/reasons"
import Statistics from "../components/statistics"
import Entreprises from "../components/entreprises"
import { graphql, Link } from "gatsby"
import PageHeader from "../components/page-header"
import Checkout from "../components/checkout"
import SecondaryCta from "../components/secondary-cta"

export default function NousRejoindre({ data }) {
  const page = data.allContentfulFormules.nodes[0]
  return (
    <Layout>
      <PageHeader data={page.titrePage} />
      <div id="formules">
        <h3
          dangerouslySetInnerHTML={{
            __html: page.options.length + " " + page.secondTitre,
          }}
        />
        <div className="items">
          {page.options.map((object, i) => (
            <Option data={object} />
          ))}
        </div>
      </div>
      <Entreprises />
      <Reasons />
      <Statistics />
    </Layout>
  )
}

const Option = ({ data }) => {
  const pricing = data.pricing.split("/")

  return (
    <div id="option">
      <div className="texte">
        <span className="titre" style={{ color: data.couleur }}>
          {data.secondTitre}
        </span>
        <span className="description">{data.secondeDescription}</span>
        {pricing.length > 1 ? (
          <div className="pricing-container">
            <span className="pricing">{pricing[0]}</span>
            <span className="pricing-suffix">/{pricing[1]}</span>
          </div>
        ) : (
          <span className="pricing pricing-container">{pricing[0]}</span>
        )}
        {data.pricingDetails ? (
          <span className="pricing-details">{data.pricingDetails}</span>
        ) : (
          <div className="placeholder" />
        )}
      </div>
      <div className="divider" />
      <ul>
        {data.contenu.map((object, i) => (
          <li>
            <img srcSet={object.icone.file.url} alt={object.icone.description} className="icon" />
            <span>{object.titre}</span>
          </li>
        ))}
      </ul>
      <div className="cta-container">
        {data.stripeId && (
          <Checkout price={data.stripeId} text={data.cta.texte} hoverText="J'adhère" />
        )}
        {data.googleForm && (
          <SecondaryCta text={data.cta.texte} externalLink={data.googleForm} hoverText="J'adhère" />
        )}
      </div>
    </div>
  )
}

export const nousRejoindreQuery = graphql`
  {
    allContentfulFormules {
      nodes {
        secondTitre
        titrePage
        options {
          stripeId
          googleForm
          pricing
          pricingDetails
          secondTitre
          secondeDescription
          couleur
          cta {
            couleur
            texte
          }
          contenu {
            icone {
              description
              file {
                url
              }
            }
            titre
          }
        }
      }
    }
  }
`
