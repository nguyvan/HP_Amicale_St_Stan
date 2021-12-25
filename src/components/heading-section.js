import React, { Component } from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql, Link } from "gatsby"

import Img from "gatsby-image"
import PrimaryCta from "./primary-cta"

class HeadingSection extends Component {

  constructor(props) {
    super(props);
    this.state = {variation: "d'Entraide"};
  }

  componentDidMount() {
    const {
      data,
    } = this.props;

    const variations = data.variations.split(",")
    let idx = 0;

    var interval = setInterval(async function() {

      let line2 = document.getElementById("data-animation-home-intro-heading-line-02");
      line2.classList.add("headline-dynamic-change");

      await new Promise((resolve, reject) => {
        setTimeout(() => {
          this.setState({variation: variations[idx % variations.length]})
          idx++;
          resolve(1000)
        }, 1000 )
      })

      await new Promise((resolve, reject) => {
        setTimeout(() => {
          line2.classList.remove("headline-dynamic-change");
          resolve(1000)
        }, 1000 )
      })

    }.bind(this), 4000);

    this.setState({interval: interval})
  }

  componentWillUnmount() {
    const {
      interval
    } = this.state;

    clearInterval(interval);
  }


  render() {
    const {
      data
    } = this.props;

    const {
      variation
    } = this.state;

    return (
      <div id="heading-section">
        <div className="col-left">
          <h1 className="headline">
            <div className="intro-heading-amicale-ststan">
              {data.titre}
            </div>
            <div className="intro-heading-line1">
              <span id="data-animation-home-intro-heading-line-01">{data.titreLigne2}</span>
            </div>
            <div className="intro-heading-line2">
              <span id="data-animation-home-intro-heading-line-02">{variation}</span>
            </div>
          </h1>

          <div className="items">
            {data.liens.map((object, i) => (
              <a href={object.path} key={i}>
                <img srcSet={object.icone.file.url} alt={object.icone.description} className="item" />
              </a>
            ))}
          </div>
          <div className="cta-container">
            <div className="cta-item primary-cta">
              <PrimaryCta link={data.primaryCta.lien} text={data.primaryCta.texte} />
            </div>
            <div className="arrow-container cta-item">
              <Link to={data.secondaryCta.lien}>{data.secondaryCta.texte}</Link>
              <div className="link-arrow">
                <div className="link-arrow__head"/>
              </div>
            </div>
          </div>
        </div>
        <div className="col-right">
          <Img fluid={data.illustration.fluid} imgStyle={{ objectFit: "contain" }} className="img" alt={data.illustration.description}/>
        </div>
      </div>
    )

  }
}

export default ({ data }) => (
  <StaticQuery
    query={graphql`
      {
        allContentfulLandingSection {
          nodes {
            titre
            titreLigne2
            variations
            icone {
              description
              file {
                url
              }
            }
            liens {
              icone {
                file {
                  url
                }
              description
              }
              path
            }
            secondaryCta {
              lien
              texte
            }
            primaryCta {
              lien
              texte
            }
            illustration { 
              fluid(maxWidth: 600, quality: 100){
                ...GatsbyContentfulFluid_withWebp
              }
              description
           }
          }
        }
      }
    `}
    render={data => (
      <HeadingSection data={data.allContentfulLandingSection.nodes[0]} />
    )}
  />
)

HeadingSection.propTypes = {
  data: PropTypes.object.isRequired,
}
