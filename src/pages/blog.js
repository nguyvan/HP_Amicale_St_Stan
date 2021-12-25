import React, { Component } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import PageHeader from "../components/page-header"
import Reasons from "../components/reasons"
import Statistics from "../components/statistics"
import Formulas from "../components/formulas"

import Arrow from "../assets/arrow.svg"
import Img from "gatsby-image"


class BlogPage extends Component {

  constructor(props) {
    super(props);

    const data = this.props.data;

    let categories = JSON.parse(JSON.stringify(data.allContentfulCategorie.nodes));
    categories.unshift({'nom': 'Tout', 'id': 'all'});

    this.state = {allBlogPosts: data.allContentfulBlogPost.edges, categories: categories, filteredBlogPosts: null, selectedCategoryId: 'all'}
  }

  onClickFilter(id) {

    const {allBlogPosts, selectedCategoryId} = this.state;

    if (id === 'all') {
      this.setState({filteredBlogPosts: null, selectedCategoryId: 'all'})
      return
    }

    if (id === selectedCategoryId) {
      return
    }

    const filterBlogPosts = allBlogPosts.filter((post) => post.node.category.id === id);
    this.setState({filteredBlogPosts: filterBlogPosts, selectedCategoryId: id})
  }

  render() {
    const {categories, allBlogPosts, filteredBlogPosts, selectedCategoryId} = this.state;
    const blogPosts = filteredBlogPosts || allBlogPosts;
    const path = this.props.location ? this.props.location.pathname : null;

    return (
      <Layout path={path}>
        <PageHeader data={"Le blog des Alumni"} />
        <div id="blog">
          <div id="categories">
            {categories.map((object, i) => (
              <button
                key={i}
                className={ ` CategoryControlButton ${selectedCategoryId === object.id && "selected"} `}
                onClick={() => this.onClickFilter(object.id)}
              >
                <span>{object.nom}</span>
              </button>
            ))}
          </div>

          {blogPosts.length > 0 ? (
            <div id="posts">
              {blogPosts.map((object, i) => (
                <BlogPost data={object.node} key={i}/>
              ))}
            </div>
          ) : (
            <div id="no-post">
              <h5> Aucun post </h5>
            </div>
          )}
        </div>
        <Reasons />
        <Statistics />
        <Formulas />
      </Layout>
    )
  }

}


const BlogPost = ({ data }) => {
  const date = new Date(data.publication)
  return (
    <div id="blog-post">
      <Link to={data.slug}>
        <Img className="img-thumbnail" fluid={data.apercu.fluid} imgStyle={{ objectFit: "cover" }}/>
      </Link>
      <div className="content-thumnail">
        <div className="first-row">
          <span>{data.category.nom.toUpperCase()}</span>
          <span className="date-post">{date.toLocaleDateString()}</span>
        </div>
        <div className="middle-row">
          <Link to={data.slug} className="title-post">{data.titre}</Link>
          <Link to={data.slug} className="excerpt-post">{data.texteApercu}</Link>
        </div>
        <div className="last-row">
          <div className="author-container">
            <div className="profile-picture">
              <Img className="profile-picture--content" fluid={data.auteur.photo.fluid} imgStyle={{ objectFit: "cover" }}/>
            </div>
            <span className="author-name">{data.auteur.nom}</span>
          </div>
          <div className="read-more-container">
            <Link to={data.slug}>Lire la suite</Link>
            <div className="link-arrow">
              <div className="link-arrow__head"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPage

export const blogQuery = graphql`
  query blogQuery {
    allContentfulBlogPost(sort: {order: DESC, fields: publication}) {
      edges {
        node {
          titre
          slug
          publication
          apercu {
            fluid(quality: 100) {
              src
            }
          }
          category {
            id
            nom
          }
          auteur {
            nom
            photo {
              fluid(quality: 100) {
                src
              }
            }
          }
          texteApercu
        }
      }
    }
    allContentfulCategorie(limit: 6) {
      nodes {
        id
        nom
        fondCouleur
        texteCouleur
      }
    }
  }
`
