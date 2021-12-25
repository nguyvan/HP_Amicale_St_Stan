import React, { Component } from "react"
import { StaticQuery, graphql } from "gatsby"
import { renderRichText } from "gatsby-source-contentful/rich-text"


const HIDDEN = 'hidden'

class TopBar extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

    const topBarVisibility = sessionStorage.getItem('top-bar');

    if (topBarVisibility !== HIDDEN) {
      let topBar = document.getElementById("top-bar");
      topBar.classList.remove("hidden__top-bar");
    }
  }

  onClose() {
    sessionStorage.setItem('top-bar', HIDDEN);
    let topBar = document.getElementById("top-bar");
    topBar.classList.add("hidden__top-bar");
  }

  render() {
    const {
      content,
    } = this.props;

    return (
      <div id="top-bar" className="hidden__top-bar">
        <div className="content">{renderRichText(content, {})}</div>
        <div className="close-button-container" onClick={() => this.onClose()}>
          <span className="close-button">X</span>
        </div>
      </div>
    )
  }
}

export default ({data}) => (
  <StaticQuery
    query={graphql`
      query TopBarQuery {
        allContentfulTopBar {
          nodes {
            content {
              raw
            }
          }
        }
      }
    `}
    render={data => <TopBar content={data.allContentfulTopBar.nodes[0].content}/>}
  />
)