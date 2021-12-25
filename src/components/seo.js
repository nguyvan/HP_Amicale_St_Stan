
import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"


const SEO = ({lang, title, description, meta, metaImage, url}) => {

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            siteUrl
          }
        }
      }
    `
  )

  const renderedTitle = title || site.siteMetadata.title;
  const renderedDescription = description || site.siteMetadata.description;
  const renderedUrl = url || site.siteMetadata.siteUrl;
  const image = metaImage && metaImage.src ? `https:${metaImage.src}` : "https://amicaleststan.fr/amicale_metatags.png";

  return (
    <>
      <Helmet
        htmlAttributes={{
          lang,
        }}
        title={renderedTitle}
        meta={[
          {
            name: `title`,
            content: renderedTitle
          },
          {
            name: `description`,
            content: renderedDescription
          },
          {
            name: `og:type`,
            content: "website"
          },
          {
            name: `og:url`,
            content: renderedUrl
          },
          {
            name: `og:title`,
            content: renderedTitle
          },
          {
            name: `og:description`,
            content: renderedDescription
          },
          {
            name: `twitter:url`,
            content: renderedUrl
          },
          {
            name: `twitter:title`,
            content: renderedTitle
          },
          {
            name: `twitter:description`,
            content: renderedDescription
          },
          {
            name: "twitter:card",
            content: "summary_large_image",
          },
        ].concat(
          metaImage
            ? [
              {
                property: "og:image",
                content: image,
              },
              {
                property: "og:image:width",
                content: 1200,
              },
              {
                property: "og:image:height",
                content:630,
              },
            ]
            : [
              {
                property: "og:image",
                content: image,
              },
            ]
        ).concat(meta)}
      />
    </>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
}

export default SEO
