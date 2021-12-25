import React from "react"
import Layout from "../components/layout"
import PageHeader from "../components/page-header"
import { graphql } from "gatsby"

import { renderRichText } from "gatsby-source-contentful/rich-text"

export default function MentionsLegales({ data }) {
  const mentionLegales = data.allContentfulMentionsLegales.nodes[0]
  return (
    <Layout>
      <PageHeader data={mentionLegales.nom} />
      <div id="mentions-legales">
        <div className="content">{renderRichText(mentionLegales.contenu)}</div>
      </div>
    </Layout>
  )
}

export const mentionsLegalesQuery = graphql`
  query mentionsLegalesQUery {
    allContentfulMentionsLegales {
      nodes {
        nom
        contenu {
          raw
        }
      }
    }
  }
`
