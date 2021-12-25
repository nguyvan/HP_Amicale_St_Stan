import React, { Component } from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql, Link } from "gatsby"
import OverlayMenu from "./overlay-menu"
import PrimaryCta from "./primary-cta"

const history = {
  "path": "/history",
  "texte": "Leurs histoires"
}


class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {isMenuDisplayed: false, path: this.props.path}
  }

  componentDidMount() {

    const {isMenuDisplayed} = this.state;

    let headerContainer = document.getElementById("header-container")

    window.addEventListener("scroll", event => {
      if (window.pageYOffset > 0) {
        headerContainer.classList.add("sticky")
        return
      }

      headerContainer.classList.remove("sticky")
    })

    window.addEventListener('resize', () => {
        this.setState({isMenuDisplayed: false});
    });
  }

  onClickBurgerMenu() {
    const {isMenuDisplayed} = this.state;

    this.setState({isMenuDisplayed: !isMenuDisplayed})
  }

  render() {
    const {
      data: { cta, pages, logo, contact },
    } = this.props

    const {
      isMenuDisplayed,
      path
    } = this.state;

    return (
      <div id="header">
        <Link to="/">
          <img srcSet={logo.file.url} alt="" className="logo"/>
        </Link>
        <ul>
          {pages.map((object, i) => (
            <li key={i} className={object.path === path ? "active" : "undefined"}>
              <Link to={object.path} state={{ idx: i }} className="link" title={object.texte}>{object.texte}</Link>
            </li>
          ))}
          <li className={history.path === path ? "active": "undefined"}>
            <Link to={history.path} state={{ idx: 5 }} className="link" title={history.texte}>{history.texte}</Link>
          </li>
          <li>
            <a className="link" title={contact.texte} href={`mailto:${contact.path}`}>{contact.texte}</a>
          </li>
        </ul>
        <div className="cta-container">
          <PrimaryCta link={cta.lien} text={cta.texte}/>
        </div>
        <div className={`burger-menu ${isMenuDisplayed ? "collapsed" : ""}`} onClick={() => this.onClickBurgerMenu()}>
          <span/>
          <span/>
          <span/>
        </div>
        {isMenuDisplayed && (
          <OverlayMenu pages={pages} cta={cta} contact={contact} onNavigate={() => this.setState({isMenuDisplayed: false})}/>
        )}
      </div>
    )
  }
}

export default ({ data, path }) => (
  <StaticQuery
    query={graphql`
      query HeaderQuery {
        allContentfulHeader {
          nodes {
            logo {
              description
              file {
                url
              }
            }
            cta {
              texte
              lien
              couleur
            }
            pages {
              path
              texte
            }
            contact {
              path
              texte
            }
          }
        }
      }
    `}
    render={data => <Header data={data.allContentfulHeader.nodes[0]} path={path}/>}
  />
)

Header.propTypes = {
  data: PropTypes.object.isRequired,
}


