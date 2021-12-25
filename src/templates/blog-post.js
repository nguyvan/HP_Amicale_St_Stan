import React, { Component } from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import Layout from "../components/layout"
import NewsletterSubscriptionBlog from "../components/newsletter-subscription-blog"
import Img from "gatsby-image"

import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import Video from "../components/video"
import SEO from "../components/seo"


const options = {
  renderNode: {
    [BLOCKS.HEADING_1]: (node, children) => <h2>{children}</h2>,
    [INLINES.HYPERLINK]: (node) => {
      if (node.data.uri.indexOf('youtube.com') !== -1) {
        return (
          <Video videoSrcURL={node.data.uri} />
        );
      }
      return <a href={node.data.uri}>{node.content[0].value}</a>
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => (
      <div id="blog-post-content-embeded-asset">
        <Img fluid={node.data.target.fluid} imgStyle={{ objectFit: "contain" }} className="embeded-asset"/>
        <figcaption className="caption">
          {node.data.target.description}
        </figcaption>
      </div>
    )
  }
}


class BlogPost extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {
      contentfulBlogPost: { titre, enTete, category, corps, slug, publication, auteur, promotion, duree, texteApercu, apercu },
    } = this.props.data

    const metaImage = {
      src: apercu.fluid.src,
    }

    const date = new Date(publication)
    const seo = <SEO lang='fr' title={titre} description={texteApercu} metaImage={metaImage} url={"https://amicaleststan.fr/blog"+slug}/>

    return (
      <Layout path={"/blog"} color={'#FAFAFA'} hideNewsletter={true} seo={seo}>
        <div id="blog-post-header">
          <h1 id="header_title">{titre}</h1>
          <div id="header_subtitles">
            <span className="author-profile"
              style={{
                background: `url(${auteur.photo.file.url}) no-repeat center center`,
                backgroundSize: 'cover'
              }}
            />
            <strong>{auteur.nom}, </strong>
            <span>{date.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}</span>
            {duree && <span > • {duree} min </span>}
            <div className="tags">
              <span className="tag"
                    style={{ backgroundColor: category.fondCouleur, color: category.texteCouleur }}>{category.nom}</span>
              {promotion && <span className="tag promo">Promo {promotion}</span>}
            </div>
          </div>
        </div>
        <div id="blog-post-header-image">
          <Img fluid={enTete.fluid} imgStyle={{ objectFit: "contain" }}/>
        </div>

        <div id="blog-post-content">
          {renderRichText(corps, options)}
        </div>

        <div id="blog-post-newsletter">
          <div className="newsletter-container">
            <NewsletterSubscriptionBlog />
          </div>
        </div>
      </Layout>
    )
  }
}

BlogPost.propTypes = {
  data: PropTypes.object.isRequired
}

export default BlogPost

export const blogPostQuery = graphql`
  query blogPostQuery($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      titre
      slug
      publication
      enTete { fluid(maxHeight: 500, quality: 100){
        ...GatsbyContentfulFluid_withWebp
        }
        description
      }
      category {
        nom
        texteCouleur
        fondCouleur
      }
      auteur {
        nom
        photo {
          file {
            url
          }
        }
      }
      promotion
      duree
      texteApercu
      corps {
        raw
        references {
          ... on ContentfulAsset {
            __typename
            contentful_id
            fluid(maxWidth: 600, quality: 100){
                ...GatsbyContentfulFluid_withWebp
            }
            description
          }
        }
      }
      apercu {
          fluid(quality: 100) {
            src
          }
      }
    }
  }
`
