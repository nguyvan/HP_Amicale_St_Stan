import React, { Component } from "react"
import { graphql, Link } from "gatsby"
import PropTypes from "prop-types"
import Reasons from "../components/reasons"
import Statistics from "../components/statistics"
import Formulas from "../components/formulas"
import Layout from "../components/layout"
import PageHeader from "../components/page-header"

import { renderRichText } from "gatsby-source-contentful/rich-text"
import Img from "gatsby-image"
import SecondaryCta from "../components/secondary-cta"

class Page extends Component {
  render() {
    const { titre, contenu } = this.props.data.contentfulPage
    const path = this.props.location ? this.props.location.pathname : null;

    return (
      <Layout path={path}>
        <PageHeader data={titre} />
        <div id="blocks">
          {contenu.map((object, i) => (
            <div id="block">
              {i % 2 ? (
                <>
                  <ColumnImage data={object} />
                  <ColumnText data={object} />
                </>
              ) : (
                <>
                  <ColumnText data={object} />
                  <ColumnImage data={object} />
                </>
              )}
            </div>
          ))}
        </div>

        <Reasons />
        <Statistics />
        <Formulas />
      </Layout>
    )
  }
}

const ColumnText = ({ data }) => (
  <div id="column-text">
    <h3 dangerouslySetInnerHTML={{ __html: data.titre }} />
    <div className="content">{renderRichText(data.corps)}</div>
    {data.cta && (
      <div className="cta-container">
        <SecondaryCta text={data.cta.texte} link={data.cta.lien} />
      </div>
    )}
    {(data.nomPresident && data.signature) && (
      <div className="signature">
        <img srcSet={data.signature.file.url} alt={data.signature.description} className="img"/>
        <span dangerouslySetInnerHTML={{ __html: data.nomPresident }} />
      </div>
    )}
  </div>
)

const ColumnImage = ({ data }) => (
  <div id="column-img">
    <Img fluid={data.image.fluid} imgStyle={{ objectFit: "contain" }} alt={data.image.description} className="img"/>
  </div>
)

Page.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Page

export const pageQuery = graphql`
  query pageQuery($slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
      titre
      slug
      contenu {
        titre
        corps {
          raw
        }
        cta {
          texte
          lien
        }
        nomPresident
        signature {
          file {
            url
          }
        }
        image { fluid(maxHeight: 500, quality: 100){
              ...GatsbyContentfulFluid_withWebp
              }
              description
        }
      }
    }
  }
`
